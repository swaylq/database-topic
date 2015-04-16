<?php
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-14
 * Time: 下午1:29
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class OrderBook extends Model
{
    protected $table = 'books';

    protected $fillable = ['order_id', 'book_id', 'number', 'price', 'user_id', 'book_name'];


    /**
     * @param $info
     * @return static
     */
    public static function newOrderBook($info)
    {
        $keyValues = [
            'order_id' => 0,
            'book_id' => 0,
            'number' => 0,
            'price' => 0.0
        ];

        $orderBookInfo = [];
        foreach ($keyValues as $key => $value) {
            $orderBookInfo[$key] = isset($info[$key]) ? $info[$key] : $value;
        }

        return self::create($orderBookInfo);
    }
}