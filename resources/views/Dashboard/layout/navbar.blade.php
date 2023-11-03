<nav class="menu-dark-background pcoded-navbar menu-light brand-lightblue icon-colored menupos-static">
    <div class="navbar-wrapper">
        <div class="navbar-brand header-logo">
            <a href="{{route('HomeAdmin')}}" class="b-brand">
                <div class="logoPDV"><img src="{{asset('logo/FarmaPlus.png')}}" alt="" style="border-radius: 14px"></div>
                <span class="b-title"></span>
            </a>
            <a class="mobile-menu" id="mobile-collapse" href="#!"><span></span></a>
        </div>
        <div class="navbar-content scroll-div">
            
            <ul class="nav pcoded-inner-navbar">
                <li class="nav-item pcoded-menu-caption"><label>Navegación</label></li>
                <li  class="nav-item">
                    <a href="{{route('HomeAdmin')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="feather icon-home"></i>
                        </span>
                        <span class="pcoded-mtext">Inicio</span>
                    </a>
                </li>
                <li  class="nav-item">
                    <a href="{{Route('Contable')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="fas fa-balance-scale"></i>
                        </span>
                        <span class="pcoded-mtext">Contable</span>
                    </a>
                </li>
                <li  class="nav-item">
                    <a href="{{route('Compras')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="fas fa-dolly"></i>
                        </span>
                        <span class="pcoded-mtext">Compras</span>
                    </a>
                </li>
                <li  class="nav-item">
                    <a href="{{route('Proveedores')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="fas fa-user-lock"></i>
                        </span>
                        <span class="pcoded-mtext">Proveedores</span>
                    </a>
                </li>
                <li  class="nav-item">
                    <a href="{{route('CtrlEntradas')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="fas fa-clock"></i>
                        </span>
                        <span class="pcoded-mtext">Gestión entrada</span>
                    </a>
                </li>
                <li  class="nav-item">
                    <a href="{{route('Usuarios')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="fas fa-users-cog"></i>
                        </span>
                        <span class="pcoded-mtext">Usuarios</span>
                    </a>
                </li>
                <li  class="nav-item">
                    <a href="{{route('Farmacias')}}" class="nav-link">
                        <span class="pcoded-micon">
                            <i class="fas fa-hospital"></i>
                        </span>
                        <span class="pcoded-mtext">Farmacias</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" id='btn_Logout'>
                        <span class="pcoded-micon">
                            <i class="feather icon-power"></i>
                        </span>
                        <span class="pcoded-mtext">Cerrar sesión</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>