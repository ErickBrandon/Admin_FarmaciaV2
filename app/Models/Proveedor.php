<?php

namespace App\Models;

use App\Models\Compra;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Proveedor extends Model
{
    protected $table = 'proveedores';
    public $timestamps = false;
   
    //Relación Muchos a Muchos

    public function productos(){
        return $this->belongsToMany(Producto::class)->withPivot();
    }

    public function Factura(){
        return $this->hasMany(Factura::class);
    }
}
