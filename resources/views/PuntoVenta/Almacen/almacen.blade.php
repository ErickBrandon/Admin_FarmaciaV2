@extends('PuntoVenta.layout.master')
@section('head_extra')
<link rel="stylesheet" href="{{asset('PDV/css/almacen.css')}}">
<link rel="stylesheet" href="{{asset('assets/plugins/notification/css/notification.min.css')}}">

@endsection
@section('cont_PDV')
<br>
<div class="cont_almacen row">
    <div class="col-md-6 col-xl-4">
        <div class="card table-card">
            <div class="row-table">
                <div class="col-auto bg-primary text-white p-t-10 p-b-10">
                    <i class="fas fa-clipboard-list f-30"></i>
                </div>
                <div class="col text-center">
                    <span class="text-uppercase d-block m-b-10">Almacen:<br>{{$Farmacia->Farmacia}}</span>
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
    <div class="col-md-6 col-xl-4">
        <div class="card table-card">
            <div class="row-table">
                <div class="col-auto bg-primary text-white">
                    <i class="fas fa-history f-30"></i>
                </div>
                <div class="col text-center">
                    <span class="text-uppercase d-block m-b-10">Historial de traspaso</span>
                    <button type="button" id="btn_modalHT" class="btn btn-info" value="1">Recibidos</button>
                    <button type="button" id="btn_modalHT2" class="btn btn-primary" value="2">Enviados</button>
                </div>
            </div>
        </div>
    </div>
</div>
    
<div class="cont_almacen">
    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table id="tbl_almacen" class="display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Existencias</th>
                            <th>Tipo de venta</th>
                            <th>Caducidad</th>
                            <th>Costo</th>
                            <th>Piezas x Caja</th>
                            <th>Última asignación</th>
                            <th>CAJA => PIEZA</th>
                            <th>PIEZA => CAJA</th>
                            <th>Traspaso</th>
                            <th>Pérdidas</th>
                            <th>Ajustes</th>
                        </tr>
                    </thead>
                
                </table>
            </div>
           
        </div>
    </div>
</div>

@include('PuntoVenta.Almacen.modals.cambioTipoVenta')
@include('PuntoVenta.Almacen.modals.cambioTipoVenta_Caja')
@include('PuntoVenta.Almacen.modals.traslado')
@include('PuntoVenta.Almacen.modals.historialTraslado')
@include('PuntoVenta.Almacen.modals.perdidasProductos')
@include('PuntoVenta.Almacen.modals.ajustesProducto')

@include('PuntoVenta.partials.modal_scanner')
@endsection
@section('foot_extras')
<script src="{{asset('PDV/Datatable/constructorDatatable_almacen.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('validationJS/form-validation-almacen.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>
<script src="{{asset('js-farmacia/almacen.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script>
<script>
    const G_scan = new Audio('{{asset('Scanner/sound/scan.mp3')}}');
</script>

@endsection