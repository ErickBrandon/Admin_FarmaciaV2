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
        Schema::create('historial_traspaso', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->String('Codigo');
            $table->String('Producto');
            $table->integer('Cajas');
            $table->unsignedBigInteger('farmacia_origen');
            $table->unsignedBigInteger('farmacia_destino');
            $table->date('Fecha_traspaso');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historial_traspaso');
    }
};
