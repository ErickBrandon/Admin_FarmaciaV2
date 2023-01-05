@extends('Dashboard.layout.master')
@section('extras_header')
@endsection
@section('page')Configuración de administradores @endsection
@section('body-content')
<div class="col-xl-12">
    <div class="card">
        <div class="card-header">
            <h5 class="d-flex justify-content-between align-items-center">
                <span class="f-20">Administradores</span>
                <button class="btn btn-icon btn-rounded btn-primary feather icon-plus " data-toggle="modal" data-target="#modal_administradores" onclick="form_agregar()"></button>
            </h5>
        </div>
        <div class="card-block table-border-style">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th >Usuario</th>
                            <th>Última conexión</th>
                            <th>Cambio de contraseña</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

@endsection
@section('extras_footer')
<script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('assets/js/pages/tbl-datatable-custom.js')}}"></script>
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('validationJS/form-validation-administrador.js')}}"></script>
<script src="{{asset('js-farmacia/modulo_administradores.js')}}"></script>
<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>
@endsection