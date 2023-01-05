<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="FP_Recursos/login.css">
    <title>Inicio de sesión</title>
</head>
<body>
    <div class="m-0 vh-100 row justify-content-center aling-items-center">
        <div class="col-md-6 col-xl-4">
            <div class="card mb-3">
                <div class="logo">
                    <img class="card-img-top" src="{{asset('img/FarmaPlus.png')}}" alt="Card image cap">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">Sistema de Gestión y Administración.</h5>
                    <form action="/Auth" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="exampleInputEmail1">Correo Electrónico</label>
                            <input type="email" class="form-control"  aria-describedby="emailHelp" name="email" placeholder="Ingresar correo..." required>
                            <small id="emailHelp" class="form-text text-muted">Ingresa el correo proporcionado por FarmaPlus.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Contraseña</label>
                            <input class="form-control" id="exampleInputPassword1"  name="password" type="password" placeholder="Contraseña" required>
                        </div>
                        <input class="col-12 btn btn-primary btn-sm" type="submit" value="Iniciar Sesión">
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</body>
</html>