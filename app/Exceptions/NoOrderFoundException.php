<?php
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-13
 * Time: 下午8:27
 */

namespace App\Exceptions;


class NoOrderFoundException extends \Exception{

    public function __construct($msg = '未找到指定订单', $code=400)
    {
        parent::__construct($msg, $code);
    }
}