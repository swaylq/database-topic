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
    protected $table = 'books';

    protected $fillable = ['consignee_name', 'consignee_address', 'price', 'user_id', 'count'];


    /**
     * @param $uid
     * @return array
     * @throws NoOrderFoundException
     */
    public static function findByUser($uid)
    {
        $orders = \DB::select(
            "SELECT id, consignee_name, consignee_address, price " .
            "FROM orders " .
            "WHERE user_id={$uid}"
        );

        if (!empty($orders)) {
            foreach ($orders as &$order) {
                $books = \DB::select(
                    "SELECT book_id, number, books.name, " .
                        "books.author, books.cover, books.intro, books.price " .
                    "FROM order_books " .
                    "LEFT JOIN books " .
                        "WHERE books.id=book_id " .
                    "WHERE order_id={$order->id}"
                );

                $order->books = $books;
            }
        } else {
            throw new NoOrderFoundException();
        }

        return $orders;
    }


    /**
     * @return array
     * @throws NoOrderFoundException
     */
    public static function getAll()
    {
        $orders = \DB::select(
            "SELECT id, consignee_name, consignee_address, price " .
            "FROM orders "
        );

        if (empty($orders)) {
            throw new NoOrderFoundException();
        }

        return $orders;
    }
}