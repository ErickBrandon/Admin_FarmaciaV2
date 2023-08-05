<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Dashboard.Administradores.administradores');
    }

    public function Guardarusuario(Request $request){
       //dd($request);
        $existe  = User::where('email',$request->email)->first();
        DB::beginTransaction();
        try {
            $user = new User();
            $user->name = $request->Nombre;
            $user->rol = $request->Rol;
            $user->email = $request->Email;
            if ($user->rol == "Administrador") {
                $user->password = $request->PasswordA;
            }
            $user->save();

            if ($existe !=null) {
                $user->name = $request->Nombre;
                $user->email = $user->id."_".$request->Email;
                $user->rol = $request->Rol;
                if ($user->rol == "Administrador") {

                    $user->password = $request->PasswordA;
                }
                $user->save();
            }
            DB::commit();
            
            return true;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }
    public function ActualizarUsuario(User $usuario, Request $request){
        //dd($request);
        $existe  = User::where('email',$request->email)
                    ->where('id','!=',$usuario->id)
                    ->first();

        DB::beginTransaction();
        try {
            $usuario->name = $request->Nombre;
            $usuario->rol = $request->Rol;
            $usuario->save();

            if ($existe !=null) {
                $usuario->email = $usuario->id."_".$request->Email;
               
            }else{
                $usuario->email = $request->Email;
            }

            if ($usuario->rol == "Administrador") {
               
                $usuario->password =  Hash::make($request->PasswordA);
            }
            $usuario->save();
            DB::commit();
            
            return true;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }
    public function EliminarUsuario(User $usuario){
        DB::beginTransaction();
        try {
           $usuario->delete();
           DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            return $e;
        }

    }

    public function TblUsuarios(){
        $usuarios = User::all();
        return datatables()->of($usuarios)->toJson();
    }





















    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
        $Admin = new User();

            $Admin->Farmacia = $request->Farmacia;
            $Admin->Encargado = $request->Encargado;
           
            $Farm->save();
            DB::commit( );
            
            return 1;
        } catch (Exception $e) {
           DB::rollback();
           return $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
