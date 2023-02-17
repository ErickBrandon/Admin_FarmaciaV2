<?php

namespace App\Models;

use App\Models\Venta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Detalle extends Model
{
    protected $table = 'detalles_ventas';
    public $timestamps = false;



    public function venta(){
        return $this->belongsTo(Venta::class);
    }
    public function producto(){
        return $this->belongsTo(producto::class);
    }
}
