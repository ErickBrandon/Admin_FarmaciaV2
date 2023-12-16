<?php

namespace App\Http\Controllers;

use auth;
use Carbon\Carbon;
use App\Models\Farmacia;
use App\Models\Producto;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Farmacias = Farmacia::all();
        
        $fecha_anterior = Carbon::now()->subMonths(2);

        $productos = Producto::whereDate('Ultima_asignacion','<',$fecha_anterior)
        ->where('Existencias',0)
        ->count();

        Producto::whereDate('Ultima_asignacion','<',$fecha_anterior)
        ->where('Existencias',0)
        ->delete();
        dd($productos);
     
        return view('Dashboard.Inicio')->with('Farmacias',$Farmacias);
    }
}
