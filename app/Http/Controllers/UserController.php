<?php namespace App\Http\Controllers;

use App\Exceptions\AuthException;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller {

    public function login()
    {
        $name = \Input::get('name');
        $pwd = \Input::get('pwd');

        try {
            $result = User::login($name, $pwd);
        } catch (AuthException $e) {
            return \Response::json($e->getMessage(), $e->getCode());
        }

        if (is_array($result)) {
            $result = $result[0];
        }

        \Session::set('user', [
            'id' => $result->id,
            'name' => $result->name,
            'login' => TRUE
        ]);
        return \Response::json($result);
    }

    public function logout()
    {
        \Session::clear();
        return \Response::json('登出成功');
    }
}
