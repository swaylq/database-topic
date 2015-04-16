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
Route::get('/book/detail/{id}', 'ViewController@bookDetail');
Route::get('/order/list', 'ViewController@orderList');

Route::group(['prefix' => 'user'], function() {
    Route::post('/login', ['uses' => 'UserController@login']);
    Route::get('/logout', ['uses' => 'UserController@logout']);
});
