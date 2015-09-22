<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('salutation','10')->nullable();
            $table->string('firstName', 100);
            $table->string('lastName', 100);
            $table->string('nicNo', 20);
            $table->date('dateOfBirth')->nullable();
            $table->string('mobileNo','20')->nullable();
            $table->string('fixedlineNo','20')->nullable();
            $table->text('address')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::drop('contacts');
    }
}
