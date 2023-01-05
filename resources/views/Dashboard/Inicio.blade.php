@extends('Dashboard.layout.master')
@section('head-external')
@endsection
@section('metaDatos')
@endsection

@section('title')Admin / farmacias @endsection

@section('body-content')
<div class="row">
  <div class="col-md-6 col-xl-4">
    <a href="">
      <div class="card rides-bar">
        <div class="card-block m-t-10">
            <div class="row d-flex align-items-center">
                <div class="col-auto">
                    <i class="feather icon-watch f-30 text-white rides-icon"></i>
                </div>
                <div class="col">
                  <span class="d-block">Historial de control de</span>
                  <h3 class="f-w-300">Entrada</h3>
                </div>
            </div>
        </div>
    </div>
  </a>
</div>
  <div class="col-md-6 col-xl-4">
    <a href="{{route('Proveedores')}}">
      <div class="card rides-bar">
        <div class="card-block m-t-10">
            <div class="row d-flex align-items-center">
                <div class="col-auto">
                    <i class="fas fa-user-lock f-30 text-white rides-icon"></i>
                </div>
                <div class="col">
                  <span class="d-block">Módulo configuración</span>
                  <h3 class="f-w-300">Proveedores</h3>
                </div>
            </div>
        </div>
    </div>
  </a>
</div>

<div class="col-md-6 col-xl-4">
  <a href="{{route('Farmacias')}}">
    <div class="card rides-bar">
      <div class="card-block m-t-10">
          <div class="row d-flex align-items-center">
              <div class="col-auto">
                  <i class="fas fa-hospital f-30 text-white rides-icon"></i>
              </div>
              <div class="col">
                <span class="d-block">Módulo configuración</span>
                <h3 class="f-w-300">Farmacias</h3>
              </div>
          </div>
      </div>
    </div>
  </a>
</div>
</div>
<div class="card">
  <div class="card-header">
      <h5>Control de entrada / Punto de venta</h5>
  </div><br>
  <div class="card-block table-border-style">
      <div class="table-responsive">
          <table class="table table-striped text-center">
              <thead class="table-primary ">
                  <tr>
                      <th>Farmacia</th>
                      <th>Punto de venta</th>
                  </tr>
              </thead>
              <tbody>
                @if (sizeof($Farmacias) == 0)
                    <tr>
                      <td>No hay farmacias registradas</td>  
                    </tr> 
                @else
                  @foreach ($Farmacias as $Farmacia)
                    <tr>
                      <td>{{$Farmacia ->Farmacia}}</td>
                      <td><a href="{{route('PuntoVenta',$Farmacia->id)}}" class="btn btn-dark"><span class="fas fa-share-square"></span> ir</a></td>
                    </tr>
                  @endforeach
                @endif
             
              </tbody>
          </table>
      </div>
  </div>
</div>

@endsection
 
@section('foot_external')
<script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('assets/js/pages/tbl-datatable-custom.js')}}"></script>
<!-- form-picker-custom Js -->
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets/js/pages/form-validation.js')}}"></script>


@endsection