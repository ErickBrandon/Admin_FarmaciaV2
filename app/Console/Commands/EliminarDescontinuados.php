<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Job;
use App\Models\Producto;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class EliminarDescontinuados extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'descontinuados:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Elimina productos que no tuvieron asignacion en 2 meses';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::beginTransaction();
        try {
          /*   $haceMeses= Carbon::now()->subMonths(2);

            $descontinuados = Producto::whereDate('Ultima_asignacion','<',$fecha_anterior)
            ->where('Existencias',0)
            ->count();

            Producto::whereDate('Ultima_asignacion','<',$fecha_anterior)
            ->where('Existencias',0)
            ->delete(); */

            $job = new Job();
            $job->Job = 'Productos descontinuados';
            $job->Status = 'success';
            $descontinuados = 1;
            $job->Message = 'Se eliminaron '.$descontinuados.' productos sin asignacion';
            $job->fecha_registro = Carbon::now(); ;
            $job->save();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            $job = new Job();
            $job->Job = 'Productos descontinuados';
            $job->Status = 'fail';
            $job->Message = $th->getMessage();
            $job->save();
        }
    }
}
