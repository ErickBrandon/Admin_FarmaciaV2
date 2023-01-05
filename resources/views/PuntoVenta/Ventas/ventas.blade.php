@extends('PuntoVenta.layout.master')
@section('head_extra')
<link rel="stylesheet" href="{{asset('PDV/css/principal.css')}}">
<link rel="stylesheet" href="{{asset('PDV/css/venta.css')}}">
<link rel="stylesheet" href="{{asset('assets/fonts/fontawesome/css/fontawesome-all.min.css')}}">
@endsection
@section('cont_PDV')
    <div class="container">
        <br>
        <div class="row">
            <div class="col-md-6 col-xl-4">
                <div class="card table-card">
                    <div class="row-table">
                        <div class="col-auto bg-primary text-white p-t-50 p-b-50">
                            <i class="feather icon-credit-card f-30"></i>
                        </div>
                        <div class="col text-center">
                            <span class="text-uppercase d-block m-b-10">Caja:</span>
                            <h3 class="f-w-300">Tepanco</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-4">
                <div class="card card-customer">
                    <div class="card-block">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-auto">
                                <i class="feather icon-award f-30 text-white bg-warning"></i>
                            </div>
                            <div class="col">
                                <h5 class="text-muted mb-0">Ventas de hoy</h5>
                                <h2 class="mb-2 f-w-300">432</h2>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-4">
                <div class="card card-customer">
                    <div class="card-block">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-auto">
                                <i class="fas fa-piggy-bank f-30 text-white theme-bg"></i>
                            </div>
                            <div class="col">
                                <span class="text-muted">July 01 - June 01 (2016)</span>
                                <h4 class="mb-2 f-w-400"><span>$</span>2,013</h4>
                                <button class="btn btn-primary btn-sm col-10">Generar corte</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h5>Lista de ventas</h5>
                <span class="d-block m-t-5">Ventas realizadas el día de <code>hoy</code> 05/04/2022</span>
            </div>
            <div class="card-block table-border-style">
                <div class="table-responsive">
                    <table id="tbl_ventas" class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Total venta</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($Ventas as $Venta)
                                <tr>
                                    <td>{{$Venta->id}}</td>
                                    <td>{{$Venta->Total}}</td>
                                    <td>
                                        <button class="feather icon-eye btn btn-info" onclick="VerDetalle({{$Venta->id}})"></button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="modal_detalles_venta" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModal">Detalle de venta</h5>
                    <button class="btn btn-light" type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="CerrarDetalle()">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div id="modal-body" class="modal-body">
                    <div class="col-12">
                        <div class="card rides-bar">
                            <div class="card-block">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto">
                                        <i class="feather icon-shopping-cart f-30 text-white rides-icon"></i>
                                    </div>
                                    <div class="col">
                                        <span class="d-block"><strong class="text-c-blue f-w-300">Número de venta</strong></span>
                                        <h3 id="NoVenta" class="f-w-300"></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id='tbl_detalle' class="table table-striped">
                            <thead>
                                <tr class="">
                                    <th>Código</th>
                                    <th>Unidades</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
@endsection
@section('foot_extras')
<script src="{{asset('js-farmacia/ventas.js')}}"></script>
@endsection