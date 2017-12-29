<?php
/**
 * Mageplaza
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Mageplaza.com license that is
 * available through the world-wide-web at this URL:
 * https://www.mageplaza.com/LICENSE.txt
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Mageplaza
 * @package     Mageplaza_Blog
 * @copyright   Copyright (c) 2017 Mageplaza (http://www.mageplaza.com/)
 * @license     https://www.mageplaza.com/LICENSE.txt
 */

namespace Mageplaza\Blog\Block\Topic;

use Mageplaza\Blog\Block\Frontend;
use Mageplaza\Blog\Helper\Data;

/**
 * Class Listpost
 * @package Mageplaza\Blog\Block\Topic
 */
class Listpost extends Frontend
{
    protected $_topic;

    /**
     * Override this function to apply collection for each type
     *
     * @return \Mageplaza\Blog\Model\ResourceModel\Post\Collection
     */
    protected function getCollection()
    {
        if ($topic = $this->getBlogObject()) {
            return $this->helperData->getPostCollection(Data::TYPE_TOPIC, $topic->getId());
        }

        return null;
    }

    /**
     * @return mixed
     */
    protected function getBlogObject()
    {
        if (!$this->_topic) {
            $id = $this->getRequest()->getParam('id');

            if ($id) {
                $topic = $this->helperData->getObjectByParam($id, null, Data::TYPE_TOPIC);
                if ($topic && $topic->getId()) {
                    $this->_topic = $topic;
                }
            }
        }

        return $this->_topic;
    }

    /**
     * @inheritdoc
     */
    protected function _prepareLayout()
    {
        parent::_prepareLayout();

        if ($breadcrumbs = $this->getLayout()->getBlock('breadcrumbs')) {
            $topic = $this->getBlogObject();
            if ($topic) {
                $breadcrumbs->addCrumb($topic->getUrlKey(), [
                        'label' => __('Topic'),
                        'title' => __('Topic')
                    ]
                );
            }
        }
    }

    /**
     * @param bool $meta
     * @return array
     */
    public function getBlogTitle($meta = false)
    {
        $blogTitle = parent::getBlogTitle($meta);
        $topic     = $this->getBlogObject();
        if (!$topic) {
            return $blogTitle;
        }

        if ($meta) {
            if($title = $topic->getMetaTitle()) {
                $blogTitle = [$title];
            }
        } else {
            $blogTitle = $topic->getName();
        }

        return $blogTitle;
    }
}