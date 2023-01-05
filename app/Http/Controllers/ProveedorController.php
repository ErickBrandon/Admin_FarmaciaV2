<?php

namespace App\Http\Controllers;


use App\Models\Proveedor;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProveedorController extends Controller
{
    public function index()
    {
        return view('Dashboard.Proveedores.proveedores');
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
        $Proveedor = new Proveedor();

            $Proveedor->Nombre = $request->Nombre;
            $Proveedor->Direccion = $request->Direccion;
            $Proveedor->Telefono = $request->Telefono;
           
            $Proveedor->save();
            DB::commit( );
            return 1;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }

    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proveedor $Proveedor)
    {
        $Proveedor->Nombre = $request->Nombre;
        $Proveedor->Direccion = $request->Direccion;
        $Proveedor->Telefono = $request->Telefono;

        $Proveedor->save();
        return 1;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proveedor $Proveedor)
    {
        $Proveedor->delete();
        return 1;
    }

    public function DataTableProveedor()
    {   
        $proveedor = Proveedor::all();
        return datatables()->of($proveedor)->toJson();
    }
}
