<?php


/**
 * Update Product Details
 *
 * @category   CinSeven
 * @package    CinSeven_APIExtension
 * @author     Wolf <wolf.net.nz>
 * @license 
 */
namespace CinSeven\APIExtension\Model;

use CinSeven\APIExtension\Api\ProductInterface;
use Magento\Catalog\Model\Product;

class Products extends Product implements ProductInterface
{
    /**
     *
     * @api
     * @param string $json
     * @return string
     */
	public function quantity($json) {
		$response = array();
		$requests = json_decode($json,true);
		$updated_number = 0;
		$products = $requests['products'];
		//minor validation of request before continuing
		if(is_array($products)){
			
			foreach($products as $product){
				$productID = null;
				$sku = $product['sku'];
				$in_stock = $product['in_stock'];
				$updated = false;
				if(isset($sku) && isset($in_stock)){
					if(isset($product['managing_stock'])){
						$managing_stock = $product['managing_stock'];
					}else{
						$managing_stock = true;
					}
					if(isset($product['stock_quantity']) && is_numeric($product['stock_quantity'])){
						$stock_quantity = $product['stock_quantity'];
					}else{
						$stock_quantity = null;
					}
					//loads product by attribute, in this case sku
					$objectManager = \Magento\Framework\App\ObjectManager::getInstance();
					$product = $objectManager->get('Magento\Catalog\Model\Product');
					$productID = $product->getIdBySku($sku);
					$product = $product->load($productID);
					//check if product is returned
					if(is_numeric($productID) && $product){
						$stockRegistry = $objectManager->get('Magento\CatalogInventory\Api\StockRegistryInterface');
						$stockItem = $stockRegistry->getStockItem($productID);
						$stockItem->setData('manage_stock', (integer)$managing_stock);
						$stockItem->setData('is_in_stock', (integer)$in_stock);
						if(is_numeric($stock_quantity)){
							$stockItem->setData('qty', (integer)$stock_quantity);
						}

						$stockItem->save();
						$updated = true;
						$updated_number++;
					}
				}
				array_push($response,array(
					'id' => $productID,
					'sku' => $sku,
					'in_stock' => $in_stock,
					'managing_stock' => $managing_stock,
					'quantity' => $stock_quantity,
					'updated' => $updated
				));
			}
			$response['response']['number_items_updated'] = $updated_number;
		}
		

		
        return $response;
    }
}