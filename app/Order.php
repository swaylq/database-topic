<?php
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-14
 * Time: 下午1:24
 */

namespace App;

use App\Exceptions\NoOrderFoundException;
use Illuminate\Database\Eloquent\Model;

class Order extends  Model
{
    protected $table = 'orders';

    protected $fillable = ['consignee_name', 'consignee_address', 'price', 'user_id', 'count'];


    /**
     * @param $id
     * @return mixed
     * @throws NoOrderFoundException
     */
    public static function findById($id) {
        $order = \DB::selectOne(
            'SELECT id, consignee_name, consignee_address, price ' .
            'FROM orders ' .
            "WHERE id={$id}"
        );

        try {
            $order = self::_addBooksInfo([$order])[0];
        } catch (NoOrderFoundException $e) {
            throw new NoOrderFoundException('指定订单不存在');
        }

        return $order;
    }


    /**
     * @param $uid
     * @return array
     * @throws NoOrderFoundException
     */
    public static function findByUser($uid, $offset = 0, $number = 10)
    {
        $orders = \DB::select(
            "SELECT id, consignee_name, consignee_address, price " .
            "FROM orders " .
            "WHERE user_id={$uid}" .
            'ORDER BY id DESC ' .
            "LIMIT {$offset},{$number}"
        );

        $count = \DB::selectOne(
            'SELECT COUNT(*) AS count ' .
            'FROM orders ' .
            'WHERE user_id=' . $uid
        );

        try {
            $orders = self::_addBooksInfo($orders);
        } catch (NoOrderFoundException $e) {
            throw $e;
        }

        return [
            'count' => $count,
            'orders' => $orders
            ];
    }


    /**
     * @return array
     * @throws NoOrderFoundException
     */
    public static function all($offset = 0, $number = 10)
    {
        $orders = \DB::select(
            "SELECT id, consignee_name, consignee_address, price " .
            "FROM orders " .
            'ORDER BY id DESC ' .
            "LIMIT {$offset},{$number}"
        );

        try {
            $orders = self::_addBooksInfo($orders);
        } catch (NoOrderFoundException $e) {
            throw $e;
        }

        $count = \DB::selectOne(
            'SELECT COUNT(*) AS count ' .
            'FROM orders '
        );

        return [
            'count' => $count,
            'orders' => $orders
            ];
    }


    /**
     * @param $info
     * @return static
     */
    public static function newOrder($info)
    {
        $orderInfo = [
            'user_id' => isset($info['user_id']) ? $info['user_id'] : 0,
            'price' => isset($info['price']) ? $info['price'] : 0,
            'count' => isset($info['count']) ? $info['count'] : 0,
            'consignee_name' => isset($info['consignee_name']) ? $info['consignee_name'] : '',
            'consignee_address' => isset($info['consignee_address']) ? $info['consignee_address'] : ''
        ];

        return self::create($orderInfo);
    }


    /**
     * @param array $orders
     * @return array
     * @throws NoOrderFoundException
     */
    private static function _addBooksInfo(array $orders) {
        if (!empty($orders)) {
            foreach ($orders as &$order) {
                $books = \DB::select(
                    "SELECT book_id, number, books.name, " .
                    "books.author, books.cover, books.intro, books.price " .
                    "FROM order_books " .
                    "LEFT JOIN books ON books.id=book_id " .
                    "WHERE order_id={$order->id}"
                );

                $order->books = $books;
            }
        } else {
            throw new NoOrderFoundException();
        }

        return $orders;
    }
}
