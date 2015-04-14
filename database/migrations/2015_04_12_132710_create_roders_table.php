<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRodersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table){
            $table->increments('id');
            $table->string('consignee_name');
            $table->string('consignee_address');
            $table->decimal('price', 8, 2);

            $table->integer('user_id')->default(0);
            $table->integer('count')->default(0);
            $table->timestamps();

            $table->index('user_id');
            $table->index('consignee_name');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('orders');
	}

}
