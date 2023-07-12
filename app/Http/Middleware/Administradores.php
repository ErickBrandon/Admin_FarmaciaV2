<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Administradores
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() != null) {
            if (auth()->user()->rol == 'Administrador') {
                return $next($request);
            }else{
                return redirect('PuntoDeVenta/'.auth()->user()->farmacia->id);
            }
        }else{
            return redirect(route('login'));
        }
        
    }
}
