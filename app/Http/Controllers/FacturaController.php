<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Producto;
use App\Models\Asignacion;
use Illuminate\Http\Request;
use App\Models\FacturaProducto;
use Illuminate\Support\Facades\DB;

class FacturaController extends Controller
{

    
    public function index()
    {
        
        $Proveedores = DB::table('proveedores')->select('id','Nombre')->get();
        $Farmacias = DB::table('farmacias')->select('id','Farmacia')->get();
       
        return view('Dashboard.Compras.compras')
        ->with([
            'Proveedores' =>$Proveedores,
            'Farmacias' =>$Farmacias
        ]);
    }

   
    public function store(Request $request)
    {
        //dd($request);
        DB::beginTransaction();
        $Hoy=date('Y/m/d');
        try {
            $Factura = new Factura();
            $Factura->TotalCompra = $request->TotalFactura;
            $Factura->Fecha_registro = $Hoy;
            $Factura->Total_productos = $request->TotalProductos;
            $Factura->Total_asignados = $request->TotalProductos;
           
            $Factura->Proveedor()->associate($request->Proveedor);
            $Factura->farmacia()->associate($request->Farmacia);
            $Factura->save();

            $Productos = $request->Factura;
            foreach ($Productos as $key => $ProductoTEMP) {
                $fp = new FacturaProducto();
                $fp->Codigo = $ProductoTEMP['Codigo'];
                $fp->Producto = $ProductoTEMP['Producto'];
                $fp->Costo_Unidad = $ProductoTEMP['Costo_Unidad'];
                $fp->Unidades = $ProductoTEMP['Unidades'];
                $fp->SubTotal = $ProductoTEMP['SubTotal'];
                $fp->Caducidad = $ProductoTEMP['Caducidad'];
                $fp->Piezas_unidad = $ProductoTEMP['Piezas_unidad'];
                $fp->Precio_Unidad = $ProductoTEMP['Precio_Unidad'];
                $fp->Factura()->associate($Factura->id);
                $fp->save();

                $producto_almacen = Producto::where('Codigo',$fp->Codigo)
                ->where('Caducidad',$fp->Caducidad)
                ->where('TipoVenta',"CAJA")
                ->where('farmacia_id',$request->Farmacia)
                ->first();

                if ($producto_almacen != null) {
                    $producto_almacen->Existencias = $fp->Unidades + $producto_almacen->Existencias;
                    $producto_almacen->Costo = $fp->Costo_Unidad;
                    $producto_almacen->Precio = $fp->Precio_Unidad;
                    $producto_almacen->Ultima_asignacion =$Hoy;
                    $producto_almacen->Piezas_unidad = $fp->Piezas_unidad;
                    $producto_almacen->save();
                }else{
                    $p = new Producto();
                    $p->Codigo = $fp->Codigo;
                    $p->Producto =  $fp->Producto;
                    $p->Precio = $fp->Precio_Unidad;
                    $p->Existencias = $fp->Unidades;
                    $p->TipoVenta = "CAJA";
                    $p->Caducidad =   $fp->Caducidad;
                    $p->Piezas_unidad = $fp->Piezas_unidad;
                    $p->Costo = $fp->Costo_Unidad;
                    $p->Ultima_asignacion = $Hoy;
                    $p->farmacia()->associate($request->Farmacia);
                    $p->save();
                }
    
           

            }
            DB::commit( );
            return [
                "success"=>true,
                "Factura"=> $Factura->id
            ];
        } catch (\Throwable $th) {
            DB::rollback();
           return [
            "success"=>false,
            "error"=>$th
           ];
        }
    }

    public function DetalleFactura(Request $request)
    {
        $Precios;
        $Productos = FacturaProducto::where('factura_id',$request->factura_id)->get();
        foreach ($Productos as $key => $p) {
          
        }
        return $Productos;
    }
  
