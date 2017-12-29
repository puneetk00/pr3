<?php
/**
 * Dkoder Infotech
 * Dkoder Instagram Extension
 * 
 * @category   Dkoder
 * @package    Dkoder_Instagram
 * @copyright  Copyright © 2006-2016 Dkoder
 * @license    Dkoder
 */
namespace Solwin\Instagram\Controller\Index;

use Magento\Framework\App\RequestInterface;

class Index extends \Magento\Framework\App\Action\Action
{

    public function execute() {
        $this->_view->loadLayout();
        $this->_view->getLayout()->initMessages();
        $this->_view->renderLayout();  
    }

}