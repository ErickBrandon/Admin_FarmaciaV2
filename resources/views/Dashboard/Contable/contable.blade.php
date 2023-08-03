@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="{{asset('assets/fonts/fontawesome/css/fontawesome-all.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/plugins/data-tables/css/datatables.min.css')}}">
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('body-content')
<div class="row">
    <div class="col-xl-5 col-md-6 col-sm-12">
        <div class="card theme-bg assets-value">
            <div class="bg-img"></div>
            <div class="card-block text-center">
                <i class="fas fa-calendar-alt f-50 text-white m-b-20"></i>
                <h5 class="text-white m-b-20">HOY</h5>
                <h3 class="text-white f-w-300" id="Fecha_hoy"></h3>
            </div>
        </div>
    </div>
    <div class="col-xl-5 col-md-6 col-sm-12">
        <div class="card card-social">
            <div class="card-block border-bottom">
                <div class="row align-items-center justify-content-center">
                    <div class="col-auto">
                        <label for="">Calcular</label><br>
                        <button class="btn btn-icon btn-rounded btn-primary fas fa-calculator col-12" onclick="Corte_General()"></button>
                    </div>
                    <div class="col text-right">
                        @if ($corte_g)
                            <h5 class="text-c-blue mb-0"><span class="text-muted">Gorte general con </span><span id="No_PV">{{$corte_g->Farmacias}} P.V.</span></h5>
                            <h3><span id="Corte_General">${{ number_format($corte_g->Total,2)}}</span></h3>
                        @else
                            <h5 class="text-c-blue mb-0"><span class="text-muted">Gorte general con </span><span id="No_PV">---</span></h5>
                            <h3><span id="Corte_General">---.--</span></h3>
                        @endif
                        
                    </div>
                </div>
            </div>
            <div class="card-block">
                <div class="row align-items-center justify-content-center card-active">
                    <div class="col-6">
                        <h6 class="text-center m-b-10">
                            <span class="text-muted m-r-5">Utilidad:</span>
                            @if ($corte_g)
                                <span id="Utilidad_general">${{number_format($corte_g->Total - $corte_g->Inversion,2)}}</span>
                            @else
                                <span id="Utilidad_general">---.--</span>
                            @endif
                        </h6>
                        <div class="progress">
                            <div class="progress-bar progress-c-green" role="progressbar" style="width:100%;height:6px;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h6 class="text-center m-b-10">
                            <span class="text-muted m-r-5">Inversión:</span>
                            @if ($corte_g)
                                <span id="Inversion_general">${{number_format($corte_g->Inversion,2)}}</span>
                            @else
                                <span id="Inversion_general">---.--</span>
                            @endif
                            
                        </h6>
                        <div class="progress">
                            <div class="progress-bar progress-c-red" role="progressbar" style="width:100%;height:6px;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h5><span class="fas fa-calendar-check"></span> Cortes de hoy</h5>
            </div>
            <div class="card-header">
                <div class="row">
                    <div class="col-md-5 col-sm-12" style="min-width:270px">
                        <div class="card table-card ">
                            <div class="row-table">
                                <div class="col-auto bg-info text-white p-t-10 p-b-10">
                                    <i class="fas fa-piggy-bank f-30"></i>
                                </div>
                                <div class="col text-center">
                                    <span class="text-uppercase d-block m-b-10 text-dark">Generar o Actualizar Cortes</span>
                                    <button onclick="Cortes_Individuales()" class="btn btn-icon btn-rounded btn-outline-info fas fa-check-circle"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-block">
                <table id="tbl_contable" class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
                    <thead>
                        <tr>
                            <th>Farmacia</th>
                            <th>Cortes de hoy</th>
                            <th>Utilidad</th>
                            <th>Inversión</th>
                            <th>Ventas</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

@include('Dashboard.Contable.Tabs.tabs')
    



    
@endsection

@section('extras_footer')
<script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('PDV/Datatable/constructorDatatable_contable.js')}}"></script>

<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('validationJS/form-validation-contable.js')}}"></script>
<script src="{{asset('js-farmacia/contable.js')}}"></script>
@endsection