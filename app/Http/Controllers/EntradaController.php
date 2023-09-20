<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EntradaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Dashboard.CtrlEntrada.entradas');
    }
    public function tbl_entradas()
    {
       $entradas=Entrada::leftjoin('farmacias','farmacias.id','=','entradas.farmacia_id')
       ->select('Fecha_entrada','Hora_entrada','Farmacia')
       ->orderByDesc('entradas.id')
       ->get();
       
       return datatables()->of($entradas)->toJson();
    }
    
    public function EliminarHistorialEntradas()
    {
        try {
            Entrada::truncate();
            return [
                "success"=>true,
                "message"=>"Se eliminó exitosamente el historial"
            ];
        } catch (Exception $e) {
            return [
                "success"=>true,
                "message"=>$e
            ];
        }
    }

}
