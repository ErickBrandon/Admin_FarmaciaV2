<?php

namespace App\Models;

use App\Models\Corte;
use App\Models\Venta;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Farmacia extends Model
{
    protected $table = 'farmacias';
    public $timestamps = false;


    public function cortes(){
        return $this->hasMany(Corte::class);
    }

    // Uno a Muchos
    public function productos(){
        return $this->hasMany(Producto::class);
    }

    // Uno a Muchos
    public function ventas(){
        return $this->hasMany(Venta::class);
    }
}

