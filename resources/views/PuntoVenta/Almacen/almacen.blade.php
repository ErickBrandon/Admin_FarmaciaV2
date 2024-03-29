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
                        <th>Costo</th>
                        <th>Última asignación</th>
                        <th>Traslado</th>
                    </tr>
                </thead>
            
            </table>
        </div>
    </div>
</div>
<div id="modal_traslado" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalPopoversLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal">Traslado de productos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <p><b>Código:</b> <span id="txt_codigo"></span></p>
                    </div>
                    <div class="col-12">
                        <p><b>Producto:</b> <span id="txt_producto"></span>
                        </div></p>
                    <div class="col-12">
                        <p><b>Existencias:</b> <span id="txt_existencias"></span></p>
                    </div>
                </div>
                <form id='form_traslados'>
                    <div class="row">
                        <div class="input-group input-group-md mb-3 col-12">
                            <label class="col-12">Farmacia de destino del traslado</label>
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="Proveedor"><i class="fas fa-hospital text-info"></i>&nbsp;Farmacias</label>
                            </div>
                            <select class="custom-select" id="Traslado_Farmacias" name="Traslado_Farmacias" requried>
                                <option value="">- Selecciona una farmacia -</option>
                                @foreach ($Farmacias as $f)
                                    <option value="{{$f->id}}">{{$f->Farmacia}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="input-group input-group-md mb-3 col-12">
                            <div class="input-group-prepend">
                                <span class="input-group-text "><span class="fas fa-box text-primary"></span>&nbsp;Cajas</span>
                            </div>
                            <input id="N_cajas" type="number" class="form-control" placeholder="Número de cajas" name="N_cajas" requried min=1 max="">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary col-12" form='from_body' id="btn_formTraslado">Traspasar producto</button>
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
<script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script>
<script>
    const G_scan = new Audio('{{asset('Scanner/sound/scan.mp3')}}');
</script>

@endsection