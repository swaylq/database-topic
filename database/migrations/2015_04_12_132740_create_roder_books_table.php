<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoderBooksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_books', function(Blueprint $table){
            $table->increments('id');
            $table->integer('order_id');
            $table->integer('book_id');
            $table->integer('number')->default(1);

            $table->decimal('price', 8, 2)->default(0);
            $table->integer('user_id')->default(0);
            $table->string('book_name')->default('');
            
            $table->timestamps();

            $table->index('order_id');
            $table->index('user_id');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('order_books');
	}

}
