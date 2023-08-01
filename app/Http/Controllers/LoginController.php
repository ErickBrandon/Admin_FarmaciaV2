<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
            if (auth()->user()->rol == 'Vendedor' ) {
                if (auth()->user()->id == auth()->user()->farmacia->user_id) {
                    $Faracia = auth()->user()->farmacia->id;
                    return '/PuntoDeVenta/'.$Faracia;
                }
               
            }           
         }else{
             return false;
         }
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return "/Inicio";
    }
}
