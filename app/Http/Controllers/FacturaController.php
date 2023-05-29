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
            $Factura->Total_productos = $request->TotalProductos;
            $Factura->Proveedor()->associate($request->Proveedor);
            $Factura->save();
           
            $Productos = $request->Factura;
            foreach ($Productos as $key => $ProductoTEMP) {
                $producto = new FacturaProducto();
                $producto->Codigo = $ProductoTEMP['Codigo'];
                $producto->Producto = $ProductoTEMP['Producto'];
                $producto->Costo = $ProductoTEMP['Costo'];
                $producto->Piezas = $ProductoTEMP['Piezas'];
                $producto->SubTotal = $ProductoTEMP['SubTotal'];
              
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
      ->select('facturas.id AS ID','Nombre','TotalCompra','Fecha_registro','Total_productos','Total_asignados')
      ->get();
      
      return datatables()->of($Facturas)->toJson();
    }

   
    

  
    public function update(Request $request, Factura $Factura)
    {
        
        DB::beginTransaction();
        try {
          
            if ($request->Eliminados != null ) {
                foreach ($request->Eliminados as $key => $codigo) {
                    $eliminado = FacturaProducto::where('Codigo',$codigo)
                    ->where('factura_id',$Factura->id)
                    ->where('Asignadas',0)->first();
                    $eliminado->delete();
                }
            }

            foreach ($request->Factura as $key => $producto) {
               if (array_key_exists('id', $producto)) {
                    $Editado = FacturaProducto::where('id',$producto['id'])->first();
                    
                    $Editado->Producto = $producto['Producto'];
                    $Editado->Costo = $producto['Costo'];
                    $Editado->Piezas = $producto['Piezas'];
                    $Editado->SubTotal = $producto['SubTotal'];
                    $Editado->save();
               }else{
                    $Nuevo = new FacturaProducto();
                    $Nuevo->Codigo = $producto['Codigo'];
                    $Nuevo->Producto = $producto['Producto'];
                    $Nuevo->Costo = $producto['Costo'];
                    $Nuevo->Piezas = $producto['Piezas'];
                    $Nuevo->SubTotal = $producto['SubTotal'];
                    $Nuevo->Factura()->associate($Factura->id);
                    $Nuevo->save();
               }
            }

            $Factura->TotalCompra = $request->TotalFactura;
            $Factura->Total_productos = $request->TotalProductos;
            $Factura->Proveedor()->associate($request->Proveedor);
            $Factura->save();

            DB::commit();
            return $Factura->id;

        } catch (\Throwable $e) {
            DB::rollback();
           return $e;
        }
        
    }


    public function destroy(Compra $compra)
    {
        //
    }
}
