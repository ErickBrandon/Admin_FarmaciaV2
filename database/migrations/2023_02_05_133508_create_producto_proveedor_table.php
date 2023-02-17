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
        Schema::create('producto_proveedor', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('producto_id')->nullable();
            $table->unsignedBigInteger('proveedor_id')->nullable();

            $table->foreign('producto_id')
            ->references('id')->on('productos')
            ->onDelete('cascade');

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
        Schema::dropIfExists('productos_proveedores');
    }
};
