<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Farmacia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FarmaciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vendedores = User::where('rol','Vendedor')
        ->where('password',null)
        ->get();
        return view('Dashboard.Farmacias.farmacias')->with([
            "vendedores"=>$vendedores
        ]);
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

    public function store(Request $request)
    {
       // dd($request);
        DB::beginTransaction();

        try {
        $farmacia = new Farmacia();

            $farmacia->Farmacia = $request->Farmacia;
            $farmacia->Llave = $request->Llave;
            $farmacia->user()->associate($request->Vendedor);
            if ($request->Vendedor != null) {
                $user = User::where('id',$request->Vendedor)->first();
                $user->password = Hash::make($Farmacia->Llave);
                $user->save();
            }
            $farmacia->save();
            DB::commit();
            return true;
        } catch (Exception $e) {
           DB::rollback();
           dd($e);
        }
    }

    public function ActualizarFarmacia(Farmacia $Farmacia, Request $request){
        DB::beginTransaction();
        try {
            $anterior = $Farmacia->user_id;


            $Farmacia->Farmacia = $request->Farmacia;
            $Farmacia->Llave = $request->Llave;
            $Farmacia->user()->associate($request->Vendedor);
            $Farmacia->save();

            if ($request->Vendedor != null) {
                $actual = User::where('id',$request->Vendedor)
                ->where('rol','Vendedor')
                ->first();
                $actual->password = Hash::make($Farmacia->Llave);
                $actual->save();
            }

          
            if ($anterior != $Farmacia->user_id && $anterior != null) {
                $user_anterior = User::where('id',$anterior)
                ->where('rol','Vendedor')
                ->first();
                $user_anterior->password = null;
                $user_anterior->save();
            }
           

            DB::commit();
            return true;
        } catch (Exception $e) {
           DB::rollback();
           dd($e);
        }
    }

    public function DataTableFarmacia()
    {   
        $farmacias = Farmacia::leftJoin('users','users.id','=','farmacias.user_id')
                    ->select('farmacias.id AS ID','Farmacia','Llave','users.name AS Vendedor','users.id AS user_id');
        return datatables()->of($farmacias)->toJson();
    }
}
