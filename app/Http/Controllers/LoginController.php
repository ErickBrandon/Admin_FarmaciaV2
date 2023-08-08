<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    public function AuthAdmin(Request $request)
    {
        try {
            $credenciales = $request ->only('email','password');
            if (Auth::attempt($credenciales)) {
                request()->session()->regenerate();
                if (auth()->user()->rol == 'Administrador' ) {
                    return [
                        "success"=>true,
                        "redirect"=>'/HomeAdmin'
                    ];
                }
                throw new Exception("El usuario no tiene el rol de Administrador");
            }
            throw new Exception("El usuario o contraseña son incorrectas");
        } catch (Exception $e) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            return[
                "success"=>false,
                'message'=>$e->getMessage(),
                'btn'=>'btn_login',
                'token' => csrf_token()

            ];
        }
        
       
    }
    public function AuthVendedor(Request $request){
       
        try {

            $now = Carbon::now()->subHour();
            $hora = (int)$now->format('H');
            if ($hora>= 8 && $hora <= 24) {
                $credenciales = $request ->only('email','password');
                if (Auth::attempt($credenciales)) {
                    request()->session()->regenerate();
                    if (auth()->user()->rol == 'Vendedor') {
                        if (auth()->user()->farmacia != null) {
                            $Faracia = auth()->user()->farmacia->id;
                            return [
                                "success"=>true,
                                "redirect"=>'/PuntoDeVenta/'.$Faracia
                            ];
                        }
                        throw new Exception("El usuario vendedor aun no tiene alguna farmacia asignada");
                    }
                    throw new Exception("El usuario no tiene el rol de vendedor");
                }
                throw new Exception("El usuario o contraseña son incorrectas");
            }else{
                throw new Exception("Lo sentimos, no puedes iniciar sesión fuera de horario laboral");
            }

        } catch (Exception $e) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return[
                "success"=>false,
                'message'=>$e->getMessage(),
                'btn'=>'btn_loginVendedor',
                'token'=> csrf_token()
            ];
        }

/* 
        $now = Carbon::now()->subHour();
        $hora = (int)$now->format('H');

        if ($hora>= 8 && $hora <= 21) {

            
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
        Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
        return "/Inicio";
    }
}
