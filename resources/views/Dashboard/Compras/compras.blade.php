@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="{{asset('PDV/css/compras.css')}}">
{{-- <link rel="stylesheet" href="assets/plugins/data-tables/css/datatables.min.css"> --}}
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('page')Configuración de administradores @endsection
@section('body-content')
    <div class="card">
        <div class="card-header">
            <h5><span class="fas fa-dolly"></span> Factura de compra</h5>
        </div><br>
        <div class="card-block">
            <div class="col-12">
                <div class='input-group input-group-md mb-3'>
                    <div class='input-group-prepend'>
                        <label class='input-group-text' for='Proveedor'><span class='fas fa-clipboard-list text-primary'></span>&nbsp;Proveedor</label>
                    </div>
                    <select class='custom-select' id='Proveedor' name='Proveedor'>
                       @foreach ($Proveedores as $Proveedor)
                           <option value="{{$Proveedor->id}}">{{$Proveedor->Nombre}}</option>
                       @endforeach
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="row">
                    <form id="form_ProductoNuevo" class="col-5">
                        <div class="input-group input-group-md mb- ">
                            <div class="input-group-prepend">
                                <span class="input-group-text feather icon-slack" id="inputGroup-sizing-sm"></span>
                            </div>
                            <input id="Codigo_nuevo" type="text" class="form-control" placeholder="Código de barras" name="Codigo_nuevo" requried="">
                        </div>
                    </form>
                    <div>
                        <button class="btn btn-primary" onclick="AgregarProducto()"><span class="fas fa-plus-circle"></span> Agregar produto</button>
                    </div>
                </div>
            </div><br>
            <form id="form_factura">
                <div class="container">
                    <table id="tbl_compras" class="table table-hover productos">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Costo</th>
                                <th>Piezas</th>
                                <th>Subtotal</th>
                                <th>Quitar</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCompras">            
                        </tbody>
                    </table>
                </div>
            </form>
            <hr>
            <div class=" card-customer">
                <div class="card-block">
                    <div class="row align-items-center justify-content-center">
                        
                        <div class="col">
                            <i class="fas fa-dolly f-30 text-white bg-info"></i>
                        </div>
                        <div class="col-auto">
                            <h5 class="text-muted mb-0">Total de factura</h5>
                            <h2 class="mb-2 f-w-300">$&nbsp;<span id="total_factura">0.00</span></h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <button id="btn_RFactura" class="btn btn-primary col-12">Registrar factura</button>
            </div>
        </div>
    </div>
@endsection
@section('extras_footer')
{{-- <script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('assets/js/pages/tbl-datatable-custom.js')}}"></script> --}}
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('validationJS/form-validation-compras.js')}}"></script>
<script src="{{asset('js-farmacia/compras.js')}}"></script>
<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>
@endsection