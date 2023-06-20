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
        Schema::create('historial_asignaciones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->String('Codigo');
            $table->integer('Producto');
            $table->String('Tipo_Venta');
            $table->integer('Unidades');
            $table->integer('Piezas_unidad')->nullable();
            $table->date('Fecha_asignacion');
            $table->unsignedBigInteger('factura_producto_id')->nullable();
            $table->unsignedBigInteger('farmacia_id')->nullable();

            $table->foreign('factura_producto_id')
            ->references('id')->on('factura_productos')
            ->onDelete('cascade');

            $table->foreign('farmacia_id')
            ->references('id')->on('farmacias')
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
        Schema::dropIfExists('historial_asignaciones');
    }
};
