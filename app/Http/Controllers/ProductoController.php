<?php

namespace App\Http\Controllers;

use App\Models\Perdida;
use App\Models\Farmacia;
use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use App\Models\HistorialTraspaso;
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
            if ($productos->TipoVenta == "CAJA" && $productos->Existencias >0) {
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
            ->where('TipoVenta','CAJA')
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
                $traslado->farmacia()->associate($request->Traslado_Farmacias);
                $traslado->Ultima_asignacion = $Hoy;
                $traslado->save();

            }

            $historial = new HistorialTraspaso();
            $historial->Codigo = $Producto->Codigo;
            $historial->Producto = $Producto->Producto;
            $historial->Cajas = $request->N_cajas;
            $historial->farmacia_origen = $Producto->farmacia_id;
            $historial->farmacia_destino = $request->Traslado_Farmacias;
            $historial->Fecha_traspaso = $Hoy;
            $historial->save();

            DB::commit();
            return true;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }

    public function AsignacionVentaPiezas(Request $request){
        $Hoy=date('Y/m/d');
        $message = '';
        DB::beginTransaction();
       
        try {
            $EnJuego = Producto::where('id',$request->ProductoEnJuego)->first();
           
            $EnJuego->Existencias = $EnJuego->Existencias - $request->CajasAsignacion;

            if ($request->Pz_exisitentes == "false") {
                $EnJuego->Piezas_unidad = $request->Piezas;
            }
            $EnJuego->save();
           
            if ($request->Similar_id != 0) {
               $similar = Producto::where('id',$request->Similar_id)
               ->where('TipoVenta','PIEZA')
               ->where('farmacia_id',$request->Farmacia)
               ->first();

               $similar->Existencias =  $similar->Existencias + ($request->CajasAsignacion * $EnJuego->Piezas_unidad);
               $similar->Precio = $request->Precio_pz;
               $similar->Costo = $EnJuego->Costo / $EnJuego->Piezas_unidad;
               $similar->Caducidad = $EnJuego->Caducidad;
               $similar->Ultima_asignacion = $Hoy;
               $similar->save();

               $message = "Se agregaron existencias al registro existente con Código: $similar->Codigo y tipo de venta: PIEZA";
            }else{
                $nuevo = new Producto();
            
                $nuevo->Codigo = $EnJuego->Codigo;
                $nuevo->Producto = $EnJuego->Producto;
                $nuevo->Existencias = $request->CajasAsignacion * $EnJuego->Piezas_unidad;
                $nuevo->Precio = $request->Precio_pz;
                $nuevo->Costo = $EnJuego->Costo / $EnJuego->Piezas_unidad;
                $nuevo->TipoVenta = "PIEZA";
                $nuevo->Caducidad = $EnJuego->Caducidad;
                $nuevo->Ultima_asignacion = $Hoy;
                $nuevo->Piezas_unidad = null;
                $nuevo->farmacia()->associate($request->Farmacia);
                $nuevo->save();
                $message = "Se ha creado un nuevo registro para el tiepo de venta: PIEZA del Código: $nuevo->Codigo";
            }
           
             DB::commit();
            return $data=[
                "success"=>true,
                "message"=>$message
            ];
        } catch (Exception $e) {
            DB::rollback();
           return $data=[
            "message"=>$e,
            "success"=>false,
        ];
        }
        
    }

    public function Tbl_historialTraspaso(Request $request, $Farmacia){
        $request->Busqueda = (int)$request->Busqueda;
       
      
        if ($request->Busqueda == 1) {
            $data = DB::table('historial_traspaso')->leftJoin('farmacias','farmacias.id','=','historial_traspaso.farmacia_origen')
            ->where('historial_traspaso.farmacia_destino',$Farmacia)
            ->select('Producto','Cajas','Codigo','Fecha_traspaso','Farmacia')
            ->get();

            return dataTables()->of($data)->toJson();
        }
        if ($request->Busqueda == 2) {
            $data = DB::table('historial_traspaso')->leftJoin('farmacias','farmacias.id','=','historial_traspaso.farmacia_destino')
            ->where('historial_traspaso.farmacia_origen',$Farmacia)
            ->select('Producto','Cajas','Codigo','Fecha_traspaso','Farmacia')
            ->get();

            return dataTables()->of($data)->toJson();
        }

    }

    public function Perdida(Producto $Producto, Request $request){
        DB::beginTransaction();
        try {
            $Producto->Existencias = $Producto->Existencias - $request->Perdida;
            $Producto->save();

            $Perdida = new Perdida;

            $Perdida->Producto = $Producto->Producto;
            $Perdida->Costo_producto = $Producto->Costo;
            $Perdida->No_productos =$request->Perdida;
            $Perdida->Tipo_venta = $Producto->TipoVenta;
            $Perdida->perdida_total = $Producto->Costo * $request->Perdida;
            $Perdida->farmacia_id = $Producto->farmacia_id;
            $Perdida->fecha = date('Y/m/d');
            $Perdida->save();

            DB::commit();
            return [
                'success'=>true,
                'message'=>'El producto se agregó a pérdidas exitosamente'
            ];
        } catch (Exception $e) {
            DB::rollback();
            return [
                'success'=>false,
                'message'=>$e
            ];
        }
    }

    public function Ajuste(Producto $Producto, Request $request ){
        
        DB::beginTransaction();
        try {
           $Producto->Costo = $request->Costo; 
           $Producto->Precio = $request->Precio; 
           $Producto->Existencias = $request->Existencias; 
           $Producto->Caducidad = $request->Caducidad;
            if ($request->VentaCaja == 'true') {
                $Producto->Piezas_unidad = $request->Piezas_unidad;
            }
           $Producto->save();
           DB::commit();

           return $data=[
            "success"=>true,
            "message"=>'Producto ajustado'
        ];
        } catch (Exception $e) {
            DB::rollback();
            return $data=[
             "message"=>$e,
             "success"=>false,
         ];
        }
    }

    public function AsignacionVentaCaja(Request $request){
        $Hoy=date('Y/m/d');
        DB::beginTransaction();
        try {
            $EnJuego = Producto::where('id',$request->EnJuego_id)->first();

            if ($request->Similar == 1) {

                $Caja_similar = Producto::where('id',$request->Similar_id)->first();
                $Caja_similar->Existencias =  $Caja_similar->Existencias + $request->Cajas;
                $Caja_similar->Ultima_asignacion = $Hoy;
                $Caja_similar->save();

                
                $EnJuego->Existencias = $EnJuego->Existencias - ($request->Cajas * $Caja_similar->Piezas_unidad);
                $EnJuego->save();
            }else{
                $nuevo = new Producto();

                $nuevo->Codigo = $EnJuego->Codigo;
                $nuevo->Producto =$EnJuego->Producto;
                $nuevo->Existencias = $request->Cajas;
                $nuevo->Precio = sprintf("%.2f",$request->Precio_venta);
                $nuevo->Costo = sprintf("%.2f", ($request->pz_caja * $EnJuego->Costo));
                $nuevo->TipoVenta = 'CAJA';

                ($EnJuego->Caducidad == null) ? $nuevo->Caducidad = $Hoy : $nuevo->Caducidad = $EnJuego->Caducidad;
                
                
                $nuevo->farmacia()->associate( $EnJuego->farmacia_id);
                $nuevo->Ultima_asignacion = $Hoy;
                $nuevo->Piezas_unidad = $request->pz_caja;
                $nuevo->save();

                $EnJuego->Existencias = $EnJuego->Existencias - ($nuevo->Piezas_unidad * $nuevo->Existencias);
                
                $EnJuego->save();
            }
            DB::commit();
            return [
                'success'=>true,
                'message'=>'La asignación a CAJAS se ha logrado con éxito'
            ];
        } catch (Exception $e) {
            DB::rollback();
            return[
                "message"=>$e,
                "success"=>false,
            ];
        }
    }
}
