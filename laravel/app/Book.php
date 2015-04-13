<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model {

    protected $table = 'books';

    protected $fillable = ['name', 'isbn', 'price', 'author', 'detail'];

}
