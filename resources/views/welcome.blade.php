<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('assets/fonts/fontawesome/css/fontawesome-all.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <title>Inicio de sesión</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div class="auth-wrapper">
        <div class="auth-content">
            <div class="auth-bg">
                <span class="r"></span>
                <span class="r s"></span>
                <span class="r s"></span>
                <span class="r"></span>
            </div>
            <div class="card">
                <div class="card-body text-center">
                   hola
                    <div class="col-12">
                        <img src="{{asset('logo/FarmaPlus.png')}}" alt="" style="width: 100%">
                    </div>
                    <div class="btn-group btn-group-toggle btn-auth-gen mb-4" data-toggle="buttons">
                        <label id="btn_PDV" class="btn btn-outline-primary btn-icon">
                            <input id="radio_PDV" type="radio" name="options" id="option1"><span><i class="fas fa-store"></i><small class="d-block">Punto de venta</small></span>
                        </label>
                        <label id="btn_Admin" class="btn btn-outline-info btn-icon">
                            <input id="radio_Admin" type="radio" name="options" id="option2"> <span><i class="fas fa-user-tie"></i><small class="d-block">Administrador</small></span>
                        </label>
                    </div>
                    <div class="col-12">
                        <form id='from_login'>
                            
                           
                            
                        </form>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>

    <!-- Required Js -->
    <script src="{{asset('assets/js/vendor-all.min.js')}}"></script>
    <script src="{{asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('assets/js/pcoded.min.js')}}"></script>
    <script src="{{asset('js-farmacia/login.js')}}"></script>
    <script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script>


</body>
</html>