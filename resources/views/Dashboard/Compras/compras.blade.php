@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="{{asset('PDV/css/compras.css')}}?v={{now()->day}}">
<link rel="stylesheet" href="{{asset('assets/plugins/data-tables/css/datatables.min.css')}}">

<script>
    const _Farmacias=@json($Farmacias);
</script>
@endsection
@section('page')Configuración de administradores @endsection
@section('body-content')
<div class="row">
    <div class="col-sm-12 col-md-4">
            <div class="card rides-bar">
                <div class="card-block">
                    <div class="row d-flex align-items-center">
                        <div class="col-sm-2 col-3">
                            <i class="fas fa-clipboard-list f-30 text-white rides-icon"></i>
                        </div>
                        <div class="col-9 text-center">
                            <h3 class="f-w-300">Registrar factura</h3>
                            <button id="Nueva_factura" class="btn btn-sm  btn-primary feather icon-plus shadow col-12" data-toggle="modal" data-target=".modal-form-factura"></button>
                        </div>
                     </div>
                </div>
            </div>
    </div>
</div>
    
   
    <div class="card">
        <div class="card-header">
            <h5><span class="fas fa-clipboard-list"></span> Facturas</h5>
        </div>
        <div class="card-block">
            <div class="row">
                <div class="alert alert-warning col-12" role="alert">
                    <b><span class="fas fa-exclamation-triangle"></span> Nota:</b> Al asignar al menos <b>un producto</b> a una farmacia, <b>no</b> se podrá volver a editar la factura.
                </div>
            </div>
            <div class="row">
                <div class="col-12"><br>
                    <table id="tbl_Facturas" class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
                        <thead>
                            <tr>
                                <th>Id Factura</th>
                                <th>Farmacia</th>
                                <th>Fecha de registro</th>
                                <th>Proveedor</th>
                                <th>Total de compra</th>
                                <th>Detalles</th>
                                <th>No. Productos</th>
                                <th>No. Asignados</th>
                                <th>Elimnar</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

@include('Dashboard.Compras.Modals.form_Factura')
@include('Dashboard.Compras.Modals.form_Asignaciones')
@endsection
@section('extras_footer')
{{-- <script src="{{asset('assets/plugins/data-tables/js/datatables.min.js?'.date('d'))}}"></script> --}}
<script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('PDV/Datatable/constructorDatatable_compras.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('validationJS/form-validation-compras.js')}}?v={{now()->day}}"></script>
<script src="{{asset('js-farmacia/compras.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>

@endsection