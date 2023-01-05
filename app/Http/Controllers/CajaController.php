<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Venta;
use App\Models\Farmacia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CajaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $TotalVenta = $request->TotalVenta;
        $Farmacia = $request->Farmacia;
        $flag=0;
        DB::beginTransaction();
        try {
            $Venta = new Venta();
            $Venta->Farmacia = $request->Farmacia;
            $Venta->Total = $request->TotalVenta;
            $Venta->save();
            DB::commit( );
            $flag = 1;
        } catch (Exception $e) {
            DB::rollback();
            return 0;
        }

        if ($flag == 1) {
            $Productos = $request->carrito;
            DB::beginTransaction();
            try {
                foreach ($Productos as $key => $Producto) {
                    $VentasR = new Venta();
                    $VentasR->Unidades = (int)$Producto['Unidades'];
                    $VentasR->SubTotal = (float)$Producto['SubTotal'];
                    $VentasR->Codigo = 1;
                    $VentasR->IdVenta = $Venta->id;
                    $VentasR->save();
                }
                DB::commit( );
                return 1;
            } catch (Exception $e) {
                DB::rollback();
                return 0;
            }
        }
    }

    public function show(Farmacia $Farmacia)
    {
        $farmacia = $Farmacia;
        return view('PuntoVenta.PuntoDeVenta')->with('Farmacia',$farmacia);
    }

    public function tbl()
    {
        
        $Productos = DB::table('productos')->select('id','Producto','Precio','Finalidad')
        ->where('Existencias','>',0)->get();
        return dataTables()->of($Productos)->toJson();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Caja  $caja
     * @return \Illuminate\Http\Response
     */
    public function edit(Caja $caja)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Caja  $caja
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Caja $caja)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Caja  $caja
     * @return \Illuminate\Http\Response
     */
    public function destroy(Caja $caja)
    {
        //
    }
}
