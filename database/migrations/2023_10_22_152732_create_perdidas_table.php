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
        Schema::create('perdidas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->String('Producto');
            $table->float('Costo_producto');
            $table->integer('No_productos');
            $table->String('Tipo_venta');
            $table->float('perdida_total');
            $table->String('farmacia_id');
            $table->date('fecha');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('perdidas');
    }
};
