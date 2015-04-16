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
}