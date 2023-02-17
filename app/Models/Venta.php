<?php

namespace App\Models;

use App\Models\Detalle;
use App\Models\Farmacia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Venta extends Model
{
    //use HasFactory;
    protected $table = 'venta';
    public $timestamps = false;


    public function detallesVentas(){
        return $this->hasMany(Detalle::class);
    }
     //Relación Uno a muchos (Con la FK)
     public function farmacia(){
        return $this->belongsTo(Farmacia::class);
    }
}
