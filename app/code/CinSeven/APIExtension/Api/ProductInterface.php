<?php

namespace CinSeven\APIExtension\Api;

use CinSeven\APIExtension\Api\Data\PointInterface;

interface ProductInterface
{
    /**
     *
     * @api
     * @param string $json
     * @return string
     */
    public function quantity($json);
}