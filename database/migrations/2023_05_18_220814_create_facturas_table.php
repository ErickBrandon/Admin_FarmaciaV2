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
        Schema::create('facturas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->float('TotalCompra');
            $table->date('Fecha_registro');
            $table->integer('Total_productos');
            $table->integer('Total_asignados')->default(0);
            $table->unsignedBigInteger('proveedor_id')->nullable();

            $table->foreign('proveedor_id')
            ->references('id')->on('proveedores')
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
        Schema::dropIfExists('facturas');
    }
};
