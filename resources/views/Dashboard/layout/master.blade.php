@include('Dashboard.layout.header')
@include('Dashboard.layout.navbar')
@include('Dashboard.layout.navbar-movile')
<div class="pcoded-main-container">
    <div class="pcoded-wrapper">
        <div class="pcoded-content">
            <div class="pcoded-inner-content">
                
                <div class="main-body">
                        <!-- [ Main Content ] start -->
                    <div class="page-wrapper">
                                @yield('body-content')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('Dashboard.layout.footer')

