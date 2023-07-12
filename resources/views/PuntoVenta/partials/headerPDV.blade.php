<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="logoPDV"><img src="{{asset('logo/FarmaPlus.png')}}" alt=""></div>
        <button class="btn btn-light navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link disabled text-dark">{{$Farmacia->Farmacia}}</a>
            </li>
            
            <li class="nav-item active">
              <a class="nav-link" href="{{route('PuntoVenta',$Farmacia->id)}}"><b>Punto de venta</b><span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="{{route('Ventas',$Farmacia->id)}}"><b>Ventas</b></a>
            </li>
            @if (auth()->user()->rol == 'Administrador')
              <li class="nav-item active">
                <a class="nav-link" href="{{route('Almacen',$Farmacia->id)}}"><b>Almacen</b><span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="{{route('HomeAdmin')}}"><b>Módulo Administrador</b><span class="sr-only">(current)</span></a>
              </li>
            @endif
            <li class="nav-item dropdown">
              <button class="nav-link dropdown-toggle btn btn-light" role="button" data-toggle="dropdown" aria-expanded="false">  {{"Hola ". auth()->user()->name}}</button>
             
              <div class="dropdown-menu">
                <a class="dropdown-item">{{auth()->user()->email}}</a>
                <a id="btn_Logout" class="dropdown-item"> <span class="fas fa-power-off text-danger"></span> cerrar sesión</a>

              </div>
            </li>
          </ul>
        
        </div>
      </nav>
</header>