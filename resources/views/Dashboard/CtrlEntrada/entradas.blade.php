@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="{{asset('assets/plugins/data-tables/css/datatables.min.css')}}">

@endsection
@section('body-content')
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
                        <th>Fecha</th>
                        <th>Hora de entrada</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection

@section('extras_footer')
<script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('PDV/Datatable/constructorDatatable_entradas.js')}}"></script>
<script src="{{asset('js-farmacia/entradas.js')}}?v={{now()->day}}"></script>
{{-- 
<script src="assets/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script src="validationJS/form-validation-farmacia.js"></script>
<script src="js-farmacia/modulo_farmacias.js"></script>
<script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script> --}}
@endsection