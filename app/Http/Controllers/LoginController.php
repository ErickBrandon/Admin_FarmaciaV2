<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Entrada;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
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
            $now->modify('+1 hour');
            $hora = (int)$now->format('H');
           
            $horaEntrada = $now->format('H:i:s');
            dd($horaEntrada);
            if ($hora>= 8 && $hora <= 24) {
                $credenciales = $request ->only('email','password');
                if (Auth::attempt($credenciales)) {
                    request()->session()->regenerate();
                    if (auth()->user()->rol == 'Vendedor') {
                        if (auth()->user()->farmacia != null) {
                            $Faracia = auth()->user()->farmacia->id;
                            $this->HoraEntrada($Faracia,$horaEntrada);
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

    }

    public function logout(Request $request){
        Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
        return "/Inicio";
    }

    public function HoraEntrada($farmacia_id,$hora){
        $Hoy=date('Y/m/d');
        $historial = DB::table('entradas')->where('farmacia_id',$farmacia_id)->where('Fecha_entrada',$Hoy)->first();
       
        if ($historial == null) {
          $entrada = new Entrada();
          $entrada->Fecha_entrada = $Hoy;
          $entrada->farmacia_id = $farmacia_id;
          $entrada->Hora_entrada = $hora;
         $entrada->save();
        }
       
    }
}
