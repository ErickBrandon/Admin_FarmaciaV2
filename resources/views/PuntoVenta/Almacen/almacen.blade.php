@extends('PuntoVenta.layout.master')
@section('head_extra')
<link rel="stylesheet" href="{{asset('PDV/css/almacen.css')}}">
<link rel="stylesheet" href="{{asset('assets/plugins/notification/css/notification.min.css')}}">
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('cont_PDV')
<br>
<div class="cont_almacen row">
    <div class="col-md-6 col-xl-4">
        <div class="card table-card">
            <div class="row-table">
                <div class="col-auto bg-primary text-white p-t-50 p-b-50">
                    <i class="feather icon-monitor f-30"></i>
                </div>
                <div class="col text-center">
                    <span class="text-uppercase d-block m-b-10">Mi almacen:<br>{{$Farmacia->Farmacia}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xl-4">
        <div class="card rides-bar">
            <div class="card-block">
                <div class="row d-flex align-items-center">
                    <div class="col-auto">
                        <i class="fas fa-boxes f-30 text-white rides-icon"></i>
                    </div>
                    <div class="col text-center">
                        <h3 class="f-w-300">Agregar producto</h3>
                        <button class="btn btn-sm  btn-primary feather icon-plus shadow col-12" data-toggle="modal" data-target="#modal_almacen" onclick="form_agregar()"></button>
                    </div>
                 </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xl-4">
        <div class="card table-card">
            <div class="row-table">
                <div class="col-auto bg-info text-white p-t-50 p-b-50">
                    <i class="feather icon-info f-30"></i>
                </div>
                <div class="col text-center">
                    <span class="text-uppercase d-block m-b-10">Estatus de caducidad</span>
                    <ul class="Estatus_Caducidad">
                        <li class="Caduco">Caducado</li>
                        <li class="ProximoAcudar">Por caducar (1 a 20 días)</li>
                        <li class="productoOK">Producto OK</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    
<div class="cont_almacen">
    <div class="card">
        <div class="card-body">
            <table id="tbl_almacen" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Existencias</th>
                        <th>Tipo de venta</th>
                        <th>Caducidad</th>
                        <th>Finalidad</th>
                        <th>Costo</th>
                        <th>Costo anterior</th>
                        <th>Proveedor</th>
                        <th>Acción</th>
                    </tr>
                </thead>
            
            </table>
        </div>
    </div>
</div>
<div id="modal_almacen" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalPopoversLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <span id="similar"></span>
                <span id="error"></span>
                <form id="from_body" farmID={{$Farmacia->id}}>

                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" form='from_body' id="btn_formAlmacen"></button>
            </div>
        </div>
    </div>
</div>

@include('PuntoVenta.partials.modal_scanner')
@endsection
@section('foot_extras')
<script src="{{asset('PDV/Datatable/constructorDatatable_almacen.js')}}"></script>
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('validationJS/form-validation-almacen.js')}}"></script>
<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>
<script src="{{asset('js-farmacia/almacen.js')}}"></script>
<script src="{{asset('Scanner/quagga.min.js')}}"></script>
<script>
    const G_scan = new Audio('{{asset('Scanner/sound/scan.mp3')}}');
</script>

@endsection