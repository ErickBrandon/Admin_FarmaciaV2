<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cortes_generales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->float('Total');
            $table->float('Inversion');
            $table->integer('Farmacias');
            $table->date('Fecha');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cortes_generales');
    }
};
