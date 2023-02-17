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
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id')->unique()->nullable();
            $table->bigInteger('Codigo');
            $table->string('Producto',250);
            $table->float('Precio');
            $table->integer('Existencias');
            $table->string('TipoVenta',100);
            $table->string('Caducidad',12);
            $table->string('Finalidad',300);
            $table->float('Costo');
            $table->float('CostoAnterior');
            $table->unsignedBigInteger('farmacia_id');

            
            $table->foreign('farmacia_id')
            ->references("id")
            ->on("farmacias");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
};
