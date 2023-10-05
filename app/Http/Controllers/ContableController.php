<?php

namespace App\Http\Controllers;

use App\Models\Corte;
use App\Models\Venta;
use App\Models\Detalle;
use App\Models\Farmacia;
use App\Models\CorteGeneral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContableController extends Controller
{
    public function index()
    {
        $Hoy=date('Y/m/d');
        $corte_g =CorteGeneral::where('Fecha',$Hoy)->first();
        $Farmacias = Farmacia::select('id','Farmacia')->get();
        return view('Dashboard.Contable.contable')
        ->with([
            "corte_g"=>$corte_g,
            "Farmacias"=>$Farmacias
        ]);
        
    }
    
    public function DataTableCortesHoy()
    {   
        $Hoy = date('Y/m/d');
        $Data = DB::table('farmacias')->leftJoin('cortes','cortes.farmacia_id','=','farmacias.id')
        ->where('cortes.Fecha',$Hoy)
        ->select('farmacias.id AS ID','Farmacia','TotalCorte','InversionXcorte','cortes.id AS corte_id')
        ->get();
        //dd($Data);
        return datatables()->of($Data)->toJson();
    }

    public function CorteGeneral()
    {
        $Hoy=date('Y/m/d');
        $NuevoGeneral = $this->Generador_CorteGeneral($Hoy);
        $corte_g = CorteGeneral::where('Fecha',$Hoy)->first();

        if ($corte_g == null) { 
            /* Se genera un corte general nuevo para hoy */
            DB::beginTransaction();
            try {
                $corte_g = new CorteGeneral();

                $corte_g->Total =$NuevoGeneral['Total'];
                $corte_g->Inversion = $NuevoGeneral['Inversion'];
                $corte_g->Farmacias = $NuevoGeneral['Farmacias'];
                $corte_g->Fecha = $Hoy;
                $corte_g->save();
                DB::commit();
                return $corte_g;
            } catch (\Throwable $th) {
                DB::rollback();
                return $th;
            }
        }else{
            /* Se actualiza el corte gneral de hoy */
                $corte_g->Total =$NuevoGeneral['Total'];
                $corte_g->Inversion = $NuevoGeneral['Inversion'];
                $corte_g->Farmacias = $NuevoGeneral['Farmacias'];

                $corte_g->save();
                return $corte_g;
        }
    }

    public function Generador_CorteGeneral($Fecha)
    {
        $cortes = DB::table('cortes')->where('Fecha',$Fecha)->get();
       
        $totalCorte = 0;
        $inversion = 0;
        $farmacias = sizeof($cortes);
        foreach ($cortes as $key => $corte) {
           $totalCorte = $totalCorte + $corte->TotalCorte;
           $inversion = $inversion + $corte->InversionXcorte;
        }
        $General =[
            "Total"=>$totalCorte,
            "Inversion"=>$inversion,
            "Farmacias"=>$farmacias
        ];
        
        return $General;
    }

    public function Cortes_Individuales()
    {
        $Hoy = date('Y/m/d');
        $farmacias = DB::table('farmacias')->select('id')->get();

        foreach ($farmacias as $key => $farmacia) {
           
            $Corte = Corte::where('farmacia_id',$farmacia->id)
                    ->where('Fecha',$Hoy)->first();
         
            $DatosNuevos = $this->CorteNuevo($Hoy,$farmacia->id);

            if ($Corte == null) { // se genera un nuevo corte
         
                $Corte = null;
                    DB::beginTransaction();
                    try {
                        $Corte = new Corte();
                        $Corte->TotalCorte = $DatosNuevos['Corte'];
                        $Corte->InversionXcorte = $DatosNuevos['Inversion'];
                        $Corte->Fecha = $Hoy;
                        $Corte->Farmacia()->associate($farmacia->id);
                       
                        $Corte->save();
                        DB::commit();
    
                    } catch (\Throwable $th) {
                        DB::rollback();
                        return 0;
                    }
                
            }else{
                      
                        $Corte->TotalCorte = $DatosNuevos['Corte'];
                        $Corte->InversionXcorte = $DatosNuevos['Inversion'];
                        $Corte->Fecha = $Hoy;
                        
                        $Corte->save();
            }
        }

        return true;
    }

    public function HistorialCG(Request $request)
    {
        $Hoy=date('Y/m/d');

        if ($request->op ==1) {
            $Data = DB::table('cortes_generales')
            ->where('Fecha','!=',$Hoy)
            ->get();
            return datatables()->of($Data)->toJson();
        }else{
            $Data = DB::table('cortes_generales')
            ->where('Fecha','!=',$Hoy)
            ->whereBetween('Fecha',[$request->inicio,$request->fin])
            ->get();
            return datatables()->of($Data)->toJson();
        }
        
    }

    public function EliminarCG(CorteGeneral $CorteGeneral)
    {
        $Hoy=date('Y/m/d');
        $CorteGeneral->where('Fecha','!=',$Hoy)->delete();
        return true;
    }
    public function EliminarTodosCG(Request $request)
    {
        $Hoy=date('Y/m/d');
        if ($request->op == 1) {
            DB::table('cortes_generales')
            ->where('Fecha','!=',$Hoy)
            ->delete();
        }else{
            DB::table('cortes_generales')
            ->where('Fecha','!=',$Hoy)
            ->whereBetween('Fecha',[$request->inicio,$request->fin])
            ->delete();
        }
      
    }

    public function HistorialCF(Request $request)
    {
         $Hoy=date('Y/m/d');
        /* Se inicia el Query base de la consulta  */
       $query ="SELECT C.id AS id ,TotalCorte,InversionXcorte,Fecha,farmacia_id,Farmacia FROM cortes C LEFT JOIN farmacias F ON C.farmacia_id =F.id";

       /* Se valida si son todas las farmacias o una en específico  */
        if ($request->Farmacias == 0) {
           $farmacias = " WHERE";/* se deja vacio si es que se va a consultar todas las farmacias */
        }else{
            /* Se asigna el query solo para una farmacia en específico */
            $farmacias =  " WHERE farmacia_id = ".$request->Farmacias." AND";
        }

        /* Se valida si son se va a consultar los registros según la fecha */
        if ($request->Consulta ==  0) {
            $fecha = " Fecha != '$Hoy'";/* se deja vacio si es que se consultan todos los registros existentes */
        }else{
            if ($request->Consulta == 1) {
                /* Se asigna el query si es que solo se consultan los registros de un solo día */
                $fecha = " Fecha = '".$request->Dia."' AND Fecha != '$Hoy'";
            }else{
                if ($request->Consulta == 2) {
                    /* Se asigna el query si es que se consulta los registros entre dos fechas */
                    $fecha = " Fecha BETWEEN '".$request->Inicio."' AND '".$request->Fin."' AND Fecha != '$Hoy'";
                }
            }
        }

        //dd($query.$farmacias.$fecha." ORDER BY C.id DESC");
     
        $data = DB::select($query.$farmacias.$fecha." ORDER BY C.id DESC");

        return datatables()->of($data)->toJson();
    }

    public function EliminarCF(Request $request)
    {
        
        $Hoy=date('Y/m/d');
       if ($request->Consulta == 0) {
            DB::table('cortes')
            ->where('farmacia_id',$request->Farmacia)
            ->where('Fecha','!=',$Hoy)
            ->delete();
            
            DB::table('venta')
            ->where('farmacia_id',$request->Farmacia)
            ->where('Fecha','!=',$Hoy)
            ->delete();
       }else{
            if ($request->Consulta == 1) {
                DB::table('cortes')
                ->where('farmacia_id',$request->Farmacia)
                ->where('Fecha',$request->Dia)
                ->where('Fecha','!=',$Hoy)
                ->delete();

                DB::table('venta')
                ->where('farmacia_id',$request->Farmacia)
                ->where('Fecha',$request->Dia)
                ->where('Fecha','!=',$Hoy)
                ->delete();

            }else{
                DB::table('cortes')
                ->where('farmacia_id',$request->Farmacia)
                ->whereBetween('Fecha',[$request->Inicio,$request->Fin])
                ->where('Fecha','!=',$Hoy)
                ->delete();

                DB::table('venta')
                ->where('farmacia_id',$request->Farmacia)
                ->whereBetween('Fecha',[$request->Inicio,$request->Fin])
                ->where('Fecha','!=',$Hoy)
                ->delete();
            }
       }
    }



    public function HistorialV(Request $request)
    {
        $Hoy=date('Y/m/d');
    
       if ($request->Consulta == "false") {

            $data = Venta::Where('farmacia_id',$request->Farmacia)
            ->where('Fecha','!=',$Hoy)
            ->get();
       }else{
            $data =Venta::where('farmacia_id',$request->Farmacia)
            ->where('Fecha','!=',$Hoy)
            ->where('Fecha',$request->Dia)
            ->get();
       }

       return datatables()->of($data)->toJson();
    }

    public function HistorialVD(Request $request)
    {
    
       $detalle = Detalle::where('venta_id',$request->Venta)->get();
       
       return $detalle;
    }

    public function CorteHistorialFarmacia(Request $request){
        DB::beginTransaction();
        try{
            /* Se empieza haciendo el corte por farmacia*/
            $corteNuevo = $this->CorteNuevo($request->Fecha, $request->Farmacia);

            $Corte = Corte::where('farmacia_id', $request->Farmacia)
                    ->where('Fecha',$request->Fecha)->first();
            if ($Corte == null) {
                $Corte = new Corte();
                $Corte->TotalCorte = $corteNuevo['Corte'];
                $Corte->InversionXcorte = $corteNuevo['Inversion'];
                $Corte->Fecha = $request->Fecha;
                $Corte->Farmacia()->associate($request->Farmacia);
            } else {
                $Corte->TotalCorte = $corteNuevo['Corte'];
                $Corte->InversionXcorte = $corteNuevo['Inversion'];
                $Corte->Fecha = $request->Fecha;
            }
            $Corte->save();

            $NuevoGeneral = $this->Generador_CorteGeneral($request->Fecha);
            $corte_g = CorteGeneral::where('Fecha',$request->Fecha)->first();

            
            if ($corte_g == null) { 
            /* Se genera un corte general nuevo*/
          
            
                $corte_g = new CorteGeneral();

                $corte_g->Total =$NuevoGeneral['Total'];
                $corte_g->Inversion = $NuevoGeneral['Inversion'];
                $corte_g->Farmacias = $NuevoGeneral['Farmacias'];
                $corte_g->Fecha = $request->Fecha;                
            }else{
            /* Se actualiza el corte gneral*/
                $corte_g->Total =$NuevoGeneral['Total'];
                $corte_g->Inversion = $NuevoGeneral['Inversion'];
                $corte_g->Farmacias = $NuevoGeneral['Farmacias'];
            }

            
            $corte_g->save();
           
            DB::commit();

            return [
                'success' => true,
                'message'=>"Corte individual y corte general, generado existosamente",
                'Corte'=>$Corte->TotalCorte,
                'Corte'=>$corte_g->Total
            ];
        } catch (\Throwable $th) {
            DB::rollback();
            return $th;
        }

        
        
    }
}
