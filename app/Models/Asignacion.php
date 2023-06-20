<?php

namespace App\Models;

use App\Models\Farmacia;
use App\Models\FacturaProducto;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Asignacion extends Model
{
    protected $table = 'asignaciones';
    public $timestamps = false;

    public function Farmacia(){
        return $this->belongsTo(Farmacia::class);
    }

    public function FacturaProducto(){
        return $this->belongsTo(FacturaProducto::class);
    }
}
