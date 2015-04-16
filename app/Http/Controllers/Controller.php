<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;


    /**
     * @param $res
     * @param int $code
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function genResult($res, $code = 200)
    {
        if (is_array($res) AND isset($res['filter'])) {
            $filter = $res['filter'];
            $result = $res['result'];
        } else {
            $filter = NULL;
            $result = $res;
        }

        $response = [
            'db' => 'MySQL',
            'msg' => '操作成功',
            'filter' => $filter,
            'result' => $result
        ];

        return \Response::json($response, $code);
    }


    /**
     * @param mixed    $msg
     * @param int       $code
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function genMsg($msg, $code = 200)
    {
        $res = [
            'db' => 'MySQL',
            'msg' => $msg,
            'result' => NULL
        ];

        return \Response::json($res, $code);
    }
}
