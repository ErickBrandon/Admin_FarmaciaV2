<?php

namespace App\Http\Controllers;

use App\Models\Corte;
use App\Models\Venta;
use App\Models\Farmacia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller
{
    
    public function ventas(Farmacia $Farmacia)
    {   
        $Hoy=date('Y/m/d');
        $Ventas = DB::table('venta')->where('farmacia_id',$Farmacia->id)
        ->where('Fecha',$Hoy)->get();
        
        $NoVentas = sizeof($Ventas);
        if ($NoVentas >= 0 && $NoVentas <= 9) {
            $NoVentas = "0".$NoVentas;
        }
        $Corte = Corte::where('farmacia_id',$Farmacia->id)
        ->where('Fecha',$Hoy)->first();


        return view('PuntoVenta.Ventas.ventas')->with([
            'Ventas' => $Ventas,
            'Farmacia'=>$Farmacia,
            'NoVentas'=>$NoVentas,
            'Corte'=>$Corte
        ]);
    }

    public function corte(Request $request, $Farmacia)
    {   
        dd($request['HTTP_CLIENT_IP'] );
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
                    dd($Corte);
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
       $Detalles = DB::table('detalles_ventas')
       ->where('venta_id',$Venta)
       ->where('Fecha',date('Y/m/d'))->select('Codigo','Producto','Unidades','SubTotal')->get();

       return $Detalles;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Vendidos = DB::table('detalles')->Where('venta_id',$id)->get();
        return $Vendidos;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function edit(Venta $venta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Venta $venta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Venta $venta)
    {
        //
    }
}
