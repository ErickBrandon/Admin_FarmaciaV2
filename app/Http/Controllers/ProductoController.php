<?php

namespace App\Http\Controllers;

use App\Models\Farmacia;
use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
  
    public function almacen(Farmacia $Farmacia)
    {   
        $Farmacias = Farmacia::where('id','!=',($Farmacia->id+22))->get();
        
        return view('PuntoVenta.Almacen.almacen')
        ->with([
            'Farmacia'=>$Farmacia,
            'Farmacias'=>$Farmacias
        ]);
    }

    
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
        $producto = new Producto();

            $producto->Codigo = $request->Codigo;
            $producto->Producto = $request->Producto;
            $producto->Precio = $request->Precio;
            $producto->Existencias = $request->Existencias;
            $producto->TipoVenta = $request->TipoVenta;
            $producto->Caducidad = $request->Caducidad;
            $producto->Finalidad = $request->Finalidad;
            $producto->Costo = $request->Costo;
            $producto->CostoAnterior = $request->CostoAnterior;
            $producto->farmacia()->associate( $request->Farmacia);
            $producto->save();
            $producto->proveedores()->attach($request->Proveedor);
            DB::commit( );
            
            return 1;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $Producto)
    {
        $Producto->codigo = $request->Codigo;
        $Producto->Producto = $request->Producto;
        $Producto->Precio = $request->Precio;
        $Producto->Existencias = $request->Existencias;
        $Producto->TipoVenta = $request->TipoVenta;
        $Producto->Caducidad = $request->Caducidad;
        $Producto->Finalidad = $request->Finalidad;
        $Producto->Costo = $request->Costo;
        $Producto->CostoAnterior = $request->CostoAnterior;
        //$Producto->proveedores[0]->updateExistingPivot('proveedor_id',$request->Proveedor);
        $Producto->proveedores[0]->pivot->proveedor_id =$request->Proveedor;
        $Producto->proveedores[0]->pivot->save();
        $Producto->save();
        return 1;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $Producto)
    {   
        $Producto->delete();
        return 1;
    }
    public function ProductoEnAlmacen($Farmacia){
    
        $productos =DB::table('productos')
        ->where('farmacia_id',$Farmacia)
        ->select('productos.id AS ID','Codigo','Producto','Precio','Existencias',
                 'TipoVenta','Caducidad','Costo','Ultima_asignacion','farmacia_id','Piezas_unidad')->get();
        return dataTables()->of($productos)
        ->addColumn('btn',function($productos){
            if ($productos->TipoVenta == "CAJA") {
                return "<button class='btn btn-primary btn-icon' onclick='traslado(".$productos->ID.")'><i class='fas fa-ambulance'></i></button>";
            }
        }
        
        )
        ->rawColumns(['btn'])
        ->toJson();
        
    }

    public function Productos_Proveedores(){
        $Proveedores = Proveedor::select('id','Nombre')->get();
        return $Proveedores;
    }

    
    public function  Traspaso(Producto $Producto, Request $request){
        $Hoy=date('Y/m/d');
        DB::beginTransaction();

        try {
            $Producto->Existencias = $Producto->Existencias - $request->N_cajas;
            $Producto->save();
            
            
            $similar =Producto::where('farmacia_id',$request->Traslado_Farmacias)
            ->where('Codigo',$Producto->Codigo)
            ->where('Caducidad',$Producto->Caducidad)->first();

            if ($similar != null) {
                $similar->Existencias = $similar->Existencias + $request->N_cajas;
               
                $similar->Ultima_asignacion = $Hoy;
               
                $similar->save();
            }else{
                $traslado = new Producto();
                $traslado->Codigo = $Producto->Codigo;
                $traslado->Producto = $Producto->Producto;
                $traslado->Precio = $Producto->Precio;
                $traslado->Existencias = $request->N_cajas;
                $traslado->TipoVenta = "CAJA";
                $traslado->Caducidad = $Producto->Caducidad;
                $traslado->Costo = $Producto->Costo;
                $traslado->farmacia()->associate( $request->Traslado_Farmacias);
                $traslado->Ultima_asignacion = $Hoy;
                $traslado->save();

            }
            DB::commit();
            return true;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }

    function AsignacionVentaPiezas(Request $request){
        $Hoy=date('Y/m/d');
        DB::beginTransaction();
        try {
            //dd($request);
            if ($request->Existente != "false") {
                $exitente = DB::table('productos')->where('id',$request->idExistente)->first();
              /*   dd($request->Existente); */
                $exitente->Existencias = $exitente->Existencias + 10;
                $exitente->Precio = $request->Precio;
                $exitente->Ultima_asignacion = $Hoy;
                
                $exitente->save();
             }else{
                 $referencia = $request->Producto;
               
                 $producto = new Producto();
                 $producto->Codigo =  $referencia["Codigo"];
                 $producto->Producto =  $referencia["Producto"];
                 $producto->Existencias = 10;
                 $producto->Precio = $referencia["Precio"];
                 $producto->Costo = $referencia["Costo"];
                 $producto->TipoVenta = "PIEZA";
                 $producto->Caducidad = $Hoy;
                 $producto->farmacia()->associate($referencia["farmacia_id"]);
                 $producto->Ultima_asignacion = $Hoy;
                 $producto->save();
                 
             }
             DB::commit();
            return $data=[
                "success"=>true,
            ];
        } catch (Exception $e) {
            DB::rollback();
           return $data=[
            "message"=>$e,
            "success"=>false,
        ];
        }
        
    }
}
