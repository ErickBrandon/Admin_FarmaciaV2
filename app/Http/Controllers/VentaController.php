<?php

namespace App\Http\Controllers;

use App\Models\Corte;
use App\Models\Venta;
use App\Models\Detalle;
use App\Models\Farmacia;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller
{
    
    public function ventas(Farmacia $Farmacia)
    {   
        $Hoy=date('Y/m/d');

        
        $Corte = Corte::where('farmacia_id',$Farmacia->id)
        ->where('Fecha',$Hoy)->first();


        return view('PuntoVenta.Ventas.ventas')->with([
            'Farmacia'=>$Farmacia,
            'Corte'=>$Corte,
        ]);
    }
    public function TblVentas($farmacia_id){
        $Hoy=date('Y/m/d');
        $Ventas = DB::table('venta')->where('farmacia_id',$farmacia_id)
        ->where('Fecha',$Hoy)->get();

        return dataTables()->of($Ventas)->toJson();

    }

    public function corte(Request $request, $Farmacia)
    {   
       // dd($request['HTTP_CLIENT_IP'] );
        $Hoy=date('Y/m/d');

        
        $Corte = Corte::where('farmacia_id',$Farmacia)
        ->where('Fecha',$Hoy)->first();
        $corteNuevo = $this->CorteNuevo($Hoy,$Farmacia);
     
        if ($Corte == null) { // se genera un nuevo corte
         
            $Corte = null;
                DB::beginTransaction();
                try {
                    $Corte = new Corte();
                    $Corte->TotalCorte = $corteNuevo['Corte'];
                    $Corte->InversionXcorte = $corteNuevo['Inversion'];
                    $Corte->Fecha = $Hoy;
                    $Corte->Farmacia()->associate($Farmacia);
                   
                    $Corte->save();
                    DB::commit();
                    return $corteNuevo;

                } catch (\Throwable $th) {
                    DB::rollback();
                    return 0;
                }
            
        }else{
                DB::beginTransaction();
                
                try {
                    $Corte->TotalCorte = $corteNuevo['Corte'];
                    $Corte->InversionXcorte = $corteNuevo['Inversion'];
                    $Corte->Fecha = $Hoy;
                    
                    $Corte->update();
                    DB::commit();
                    return $corteNuevo;

                } catch (\Throwable $th) {
                    return 0;
                }
            
        }
    }
    
    public function detalles($Venta)
    {
        $admin = false;
        if (auth()->user()->rol == 'Administrador') {
            $admin = true;
        }

       $Detalles = DB::table('detalles_ventas')
       ->where('venta_id',$Venta)
       ->where('Fecha',date('Y/m/d'))
       ->select(
        'id',
        'Codigo',
        'Producto',
        'Unidades',
        'SubTotal',
        'TipoVenta',
        'producto_id'
        )->get();

       return [
        'Detalles' => $Detalles,
        'Admin' => $admin
       ];
    }
    
    public function show($id)
    {
        $Vendidos = DB::table('detalles')->Where('venta_id',$id)->get();
        return $Vendidos;
    }

    public function CancelarVenta(Venta $Venta, Request $request){
        DB::beginTransaction();
        try {
            $Cancelados = $request->Cancelados;
        
            foreach ($Cancelados as $key => $value) {
                $detalle = Detalle::where('id',$value['detalle_id'])->first();
                $producto = Producto::where('id',$value['producto_id'])->first();

                $Venta->Total =$Venta->Total - ($producto->Precio * $value['pz_canceladas']);
                $Venta->Inversion_Venta = $Venta->Inversion_Venta - ($producto->Costo * $value['pz_canceladas']);
                $Venta->save();

                if ($detalle->Unidades == (int)$value['pz_canceladas']) {
                    $detalle->delete();
                }else{
                    $detalle->Unidades = $detalle->Unidades - (int) $value['pz_canceladas'];
                    $detalle->SubTotal = $detalle->SubTotal - ((int)$value['pz_canceladas'] * $producto->Precio);
                    $detalle->Inversion = $detalle->Inversion -((int)$value['pz_canceladas'] * $producto->Costo);
                    $detalle->save();
                }
                

                if ($Venta->Total == 0 &&  $Venta->Inversion_Venta == 0) {
                    $Venta->delete();
                }

                $producto->Existencias =  $producto->Existencias +(int)$value['pz_canceladas'];
                $producto->save();

            }
            DB::commit();
                return[
                    'success'=>true,
                    'message'=>'Se ha cancelado las ventas exitosamente'
            ];
        } catch (\Throwable $th) {
           dd($th);
        }
    }
}
