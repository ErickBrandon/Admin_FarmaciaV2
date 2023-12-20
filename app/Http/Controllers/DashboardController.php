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

        $Hoy =Carbon::createFromDate(Carbon::now()->year, Carbon::now()->month, Carbon::now()->day);

        $finHosting = Carbon::createFromDate(2027, 9, 24)->toDateString();

        $diasFinHosting = $Hoy->diffInDays($finHosting);

        $finDominio =Carbon::createFromDate('2024', '08', '01')->toDateString();

        $diasFinDominio = $Hoy->diffInDays($finDominio);


        return view('Dashboard.Inicio')
                ->with([
                        'Farmacias'=>$Farmacias,
                        'FinHosting'=>$finHosting,
                        'DiasFinHosting'=>$diasFinHosting,
                        'FinDominio'=>$finDominio,
                        'DiasFinDominio'=>$diasFinDominio
                    ]);
    }
}
