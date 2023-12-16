<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function scheduleTimezone(){
        return 'America/Mexico_City';
    }

    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        
        /* Se ejecuta diariamente a las 11:30 |  Genera cortes por famacia y un corte general*/
        $schedule->command('cortes:create')->dailyAt('23:30');

        /* Se ejecuta todos los domingos a las 4:00 am | Busca y elimina los productos sin asignacion mayor a dos meses */
        $schedule->command('descontinuados:delete')->sundays()->at('4:00');

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