    public function tbl_facturas()
    {
      $Facturas = Factura::leftjoin('proveedores','proveedores.id','=','facturas.proveedor_id')
      ->leftjoin('farmacias','farmacias.id','=','facturas.farmacia_id')
      ->select('facturas.id AS ID',
                'proveedor_id',
                'Nombre',
                'TotalCompra',
                'Fecha_registro',
                'Total_productos',
                'Total_asignados',
                'Farmacia',
                'farmacia_id')
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

                    /* $Factura->TotalCompra = $Factura->TotalCompra - ($eliminado->Unidades * $eliminado->Costo_Unidad);
                    $Factura->Total_productos = $Factura->Total_producto - $eliminado->Unidades; */
                }
            }
            
            foreach ($request->Factura as $key => $producto) {
               if (array_key_exists('id', $producto)) {
                
                    $Editado = FacturaProducto::where('id',$producto['id'])->first();
                    
                    $Editado->Producto = $producto['Producto'];
                    $Editado->Costo_Unidad = $producto['Costo_Unidad'];
                    $Editado->Unidades = $producto['Unidades'];
                    $Editado->SubTotal = $producto['SubTotal'];
                    $Editado->Caducidad = $producto['Caducidad'];
                    $Editado->Piezas_unidad = $producto['Piezas_unidad'];
                    $Editado->save();
               }else{
                    $Nuevo = new FacturaProducto();
                    $Nuevo->Codigo = $producto['Codigo'];
                    $Nuevo->Producto = $producto['Producto'];
                    $Nuevo->Costo_Unidad = $producto['Costo_Unidad'];
                    $Nuevo->Unidades = $producto['Unidades'];
                    $Nuevo->SubTotal = $producto['SubTotal'];
                    $Nuevo->Caducidad = $producto['Caducidad'];
                    $Nuevo->Piezas_unidad = $producto['Piezas_unidad'];
                    $Nuevo->Factura()->associate($Factura->id);
                    $Nuevo->save();
               }
            }   

            $Factura->TotalCompra = $request->TotalFactura;
            $Factura->Total_productos = $request->TotalProductos;
            $Factura->Proveedor()->associate($request->Proveedor);
            $Factura->Farmacia()->associate($request->Farmacia);
            $Factura->save();

            DB::commit();
            return $Factura->id;

        } catch (\Throwable $e) {
            DB::rollback();
           return $e;
        }
        
    }

    public function GuardarAsignacion(Request $request)
    {
        $Hoy=date('Y/m/d');
        $producto_factura = FacturaProducto::where('factura_id',$request->Factura)
                            ->where('id',$request->Producto_id)->first();

        $Factura = Factura::where('id',$producto_factura->factura_id)->first();

        $producto_almacen = Producto::where('Codigo',$producto_factura->Codigo)
                            ->where('Caducidad',$request->Caducidad)
                            ->where('TipoVenta',$request->select_TV)
                            ->where('farmacia_id',$request->select_farmacias)
                            ->first();
        
        DB::beginTransaction();
        try {
            /* Se contabiliza el numero de unidades asignadas del producto */
            $producto_factura->Asignadas = $producto_factura->Asignadas + $request->piezas_asignacion;
            $producto_factura->save();
             
            /* Se contabiliza el numero de unidades asignadas en la factura*/
            $Factura->Total_asignados = $Factura->Total_asignados + $request->piezas_asignacion;
            $Factura->save();

            $Asignacion = new Asignacion ();

            if ($producto_almacen != null) {
               
                if ($request->select_TV == "CAJA") {
                    $producto_almacen->Existencias = $producto_almacen->Existencias + $request->piezas_asignacion;
                    $producto_almacen->Costo = $producto_factura->Costo_Unidad;
                    $producto_almacen->Precio = $producto_factura->Precio_Unidad;
                }
                if ($request->select_TV == "PIEZA") {
                    $producto_almacen->Existencias = $producto_almacen->Existencias + ($request->piezas_asignacion *  $producto_factura->Piezas_unidad);      
                    $producto_almacen->Costo = $producto_factura->Costo_Unidad / $producto_factura->Piezas_unidad;
                    $producto_almacen->Precio = $producto_factura->Precio_Piezas;
                }
                $producto_almacen->Caducidad = $rexquest->Caducidad;
                $producto_almacen->Ultima_asignacion = $Hoy;

                $producto_almacen->save();
            }else{
                /* Teniendo las unidades del producto disponible, se agregan en el almacen del la farmacia */
                $this->NuevaAsignacion($producto_factura,$request,$Hoy);        
            }

            $Asignacion = new Asignacion();

            $Asignacion->Codigo = $producto_factura->Codigo;
            $Asignacion->Producto = $producto_factura->Producto;
            $Asignacion->Tipo_venta = $request->select_TV;
            $Asignacion->Unidades = $request->piezas_asignacion;
            if ($request->select_TV == "PIEZA") {
                $Asignacion->Piezas_unidad = $producto_factura->Piezas_unidad;
            }
            $Asignacion->Fecha_asignacion =$Hoy;
            $Asignacion->FacturaProducto()->associate($producto_factura->id); 
            $Asignacion->Farmacia()->associate($request->select_farmacias); 

            $Asignacion->save();
            DB::commit();
            return [
                'Producto'=>$producto_factura->id,
                'Asignadas'=>$request->piezas_asignacion,
            ];
        } catch (\Throwable $th) {
            DB::rollback();
            dd($th);
        }
        
        //throw new Exception ('Debes insertar un número positivo');
    }


    public function NuevaAsignacion($producto_factura,$request,$Hoy)
    {
        $Producto = new Producto();
        $Producto->Codigo = $producto_factura->Codigo;
        $Producto->Producto = $producto_factura->Producto;
        if ($request->select_TV == "CAJA") {
            $Producto->Existencias = $request->piezas_asignacion;
            $Producto->Costo = $producto_factura->Costo_Unidad;
            $Producto->Precio = $producto_factura->Precio_Unidad;
        }
        if ($request->select_TV == "PIEZA") {
            $Producto->Existencias = $request->piezas_asignacion *  $producto_factura->Piezas_unidad;      
            $Producto->Costo = $producto_factura->Costo_Unidad / $producto_factura->Piezas_unidad;
            $Producto->Precio = $producto_factura->Precio_Piezas;
        }

        $Producto->TipoVenta = $request->select_TV;
        $Producto->Caducidad = $request->Caducidad;
        $Producto->Ultima_asignacion = $Hoy;
        $Producto->farmacia()->associate($request->select_farmacias);
        $Producto->save();
    }






    public function SimilarEnFarmacia($Codigo,$Caducidad,$Farmacia)
    {
        
        $producto = DB::table('productos')->where('Codigo',$Codigo)
                        ->where('Caducidad',$Caducidad)  
                        ->where('Caducidad',$Caducidad)
                        -first();     
    }

    public function PrecioUnidad(FacturaProducto $FacturaProducto, Request $request)
    {
       
        DB::beginTransaction();
        try {
            $FacturaProducto->Precio_Unidad = $request->Precio;
            $FacturaProducto->save();
            DB::commit();
            return $FacturaProducto->id;
        } catch (\Throwable $th) {
            DB::rollback();
            return false;
        }
    }
    public function PrecioPieza(FacturaProducto $FacturaProducto, Request $request)
    {
        DB::beginTransaction();
        try {

            $FacturaProducto->Piezas_unidad = $request->Piezas;
            $FacturaProducto->Precio_Piezas = $request->Precio;
            $FacturaProducto->save();
            DB::commit();
            return $FacturaProducto->id;
        } catch (\Throwable $th) {
            DB::rollback();
            dd($th);
        }
    }
   
    public function EliminarFactura(Factura $Factura){
         DB::beginTransaction();
         try {
            $Factura->delete();
            DB::commit();
            return true;
         } catch (\Throwable $th) {
            DB::rollback();
            dd($th);
         }
    }

    public function OtrasAsignaciones(Request $request){
     

        switch ($request->op) {
            case 1:
                $Otra = DB::table('asignaciones')
                ->where('factura_producto_id',$request->producto)
                ->get();
                break;
            case 2:
                $Otra = DB::table('productos')
                ->where('Codigo',$request->producto)
                ->get();
                break;
            case 3:
                $Otra = DB::table('productos')
                ->where('Producto',$request->producto)
                ->get();
                break;
        }
        
        return $Otra;
    }
    public function Asignacion(FacturaProducto $Producto,Factura $Factura, Request $request){
      
      $Hoy=date('Y/m/d');
        DB::beginTransaction();
        try {
           $Producto->Asignadas = $Producto->Asignadas+ ($request->Cajas + $request->Piezas);
           if ($request->Cajas != 0) {
            $Producto->Precio_Unidad =$request->Venta_caja;
           }
           if ($request->Piezas!= 0) {
            $Producto->Precio_Piezas =$request->Venta_pz;
           }
           
           
           $Producto->save();
            
           $Factura->Total_asignados = $Factura->Total_asignados + $Producto->Asignadas;
           $Factura->save();

           if ($request->Cajas != 0) {

            $similar = Producto::where('Codigo',$Producto->Codigo)
            ->where('Caducidad', $Producto->Caducidad)
            ->where('TipoVenta','CAJA')
            ->where('farmacia_id',$Producto->farmacia_id)
            ->first();

            if ($similar != null) {
                $similar->Precio = $request->Venta_caja;
                $similar->Existencias = $similar->Existencias + $request->Cajas;
                $similar->Costo = $Producto->Costo_Unidad;
                $similar->Ultima_asignacion =$Hoy;
                $similar->update();
                
    
               }else{
                $cj = new Producto();
                $cj->Codigo = $Producto->Codigo;
                $cj->Producto = $Producto->Producto;
                $cj->Precio = $request->Venta_caja;
                $cj->Existencias = $request->Cajas;
                $cj->Caducidad = $Producto->Caducidad;
                $cj->Costo = $Producto->Costo_Unidad;
                $cj->TipoVenta = "CAJA";
                $cj->Ultima_asignacion =$Hoy;
                $cj->farmacia()->associate($Factura->farmacia_id);
                $cj->save();
               }

           }
           $similar = null;
           if ($request->Piezas!= 0) {
            $similar = Producto::where('Codigo',$Producto->Codigo)
            ->where('Caducidad', $Producto->Caducidad)
            ->where('TipoVenta','PIEZA')
            ->where('farmacia_id',$Producto->farmacia_id)
            ->first();
 
            if ($similar != null) {
             $similar->Precio = $request->Venta_caja;
             $similar->Existencias = $similar->Existencias + $request->Piezas;
             $similar->Costo =$Producto->Costo_Unidad/$Producto->Piezas_unidad;
             $similar->Ultima_asignacion =$Hoy;
             $similar->save();
            }else{
             $pz = new Producto();
             $pz->Codigo = $Producto->Codigo;
             $pz->Producto = $Producto->Producto;
             $pz->Precio = $request->Venta_pz;
             $pz->Existencias = $request->Piezas;
             $pz->Caducidad = $Producto->Caducidad;
             $pz->Costo = $Producto->Costo_Unidad/$Producto->Piezas_unidad;
             $pz->TipoVenta = "CAJA";
             $pz->Ultima_asignacion =$Hoy;
             $pz->farmacia()->associate($Factura->farmacia_id);
             $pz->save();
            }
           }
           

           
           

           
           DB::commit();
           return true;
        } catch (\Throwable $th) {
           DB::rollback();
           dd($th);
        }
    }

    function BusquedaProducto(Request $request){
       
        $coincidencia = DB::table('productos')
        ->where('codigo',$request->Codigo)
        ->where('farmacia_id',$request->Farmacia)
        ->first();
        if ($coincidencia != null) {
            $data = [
                "Existencia"=>true,
                "Producto"=> $coincidencia->Producto,
                "Precio"=>$coincidencia->Precio,
                "Costo"=>$coincidencia->Costo,
                "Piezas_unidad"=>$coincidencia->Piezas_unidad
            ];
            return $data;
        }
        
        return [
            "Existencia"=>false
        ];
    }
}
