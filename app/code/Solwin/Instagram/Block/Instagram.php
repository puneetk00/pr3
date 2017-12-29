<?php
/**
 * Dkoder
 * Dkoder Instagram Extension
 * 
 * @category   Dkoder
 * @package    Dkoder_Instagram
 * @copyright  Copyright © 2006-2016 Dkoder
 * @license    Dkoder
 */
namespace Solwin\Instagram\Block;

use Magento\Framework\View\Element\Template;

class Instagram extends Template {
    
    
    protected function _prepareLayout() {
        
        parent::_prepareLayout();
        $this->pageConfig->getTitle()->set(__('Instagram'));
    }
    

}