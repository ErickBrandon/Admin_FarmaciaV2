@extends('PuntoVenta.layout.master')
@section('head_extra')
<link rel="stylesheet" href="{{asset('PDV/css/principal.css')}}?v={{now()->day}}">
<link rel="stylesheet" href="{{asset('PDV/css/venta.css')}}?v={{now()->day}}">
<link rel="stylesheet" href="{{asset('assets/fonts/fontawesome/css/fontawesome-all.min.css')}}">


@endsection
@section('cont_PDV')
    <div class="container">
        <br>
        <div class="row">
            <div class="col-md-6 col-xl-5">
                <div class="card table-card">
                    <div class="row-table">
                        <div class="col-auto bg-c-green text-white p-t-10 p-b-10">
                            <i class="fas fa-donate f-30"></i>
                        </div>
                        <div class="col text-center">
                            <span class="text-uppercase d-block m-b-10">Ventas</span>
                            <h4 id="PntVenta" class="f-w-300">{{$Farmacia->Farmacia}}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-5">
                <div class="card card-customer">
                    <div class="card-block">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-auto">
                                <i class="fas fa-piggy-bank f-30 text-white theme-bg"></i>
                            </div>
                            <div class="col">
                               
                                @if ($Corte === null)
                                    <span id='FechaCorte' class="text-muted">AAA/mm/ddd</span>
                                    <h4 class="mb-2 f-w-400"><span>$</span><span id="Corte">00.0</span></h4>
                                    <button id="btn_GenerarCorte" type="button" class="btn btn-primary btn-sm col-10" onclick="GenerarCorte()">Generar corte</button>
                                @else
                                    <span id='FechaCorte' class="text-muted">{{$Corte['Fecha']}}</span>
                                    <h4 class="mb-2 f-w-400"><span>$</span><span id="Corte">{{$Corte['TotalCorte']}}</span></h4>
                                    <button id="btn_GenerarCorte" type="button" class="btn btn-primary btn-sm col-10" onclick="GenerarCorte()">Actualizar corte</button>
                                @endif
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h5>Lista de ventas</h5>
                <span class="d-block m-t-5">Ventas realizadas el día de hoy <span id="FechaHoy"></span></span>
            </div>
            <div class="card-block table-border-style">
                <div class="tab-pane fade show active" id="pills-pdv" role="tabpanel" aria-labelledby="pills-pdv-tab">
                    <table id="tbl_ventas" class="display responsive nowrap" style="width:100%">
                        <thead>
                            <tr> 
                                <th>Id</th>
                                <th>Total de venta</th>
                                <th>Fecha de venta</th>
                                <th>Detalles de venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                        <tfoot>
                            <tr> 
                                <th>Id</th>
                                <th>Total de venta</th>
                                <th>Fecha de venta</th>
                                <th>Detalles</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>

   @include('PuntoVenta.Ventas.Modals.Detalle_venta')
   @include('PuntoVenta.Ventas.Modals.Historico')
@endsection
@section('foot_extras')
<script src="{{asset('PDV/Datatable/constructorDatatable_ventas.js')}}?v={{now()->day}}"></script>
<script src="{{asset('js-farmacia/ventas.js')}}?v={{now()->day}}"></script>
@endsection