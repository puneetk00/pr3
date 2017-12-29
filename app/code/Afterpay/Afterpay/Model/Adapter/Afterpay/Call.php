<?php
/**
 * Magento 2 extensions for Afterpay Payment
 *
 * @author Afterpay <steven.gunarso@touchcorp.com>
 * @copyright 2016 Afterpay https://www.afterpay.com.au/
 */
namespace Afterpay\Afterpay\Model\Adapter\Afterpay;

use \Magento\Framework\HTTP\ZendClientFactory;
use \Afterpay\Afterpay\Model\Config\Payovertime as AfterpayConfig;
use \Magento\Framework\Json\Helper\Data as JsonHelper;
use \Afterpay\Afterpay\Helper\Data as AfterpayHelper;

/**
 * Class Call
 * @package Afterpay\Afterpay\Model\Adapter\Afterpay
 */
class Call
{
    /**
     * @var for HTTP Client
     */
    protected $client;
    protected $jsonHelper;
    protected $helper;

    /**
     * Call constructor.
     * @param ZendClientFactory $httpClientFactory
     * @param AfterpayConfig $afterpayConfig
     * @param JsonHelper $jsonHelper
     * @param AfterpayHelper $helper
     */
    public function __construct(
        ZendClientFactory $httpClientFactory,
        AfterpayConfig $afterpayConfig,
        JsonHelper $jsonHelper,
        AfterpayHelper $helper
    ) {
        /** HTTP Client and afterpay config */
        $this->httpClientFactory = $httpClientFactory;
        $this->afterpayConfig = $afterpayConfig;
        $this->jsonHelper = $jsonHelper;
        $this->helper = $helper;
    }

    /**
     * Send using HTTP call
     *
     * @param $url
     * @param bool $body
     * @param string $method
     * @param array $override
     * @return \Zend_Http_Response
     * @throws \Magento\Framework\Exception\LocalizedException
     * @throws \Zend_Http_Client_Exception
     */
    public function send($url, $body = false, $method = \Magento\Framework\HTTP\ZendClient::GET, $override = array() )
    {
        // set the client http
        $client = $this->httpClientFactory->create();

        // set body and the url
        $client->setUri($url)
            ->setRawData($this->jsonHelper->jsonEncode($body), 'application/json');

        // add auth for API requirements
        $client->setAuth(
            trim($this->afterpayConfig->getMerchantId($override)),
            trim($this->afterpayConfig->getMerchantKey($override))
        );


        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $productMetadata = $objectManager->get('Magento\Framework\App\ProductMetadataInterface');
        $version = $productMetadata->getVersion(); //will return the magento version
        $description = $productMetadata->getName() . ' ' . $productMetadata->getEdition(); //will return the magento description


        if( !empty($override['website_id']) ) {
            $url = $this->getWebsiteUrl($override['website_id']);
        }
        else {
            $url = $this->getWebsiteUrl();
        }

        // set configurations
        $client->setConfig(
            [
                'maxredirects' => 0,
                'useragent'    => 'AfterpayMagento2Plugin ' . $this->helper->getModuleVersion() . ' (' . $description . ' ' . $version . ') MerchantID: ' . trim($this->afterpayConfig->getMerchantId($override) . ' URL: ' . $url ) 
            ]
        );

        // debug mode
        $requestLog = array(
            'type' => 'Request',
            'method' => $method,
            'url' => $url,
            'body' => $body
        );
        $this->helper->debug($this->jsonHelper->jsonEncode($requestLog));

        // do the request with catch
        try {
            $response = $client->request($method);

            // debug mode
            $responseLog = array(
                'type' => 'Response',
                'method' => $method,
                'url' => $url,
                'httpStatusCode' => $response->getStatus(),
                'body' => $this->jsonHelper->jsonDecode($response->getBody())
            );
            $this->helper->debug($this->jsonHelper->jsonEncode($responseLog));

            $responseBody = $response->getBody();
            $debugData['response'] = $responseBody;
        } catch (\Exception $e) {
            $this->helper->debug($e->getMessage());

            throw new \Magento\Framework\Exception\LocalizedException(
                __('Gateway error: %1', $e->getMessage())
            );
        }

        // return response
        return $response;
    }

    private function getWebsiteUrl($website_id = NULL) {

        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $storeManager = $objectManager->get('Magento\Store\Model\StoreManagerInterface'); 
        $url = NULL;

        if( !empty($website_id) ) {

            $websites = $storeManager->getWebsites();
            
            foreach($websites as $website){
                foreach($website->getStores() as $store){
                    if( !empty($website_id) && $website_id == $website->getId()) {
                        $storeObj = $storeManager->getStore($store);
                        $url = $storeObj->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_WEB);
                    }
                }
            }
        }
        else {
            $url = $storeManager->getStore()->getBaseUrl();
        }

        return $url;
    }
}