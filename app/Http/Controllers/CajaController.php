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
       // dd($request);
        $Hoy = date('Y/m/d');
        DB::beginTransaction();
        try {
            $Productos = $request->carrito;
            
            /* Se registra una nueva venta con los datos generales */
            $Venta = new Venta();
            $Venta->farmacia()->associate($request->Farmacia);
            $Venta->Total = $request->TotalVenta;
            $Venta->Fecha = $Hoy;
            $Venta->save();

            /* Se inicializa un array para guardar productos que se vendieron pero por alguna razón ya se agitaron */
            $agotados = [];

            $InversionVenta = 0;
            foreach ($Productos as $key => $Producto) {
                
                /* Se busca el producto en juegon en el almacen para descontar existencias y extraer información */
                $ProductoAlmacen = Producto::findOrFail($Producto['id']);
                if ($ProductoAlmacen ->Existencias >= $Producto['UnidadesVenta']) {
                    /* Se modifica el contador de existencias */
                    $ProductoAlmacen ->Existencias = $ProductoAlmacen ->Existencias - $Producto['UnidadesVenta'];
                    $ProductoAlmacen->save();
                    
                    /* Como ya se generó el registro de una venta, se continua en generar 
                    los detalles de esa venta */
                    $Detalle = new Detalle();
                        // Las siguientes lineas se llenan con la info que llego con el $request
                    $Detalle ->Producto = $Producto['Producto'];
                    $Detalle->Unidades = (int)$Producto['UnidadesVenta'];
                    $Detalle->SubTotal = (float)$Producto['SubTotal'];
                    $Detalle->Codigo = $Producto['Codigo'];
                    $Detalle->Fecha = $Hoy;
                    $Detalle->TipoVenta = $Producto['TipoVenta'];

                        //Las siguientes lineas se llenan con info de la query del almacen $ProductoAlmacen
                    $Detalle->Inversion = $ProductoAlmacen->Costo * $Detalle->Unidades;                    
                    $Detalle->producto()->associate($ProductoAlmacen->id);
                        // se relaciona la venta con los detalles de venta
                    $Detalle->venta()->associate($Venta->id);
                    $Detalle->save();
    

                    $InversionVenta = $InversionVenta + $Detalle->Inversion;
                } else {
                    array_push($agotados,$Detalle->Codigo);
                }
            }
            /* Se valida si hay algun producto sin existencias */
            if (sizeof($agotados)>0) {
                /* en caso de que se halla vendido algun producto agotado, se echa atrás todo para confirmar algunas cosas */
                DB::rollback();
                return $agotados;
            }else {
                /* en caso de que todo este bien, se guardan los registros */
                $Venta->Inversion_Venta = $InversionVenta;
                $Venta->save();
                DB::commit();
                return 1;
            }
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
        }
    }

    public function show(Farmacia $Farmacia)
    {
        $farmacia = $Farmacia;
        return view('PuntoVenta.PuntoDeVenta')->with('Farmacia',$farmacia);
    }

    public function tbl($Farmacia)
    {
        $Productos = DB::table('productos')->select('id','Codigo','Producto','Precio','Existencias','TipoVenta','Costo')
        ->where('Existencias','>',0)
        ->where('farmacia_id',$Farmacia)->get();
        
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
