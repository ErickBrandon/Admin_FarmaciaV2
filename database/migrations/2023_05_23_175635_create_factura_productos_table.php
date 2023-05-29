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
        Schema::create('factura_productos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('Codigo');
            $table->String('Producto');
            $table->float('Costo');
            $table->bigInteger('Piezas');
            $table->float('SubTotal');
            $table->bigInteger('Asignadas')->default(0);
            $table->unsignedBigInteger('factura_id')->nullable();

            $table->foreign('factura_id')
            ->references('id')->on('facturas')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factura_productos');
    }
};
