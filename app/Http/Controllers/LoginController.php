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
            return redirect('HomeAdmin');
         }else{
             return "Fallido";
         }
    }
}
