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
        Schema::create('detalles_ventas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Producto',100);
            $table->integer('Unidades');
            $table->float('SubTotal');
            $table->string('Codigo',60);
            $table->date('Fecha');
            $table->unsignedBigInteger('venta_id');
            $table->unsignedBigInteger('producto_id');


            $table->foreign('venta_id')
            ->references("id")
            ->on("venta");

            $table->foreign('producto_id')
            ->references("id")
            ->on("productos");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalles_ventas');
    }
};
