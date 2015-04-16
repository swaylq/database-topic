<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model {

    protected $table = 'books';

    protected $fillable = ['name', 'isbn', 'price', 'author', 'detail', 'intro', 'cover', 'stock'];


    public static function getAll($offset = 0, $number = 10)
    {
        $result = \DB::select(
            'SELECT id, name, author, cover, stock, price, intro ' .
            'FROM books ' .
            'ORDER BY id ' .
            "LIMIT {$offset},{$number}"
        );

        $count = \DB::select(
            'SELECT COUNT(*) AS count ' .
            'FROM books ' .
            'LIMIT 0,1'
        );

        if (is_array($count) AND !empty($count)) {
            $count = $count[0]->count;
        }

        return [
            'result' => $result,
            'count' => $count
        ];
    }
}
