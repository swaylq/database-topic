<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', 'ViewController@home');
Route::get('/book/list', 'ViewController@bookList');
Route::get('/book/detail/{id}', 'ViewController@bookDetail');
Route::get('/order/list', 'ViewController@orderList');

Route::group(['prefix' => 'service'], function() {
    Route::group(['prefix' => 'user'], function () {
        Route::post('/login', ['uses' => 'UserController@login']);
        Route::get('/logout', ['uses' => 'UserController@logout']);
    });

    Route::group(['prefix' => 'book'], function() {
        Route::get('/list', ['uses' => 'BookController@getAll']);    //分页（page & number)
        Route::get('/detail/{id}', ['uses' => 'BookController@getDetail']);
    });

    Route::group(['prefix' => 'order'], function() {
        Route::get('/all', ['uses' => 'OrderController@getAll']);   //分页（page & number)
        Route::get('/detail/{id}', ['uses' => 'OrderController@getDetail']);
        Route::get('/user/{uid}', ['uses' => 'OrderController@getByUser']); //分页（page & number)
        Route::post('/order', ['uses' => 'OrderController@postOrder']);
    });
    Route::get('/changeDatabase', function (){
        Session::get('database') == 'mysql' ? Session::set('database', 'mongodb') : Session::set('database', 'mysql');
        return Response::json('changing database succeeded');
    });
});
