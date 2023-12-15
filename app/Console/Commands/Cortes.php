<?php

namespace App\Console\Commands;

use App\Models\Job;
use App\Models\Corte;
use App\Models\CorteGeneral;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Cortes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cortes:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Se ha realizado cortes por farmacia y general de hoy';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::beginTransaction();
        try {
            $Hoy = date('Y/m/d');
            /* ---------------Se generará cortes por farmacia ---------------------*/
            
            $farmacias = DB::table('farmacias')->select('id')->get();
            foreach ($farmacias as $key => $farmacia) {
                $Corte = Corte::where('farmacia_id',$farmacia->id)
                ->where('Fecha',$Hoy)->first();

                $DatosNuevos = $this->CorteNuevo($Hoy,$farmacia->id);
                if ($Corte == null) {
                    $Corte = new Corte();
                    $Corte->TotalCorte = $DatosNuevos['Corte'];
                    $Corte->InversionXcorte = $DatosNuevos['Inversion'];
                    $Corte->Fecha = $Hoy;
                    $Corte->Farmacia()->associate($farmacia->id);
                   
                    $Corte->save();
                }else{
                    
                    $Corte->TotalCorte = $DatosNuevos['Corte'];
                    $Corte->InversionXcorte = $DatosNuevos['Inversion'];
                    $Corte->Fecha = $Hoy;
                    
                    $Corte->save();
                }

            }

            /* --------- Se generá el corte general-------------------------- */
            $NuevoGeneral = $this->Generador_CorteGeneral($Hoy);
            $corte_g = CorteGeneral::where('Fecha',$Hoy)->first();

            if ($corte_g == null) { 
                $corte_g = new CorteGeneral();

                $corte_g->Total =$NuevoGeneral['Total'];
                $corte_g->Inversion = $NuevoGeneral['Inversion'];
                $corte_g->Farmacias = $NuevoGeneral['Farmacias'];
                $corte_g->Fecha = $Hoy;
                $corte_g->save();
            }else{
                $corte_g->Total =$NuevoGeneral['Total'];
                $corte_g->Inversion = $NuevoGeneral['Inversion'];
                $corte_g->Farmacias = $NuevoGeneral['Farmacias'];

                $corte_g->save();
            }


            /* --------------Reporte del Job------------------------------ */
            $job = new Job();
            $job->Job = 'Cortes de caja';
            $job->Status = 'success';
            $job->Message = '¡Ok!';
            $job->save();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            $job = new Job();
            $job->Job = 'Cortes de caja';
            $job->Status = 'fail';
            $job->Message = $th->getMessage();;
            $job->save();
        }
        
    }

    Public function CorteNuevo($fecha, $Farmacia)
    {
        $Ventas = DB::table('venta')
        ->where('farmacia_id',$Farmacia)
        ->where('Fecha',$fecha)->get();
        
        $TotalDeVentas = 0;
        $Inversion = 0;
        foreach ($Ventas as $key => $venta) {
            $TotalDeVentas = $TotalDeVentas + $venta->Total;
            $Inversion = $Inversion + $venta->Inversion_Venta;
        }
        $CorteNuevo =[
            'Corte'=>$TotalDeVentas,
            'Fecha'=>$fecha,
            'Inversion'=>$Inversion
        ];

        return $CorteNuevo;
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
}
