<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBooksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('books', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('author')->default('');
            $table->string('cover')->default('');
            $table->string('intro')->default('');
            $table->decimal('price', 8, 2);
            $table->integer('stock')->default(1);

            $table->string('isbn')->nullable();
            $table->text('detail')->default('');
            $table->timestamps();

            $table->unique('isbn');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('books');
	}

}
