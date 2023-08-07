<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    public function AuthAdmin(Request $request)
    {
        
        $credenciales = $request ->only('email','password');
       
        if (Auth::attempt($credenciales)) {
            request()->session()->regenerate();
            if (auth()->user()->rol == 'Administrador' ) {
                return '/HomeAdmin';
            }
            Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            return [
                'status'=>false,
                'menssage'=>"Error: Tu rol no es Administrador"
            ];       
        }else{
            return [
                'status'=>false,
                'menssage'=>"El usuario o contraseña son incorecctos"
            ];
         }
    }
    public function AuthVendedor(Request $request){
       
        try {

            $now = Carbon::now()->subHour();
            $hora = (int)$now->format('H');


        } catch (\Throwable $th) {
           
        }

/* 
        $now = Carbon::now()->subHour();
        $hora = (int)$now->format('H');

        if ($hora>= 8 && $hora <= 21) {

            $credenciales = $request ->only('email','password');
            if (Auth::attempt($credenciales)) {

                if (auth()->user()->rol == 'Vendedor') {

                    if (auth()->user()->farmacia != null) {
                        request()->session()->regenerate();
                        $Faracia = auth()->user()->farmacia->id;
                        return '/PuntoDeVenta/'.$Faracia;
                    }
                    Auth::logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                    return [
                        'status'=>false,
                        'menssage'=>"Error: Tu usuario aun no esta asignado a una farmacia, favor de contactarte con el Administrador"
                    ];
                   
                }

                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return [
                    'status'=>false,
                    'menssage'=>"Error: Tu rol no es Vendedor"
                ];
            }
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return [
                'status'=>false,
                'menssage'=>"El usuario o contraseña son incorecctos"
            ];
        }

        return [
            'status'=>false,
            'menssage'=>"Lo sentimos, no se puede iniciar sesión fuera del horario laboral"
        ]; */
    }

    public function logout(Request $request){
       
        return "/Inicio";
    }
}
