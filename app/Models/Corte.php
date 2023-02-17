<?php

namespace App\Models;

use App\Models\Farmacia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Corte extends Model
{
    protected $table = 'cortes';
    public $timestamps = false;

    public function Farmacia(){
        return $this->belongsTo(Farmacia::class);
    }
}
