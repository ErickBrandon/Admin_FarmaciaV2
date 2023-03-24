<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    Public function CorteNuevo($Hoy, $Farmacia)
    {
        $Ventas = DB::table('venta')
        ->where('farmacia_id',$Farmacia)
        ->where('Fecha',$Hoy)->get();
        
        $TotalDeVentas = 0;
        $Inversion = 0;
        foreach ($Ventas as $key => $venta) {
            $TotalDeVentas = $TotalDeVentas + $venta->Total;
            $Inversion = $Inversion + $venta->Inversion_Venta;
        }
        $CorteNuevo =[
            'Corte'=>$TotalDeVentas,
            'Fecha'=>$Hoy,
            'Inversion'=>$Inversion
        ];

        return $CorteNuevo;
    }
}
