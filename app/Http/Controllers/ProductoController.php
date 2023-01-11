<?php

namespace App\Http\Controllers;

use App\Models\Farmacia;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
  
    public function almacen(Farmacia $Farmacia)
    {
        return view('PuntoVenta.Almacen.almacen')->with('Farmacia',$Farmacia);
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
            $producto->id_proveedor = 1;
            $producto->id_farmacia = $request->Farmacia;
            $producto->save();
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
        $Producto->id_proveedor = $request->Proveedor;
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
        $productos = Producto::where('id_farmacia',$Farmacia)->get();
        return dataTables()->of($productos)->toJson();
    }
}
