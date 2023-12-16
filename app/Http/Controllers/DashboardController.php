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
        
     
        return view('Dashboard.Inicio')->with('Farmacias',$Farmacias);
    }
}
