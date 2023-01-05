@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="assets/plugins/data-tables/css/datatables.min.css">
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('body-content')
    
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    <span class="f-20">Farmacias</span>
                    <button class="btn btn-icon btn-rounded btn-primary feather icon-plus " data-toggle="modal" data-target="#modal_farmacias" onclick="form_agregar()"></button>
                </h5>
            </div>
            <div class="card-block">
                <table id="tbl_farmacia" class="display table dt-responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Farmacia</th>
                            <th>Encargado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div id="modal_farmacias" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModal">Modal Title</h5>
                    <button class="btn btn-light" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <form id='form_farmacias'>
                        @csrf

                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btn_form_farmacias" type="submit" class="btn btn-primary" form="form_farmacias">Guardar</button>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('extras_footer')
<script src="assets/plugins/data-tables/js/datatables.min.js"></script>
<script src="assets/js/pages/tbl-datatable-custom.js"></script>
<script src="assets/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script src="validationJS/form-validation-farmacia.js"></script>
<script src="js-farmacia/modulo_farmacias.js"></script>
<script src="assets/plugins/notification/js/bootstrap-growl.min.js"></script>
@endsection