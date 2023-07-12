<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class General
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
        
        $ruta = $request->route()->getName();
        $path = $request->path();
        //dd($request->path());
        if (auth()->user() != null) {
           
            if (auth()->user()->rol == 'Vendedor') {
                $farmacia_asignada = auth()->user()->farmacia->id;
                
                switch ($ruta) {
                    case 'PuntoVenta':
                        if (("PuntoDeVenta/".$farmacia_asignada) == $path) {
                            return $next($request);
                        }else{
                            return redirect('PuntoDeVenta/'.auth()->user()->farmacia->id);
                        }
                        break;
                    case 'Ventas':
                        if (("PuntoDeVenta/$farmacia_asignada/Ventas") == $path) {
                            return $next($request);
                        }else{
                            return redirect('PuntoDeVenta/'.auth()->user()->farmacia->id);
                        }
                        break;
                    case 'Almacen':
                        if ("PuntoDeVenta/$farmacia_asignada/Almacen" == $path) {
                            return $next($request);
                        }else{
                            return redirect('PuntoDeVenta/'.auth()->user()->farmacia->id);
                        }
                        break;
                    
                    default:
                        return $next($request);
                        break;
                }
                
            }
            if (auth()->user()->rol == 'Administrador') {
                return $next($request);
            }
           
        }else{
            return redirect(route('login'));
        }
    }
}
