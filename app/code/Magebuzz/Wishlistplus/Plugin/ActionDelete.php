<?php
/**
 * @copyright Copyright (c) 2016 www.magebuzz.com
 */

namespace Magebuzz\Wishlistplus\Plugin;

class ActionDelete
{
    public function beforeAddToCart(\Magento\Wishlist\Model\Item $subject, \Magento\Checkout\Model\Cart $cart, $delete) {
        return [$cart, false];
    }
}