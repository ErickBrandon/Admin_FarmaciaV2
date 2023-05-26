<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;
use App\Models\FacturaProducto;
use Illuminate\Support\Facades\DB;

class FacturaController extends Controller
{
    
    public function index()
    {
        $Proveedores = DB::table('proveedores')->select('id','Nombre')->get();
       
        return view('Dashboard.Compras.compras')
        ->with([
            'Proveedores' =>$Proveedores
        ]);
    }

   
    public function store(Request $request)
    {
        DB::beginTransaction();
        $Hoy=date('Y/m/d');
        try {
            $Factura = new Factura();
            $Factura->TotalCompra = $request->TotalFactura;
            $Factura->Fecha_registro = $Hoy;
            $Factura->Proveedor()->associate($request->Proveedor);
            $Factura->save();
           
            $Productos = $request->Factura;
            foreach ($Productos as $key => $ProductoTEMP) {
                $producto = new FacturaProducto();
                $producto->Codigo = $ProductoTEMP['Codigo'];
                $producto->Producto = $ProductoTEMP['Producto'];
                $producto->Costo = $ProductoTEMP['Costo'];
                $producto->Piezas = $ProductoTEMP['Pz'];
                $producto->SubTotal = $ProductoTEMP['Sub'];
                $producto->Asignadas = 0;
                $producto->Factura()->associate($Factura->id);
                $producto->save();
            }

            DB::commit( );
            return $Factura->id;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }

    public function DetalleFactura(Request $request)
    {
        $Productos = FacturaProducto::where('factura_id',$request->factura_id)->get();
        return $Productos;
    }
  
    public function tbl_facturas()
    {
      $Facturas = Factura::leftjoin('proveedores','proveedores.id','=','facturas.proveedor_id')
      ->select('facturas.id AS ID','Nombre','TotalCompra','Fecha_registro')
      ->get();
      
      return datatables()->of($Facturas)->toJson();
    }

   
    public function edit(Compra $compra)
    {
        //
    }

  
    public function update(Request $request, Compra $compra)
    {
        //
    }


    public function destroy(Compra $compra)
    {
        //
    }
}
