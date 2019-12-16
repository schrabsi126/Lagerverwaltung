<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StorageShifts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storage_shifts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('number');
            $table->integer('delivery_id')->unsigned();
            $table->foreign('delivery_id')->references('id')->on('deliveries')->onDelete('cascade');
            $table->integer('component_id')->unsigned();
            $table->foreign('component_id')->references('id')->on('components')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
