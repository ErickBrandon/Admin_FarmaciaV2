<?php

namespace App\Models;

use App\Models\Factura;
use App\Models\Asignacion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FacturaProducto extends Model
{
    protected $table = 'factura_productos';
    public $timestamps = false;

    public function Factura(){
        return $this->belongsTo(Factura::class);
    }

  
  

   public function Asignacion(){
        return $this->hasMany(Asignacion::class);
    }
}
