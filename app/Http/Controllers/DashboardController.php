<?php

namespace App\Http\Controllers;

use auth;
use App\Models\Farmacia;
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
        //dd($Farmacias[0]->id);
        return view('Dashboard.Inicio')->with('Farmacias',$Farmacias);
    }
}
