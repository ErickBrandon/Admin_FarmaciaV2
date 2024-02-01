@extends('Dashboard.layout.master')
@section('head-external')
@endsection
@section('metaDatos')
@endsection

@section('title')Admin / farmacias @endsection

@section('body-content')

<div class="row">
  <div class="col-md-6 col-xl-4">
    <a href="{{route('Usuarios')}}">
      <div class="card table-card">
        <div class="row-table">
            <div class="col-auto bg-primary text-white ">
                <i class="fas fa-users-cog f-40"></i>
            </div>
            <div class="col text-center">
              <span class="d-block">Módulo gestión</span>
              <h3 class="f-w-300">Usuarios</h3>
            </div>
        </div>
      </div>
    </a>
  </div>

  <div class="col-md-6 col-xl-4">
    <a href="{{route('CtrlEntradas')}}">
      <div class="card table-card">
        <div class="row-table">
            <div class="col-auto bg-primary text-white">
                <i class="fas fa-clock f-40"></i>
            </div>
            <div class="col text-center">
              <span class="d-block">Historial de control de</span>
              <h3 class="f-w-300">Entrada</h3>
            </div>
        </div>
      </div>
    </a>
  </div>
  
  <div class="col-md-6 col-xl-4">
    <a href="{{route('Farmacias')}}">
      <div class="card table-card">
        <div class="row-table">
            <div class="col-auto theme-bg text-white">
                <i class="fas fa-hospital f-40"></i>
            </div>
            <div class="col text-center">
              <span class="d-block">Módulo configuración</span>
              <h3 class="f-w-300">Farmacias</h3>
            </div>
        </div>
      </div>
    </a>
  </div>

  <div class="col-md-6 col-xl-4">
    <a href="{{route('Proveedores')}}">
      <div class="card table-card">
        <div class="row-table">
            <div class="col-auto theme-bg text-white">
                <i class="fas fa-user-lock f-40"></i>
            </div>
            <div class="col text-center">
              <span class="d-block">Módulo configuración</span>
              <h3 class="f-w-300">Proveedores</h3>
            </div>
        </div>
      </div>
    </a>
  </div>
  
  <div class="col-md-6 col-xl-4">
    <a href="{{route('Compras')}}">
      <div class="card table-card">
        <div class="row-table">
            <div class="col-auto theme-bg text-white">
                <i class="fas fa-dolly f-40"></i>
            </div>
            <div class="col text-center">
              <span class="d-block">Módulo gestión</span>
              <h3 class="f-w-300">Compras</h3>
            </div>
        </div>
      </div>
    </a>
  </div>

  <div class="col-md-6 col-xl-4">
    <a href="{{Route('Contable')}}">
      <div class="card table-card">
        <div class="row-table">
            <div class="col-auto theme-bg text-white">
                <i class="fas fa-balance-scale f-40"></i>
            </div>
            <div class="col text-center">
              <span class="d-block">Módulo gestión</span>
              <h3 class="f-w-300">Contable</h3>
            </div>
        </div>
      </div>
    </a>
  </div> 


  <div class="card col-12">
    <div class="card-header">
        <h5><span class="fas fa-hospital"></span> Puntos de venta</h5>
    
    </div><br>
    <div class="card-block">
      <div class="row align-items-center justify-content-center">
          <div class="col-auto">
            <img src="{{asset('assets_/img/FarmaPlus2.png')}}" alt="" style="border-radius: 0px; width: 100px">
          </div>
          <div class="col">
              <h5>Sistema FarmaPlus.</h5>
              <span> El sistema <b class="text-dark">automáticamente creará o actualizará cortes</b> por farmacia y un corte general <b class="text-dark">diario a las 11:30 pm.</b>
                Si llegara haber una moificación en las ventas despues de las <b class="text-dark">11:31 pm</b> Se tendrá que actualizar los <b class="text-dark">cortes manualmente.</b>
              </span>
          </div>
      </div>
      <ul class="task-list">
          <li class="">
              <i class="task-icon bg-c-green"></i>
              <h6>Hosting (Alojamiento del sistema)<span class="float-right text-muted"></h6>
              <p class="text-muted">Hostinger | <a href="https://www.hostinger.mx/" target="_blank">Sitio oficial</a></span></p>
          </li>
          <li>
              <i class="task-icon @if($DiasFinHosting >28)bg-c-green @endif bg-c-red"></i>
              <h6>Paquete de hosting contratado </h6>
              <p class="text-muted">Cloud Startup | Expira el {{$FinHosting}} | Quedan: {{$DiasFinHosting}} días @if($DiasFinHosting <=28) <span class="spinner-grow text-danger ml-2"></span> @endif</p>
          </li>
          <li>
              <i class="task-icon @if($DiasFinDominio >28)bg-c-green @endif bg-c-red"></i>
              <h6>Daminio (URL del sistema)<span class="float-right "></span></h6>
              <p class="text-muted">admin-farmaplus.com | Expira el {{$FinDominio}} | Quedan: {{$DiasFinDominio}} días @if($DiasFinDominio <=28) <span class="spinner-grow text-danger ml-2"></span> @endif</p>
          </li>
      </ul>
  </div>
    <div class="card-block table-border-style">
        <div class="table-responsive">
            <table class="table table-striped text-center">
                <thead class="table-primary ">
                    <tr>
                        <th>Farmacia</th>
                        <th>Punto de venta</th>
                        <th>Almacen</th>
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
                        <td><a href="{{route('PuntoVenta',$Farmacia->id)}}" class="btn btn-dark"><span class="fas fa-door-open"></span></a></td>
                        <td><a href="{{route('Almacen',$Farmacia->id)}}" class="btn btn-primary"><span class="fas fa-boxes"></span></a></td>
                      </tr>
                    @endforeach
                  @endif
               
                </tbody>
            </table>
        </div>
    </div>
  </div>

</div>
@endsection
 
@section('foot_external')

<script src="{{asset('assets/plugins/data-tables/js/datatables.min.js')}}"></script>
<script src="{{asset('assets/js/pages/tbl-datatable-custom.js')}}"></script>
<!-- form-picker-custom Js -->
<script src="{{asset('assets/plugins/jquery-validation/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets/js/pages/form-validation.js')}}?v={{now()->day}}"></script>


@endsection