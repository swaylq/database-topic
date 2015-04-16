<?php namespace App\Http\Controllers;
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-16
 * Time: 下午4:41
 */

namespace App\Http\Controllers;

use App\Exceptions\NoOrderFoundException;
use App\Order;
use App\OrderBook;

class OrderController extends Controller {


    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getAll()
    {
        $page = \Request::input('page', 1);
        $perPage = \Request::input('number', 10);
        $res['filter'] = [
            'page' => $page,
            'number' => $perPage
        ];

        try {
            $result = Order::all(($page - 1) * $perPage, $perPage);
        } catch (NoOrderFoundException $e) {
            return $this->genMsg($e->getMessage(), $e->getCode());
        }
        $res['result'] = $result;

        return $this->genResult($res, 200);
    }


    /**
     * @param $uid
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getByUser($uid)
    {
        $page = \Request::input('page', 1);
        $perPage = \Request::input('number', 10);
        $res['filter'] = [
            'page' => $page,
            'number' => $perPage
        ];

        try {
            $result = Order::findByUser($uid, ($page - 1) * $perPage, $perPage);
        } catch (NoOrderFoundException $e) {
            return $this->genMsg($e->getMessage(), $e->getCode());
        }
        $res['result'] = $result;

        return $this->genResult($res, 200);
    }


    /**
     * @param $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getDetail($id)
    {
        try {
            $result = Order::findById($id);
        } catch (NoOrderFoundException $e) {
            return $this->genMsg($e->getMessage(), $e->getCode());
        }

        return $this->genResult($result, 200);
    }


    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function postOrder()
    {
        $books = \Request::input('books');
        if (empty($books)) {
            return $this->genMsg('没有书籍信息', 400);
        }

        $orderBookInfo = [
            'user_id' => \Session::get('user')['id'],
            'count' => count($books),
            'price' => NULL,
        ];

        $keyValues = [
            'consignee_name' => 'xxx',
            'consignee_address' => '中院207'
        ];
        foreach ($keyValues as $key => $value) {
            $orderBookInfo[$key] = \Request::input($key, $value);
        }

        $totalPrice = 0;
        foreach ($books as $book) {
            $totalPrice += abs($book->price) * $book->number;
            unset($book->number);
            OrderBook::newOrderBook($book);
        }

        $orderBookInfo['price'] = $totalPrice;
        Order::newOrder($orderBookInfo);

        return $this->genMsg('下单成功');
    }
}