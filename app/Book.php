<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model {

    protected $table = 'books';

    protected $fillable = ['name', 'isbn', 'price', 'author', 'detail', 'intro', 'cover', 'stock'];


    /**
     * @param int $offset
     * @param int $number
     * @return array
     */
    public static function all($offset = 0, $number = 10)
    {
        $result = \DB::select(
            'SELECT id, name, author, cover, stock, price, intro ' .
            'FROM books ' .
            'ORDER BY id ' .
            "LIMIT {$offset},{$number}"
        );

        $count = \DB::selectOne(
            'SELECT COUNT(*) AS count ' .
            'FROM books ' .
            'LIMIT 0,1'
        );

        if (!empty($count)) {
            $count = $count->count;
        } else {
            $count = 0;
        }

        return [
            'count' => $count,
            'books' => $result
        ];
    }


    public static function findById($id)
    {
        $result = \DB::selectOne(
            'SELECT id, name, author, cover, stock, price, intro ' .
            'FROM books ' .
            "WHERE id={$id}"
        );
//        var_dump($result);
        return $result;
    }
}
