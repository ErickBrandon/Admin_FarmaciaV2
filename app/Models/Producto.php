<?php

namespace App\Models;

use App\Models\Detalle;
use App\Models\Farmacia;
use App\Models\Proveedor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    protected $table = 'productos';
    public $timestamps = false;


    public function detallesVentas(){
        return $this->hasMany(Detalle::class);
    }


    //Relación Muchos a Muchos
    public function proveedores(){
        return $this->belongsToMany(Proveedor::class)->withPivot('producto_id','proveedor_id');
    }

    //Relación Uno a muchos (Con la FK)
    public function farmacia(){
        return $this->belongsTo(Farmacia::class);
    }
}
