<?php

namespace App\Http\Controllers;

use App\Models\Farmacia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FarmaciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Dashboard.Farmacias.farmacias');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
        $Farm = new Farmacia();

            $Farm->Farmacia = $request->Farmacia;
            $Farm->Encargado = $request->Encargado;
           
            $Farm->save();
            DB::commit( );
            
            return 1;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }


    public function show(Farmacia $farmacia)
    {
        //
    }

    public function edit(Farmacia $farmacia)
    {
        //
    }

  
    public function update(Request $request, Farmacia $Farmacia)
    {
        $Farmacia->Farmacia = $request->Farmacia;
        $Farmacia->Encargado = $request->Encargado;

        $Farmacia->save();
        return 1;
    }

    public function destroy(Farmacia $farmacia)
    {
        //
    }
    public function DataTableFarmacia()
    {   
        $farmacias = Farmacia::all();
        return datatables()->of($farmacias)->toJson();
    }
}
