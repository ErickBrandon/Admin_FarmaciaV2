@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="assets/plugins/data-tables/css/datatables.min.css">
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('body-content')
    <div class="row">
        <div class="alert alert-primary col-12">
            <p>Para eliminar el historial de entrada de los vendedores, solo se eliminarán todos los registros excepto los de la semana laboral actual considerada de Lunes - Domingo. </p>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-4">
            <div class="card rides-bar">
                <div class="card-block">
                    <div class="row d-flex align-items-center">
                        <div class="col-sm-2 col-3">
                            <i class="fas fa-history f-20 text-white rides-icon"></i>
                        </div>
                        <div class="col-9 text-center">
                            <h3 class="f-w-300">Eliminar Historial</h3>
                            <button id="btn_EliminarHistorial" class="btn btn-sm  btn-danger shadow col-12"><i class="fas fa-trash-alt"></i></button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card col-12">
        <div class="card-header">
            <h5><span class="fas fa-history"></span> Historial de entrada de usuarios</h5>
        </div>
        <div class="card-block">
            <table id="tbl_Entradas" class="display table dt-responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>Farmacia</th>
                        <th>Día</th>
                        <th>Hora de entrada</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection

@section('extras_footer')
<script src="assets/plugins/data-tables/js/datatables.min.js"></script>
<script src="{{asset('PDV/Datatable/constructorDatatable_entradas.js')}}"></script>
{{-- 
<script src="assets/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script src="validationJS/form-validation-farmacia.js"></script>
<script src="js-farmacia/modulo_farmacias.js"></script>
<script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script> --}}
@endsection