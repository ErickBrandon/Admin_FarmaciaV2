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
            $table->bigIncrements('id');
            $table->String('Codigo',25);
            $table->string('Producto',250);
            $table->float('Precio');
            $table->integer('Existencias');
            $table->string('TipoVenta',8);
            $table->date('Caducidad');
            $table->float('Costo');
            $table->unsignedBigInteger('farmacia_id')->nullable();
            $table->date('Ultima_asignacion');

            
            $table->foreign('farmacia_id')
            ->references("id")
            ->on("farmacias")
            ->onDelete('set null');
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
