<?php
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-13
 * Time: 下午8:27
 */

namespace App\Exceptions;


class AuthException extends \Exception{

    public function __construct($msg = '用户名或密码错误', $code=400)
    {
        parent::__construct($msg, $code);
    }
}