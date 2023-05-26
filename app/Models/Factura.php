<?php

namespace App\Models;

use App\Models\Proveedor;
use App\Models\FacturaProducto;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Factura extends Model
{
    protected $table = 'facturas';
    public $timestamps = false;

    public function Proveedor(){
        return $this->belongsTo(Proveedor::class);
    }

    public function comments()
    {
        return $this->hasMany(FacturaProducto::class);
    }



}
