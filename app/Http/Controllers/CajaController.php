<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Venta;
use App\Models\Detalle;
use App\Models\Farmacia;
use App\Models\Producto;
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
        
        DB::beginTransaction();
        try {
            $Venta = new Venta();
            $Venta->Farmacia = $request->Farmacia;
            $Venta->Total = $request->TotalVenta;
            $Venta->save();

            $Productos = $request->carrito;
            try {
                $agotados = [];
                foreach ($Productos as $key => $Producto) {
                    $Detalle = new Detalle();
                    $Detalle ->Producto = $Producto['Nombre'];
                    $Detalle->Unidades = (int)$Producto['Unidades'];
                    $Detalle->SubTotal = (float)$Producto['SubTotal'];
                    $Detalle->Codigo = $Producto['Codigo'];
                    $Detalle->Id_Venta = $Venta->id;
                    

                    $ProductoAlmacen = Producto::findOrFail($Producto['Identificador']);
                    if ($ProductoAlmacen ->Existencias >= $Detalle->Unidades) {
                        $ProductoAlmacen ->Existencias = $ProductoAlmacen ->Existencias - $Detalle->Unidades;
                        
                        $Detalle->save();
                        $ProductoAlmacen->save();
                    } else {
                        array_push($agotados,$Detalle->Codigo);
                    }
                }
            if (sizeof($agotados)>0) {
                DB::rollback();
                return $agotados;
            }else {
                DB::commit();
                return 1;
            }
            
            } catch (Exception $e) {
                DB::rollback();
                return 0;
            }
        } catch (Exception $e) {
            DB::rollback();
            return 0;
        }
    }

    public function show(Farmacia $Farmacia)
    {
        $farmacia = $Farmacia;
        return view('PuntoVenta.PuntoDeVenta')->with('Farmacia',$farmacia);
    }

    public function tbl($Farmacia)
    {
        $Productos = DB::table('productos')->select('id','Codigo','Producto','Precio','Finalidad','Existencias')
        ->where('Existencias','>',0)
        ->where('id_farmacia',$Farmacia)->get();
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
    public function update(Request $request)
    {
        dd($request);
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
