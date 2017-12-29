<?php

/**
 * *
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *  
 */

namespace Magestore\OneStepCheckout\Controller\Index;

use Magento\Catalog\Model\Product;
use Magento\Catalog\Api\ProductRepositoryInterface;

/**
 * Class SaveCustomCheckoutData
 * @package Magestore\OneStepCheckout\Controller\Index
 */
class GetAjax extends \Magento\Framework\App\Action\Action
{

    /**
     * @var \Magento\Framework\Controller\Result\JsonFactory
     */
    protected $_resultJsonFactory;

    /**
     * @var \Magento\Framework\Json\Helper\Data
     */
    protected $_jsonHelper;

    /**
     * @var \Magento\Framework\DataObjectFactory
     */
    protected $_dataObjectFactory;


        /**
     * @var \Magento\Catalog\Helper\Product
     */
    protected $_productHelper;


    /**
     * @var ProductRepositoryInterface
     */
    protected $productRepository;


    /**
     * SaveCustomCheckoutData constructor.
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Magento\Framework\Json\Helper\Data $jsonHelper
     * @param \Magento\Framework\DataObjectFactory $dataObjectFactory
     * @param \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
     * @param \Magento\Catalog\Helper\Product $productHelper
     * @param \Magento\Catalog\Model\ProductTypes\ConfigInterface $productTypeConfig
     * @param ProductRepositoryInterface|\Magento\Framework\Pricing\PriceCurrencyInterface $productRepository
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        \Magento\Framework\DataObjectFactory $dataObjectFactory,
        \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory,
        \Magento\Catalog\Helper\Product $productHelper,
        ProductRepositoryInterface $productRepository
    ) {
        parent::__construct($context);
        $this->_resultJsonFactory = $resultJsonFactory;
        $this->_jsonHelper = $jsonHelper;
        $this->_dataObjectFactory = $dataObjectFactory;
        $this->_productHelper = $productHelper;
        $this->productRepository = $productRepository;
    }

        public function execute() {

          $productNameHere = $this->getRequest()->getPost('name');

          $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
          $resource = $objectManager->get('Magento\Framework\App\ResourceConnection');
          $connection = $resource->getConnection();

          $sql = "SELECT `entity_id` FROM `catalog_product_entity_varchar` WHERE (`value` LIKE '%".$productNameHere."%')";
          $data = $connection->fetchAll($sql);
          $productid = $data[0]['entity_id'];

            $product = $this->productRepository->getById($productid);

           $_wishlistSubmitParams = $objectManager->get('Magento\Wishlist\Helper\Data');

          $link_me  = $_wishlistSubmitParams->getAddParams($product);
          
          echo $link_me;
        }

}

?>