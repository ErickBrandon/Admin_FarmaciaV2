var _typeUser = 0;

const GlobalErrorCRUD ="Soluciones:\n"
+"1) Intente de nuevo Guardar el registro\n"
+"2) Recargue la página e intente de nuevo guardar el registro\n"
+"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
+"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
/* ---------------------------------------------------------------------------------------------------------------- */

$("#btn_PDV").on("click", function () {
    _typeUser = 1;
    document.getElementById('from_login').innerHTML=`
    <div class='input-group input-group-md mb-3'>
        <div class='input-group-prepend'>
            <span class='input-group-text'><span class="fas fa-user text-primary"></span>&nbsp;</span>
        </div>
        <input id='email' type='text' class='form-control' placeholder='Nombre de usuario' name='email' requried>
    </div>
    <div class='input-group input-group-md mb-3'>
        <div class='input-group-prepend'>
            <span class='input-group-text'><span class="fas fa-barcode text-primary"></span>&nbsp;</span>
        </div>
        <input id='Password-scan' type='password' class='form-control' placeholder='Escanea la llave' name='password' requried style="color: transparent">
    </div>
    <button id='btn_loginVendedor' type='button' class="btn btn-primary mb-4 shadow-2">Ingresar</button>`
    
});

$("#btn_Admin").on("click", function () {
    _typeUser = 2;
    document.getElementById('from_login').innerHTML=`<div class='input-group input-group-md mb-3'>
    <div class='input-group-prepend'>
        <span class='input-group-text'><span class="fas fa-user text-primary"></span>&nbsp;</span>
    </div>
    <input id='email' type='text' class='form-control' placeholder='Nombre de usuario' name='email' requried>
</div>
<div class='input-group input-group-md mb-3'>
    <div class='input-group-prepend'>
        <span class='input-group-text'><span class="fas fa-unlock-alt text-primary"></span>&nbsp;</span>
    </div>
    <input id='Password' type='password' class='form-control' placeholder='Ingresa tu contraseña' name='password' requried>
</div>
<button id='btn_login' type='button' class="btn btn-primary mb-4 shadow-2">Ingresar</button>`
});


$(document).on("click","#btn_login", function () {
    let data = $("#from_login").serialize();
    data=data+"&_typeUser="+_typeUser;
    loadingShow("btn_login")
    login(data,"/Auth");
});

function login(data,url){
    console.log({'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')});
    $.ajax({
        url:url,
        type: "POST",
        headers:GlobalToken,
        data: data,
        success:  function(data){

            if (data.success) {
                $(location).attr('href',data.redirect);
                return;
            }

            swal({
                title:"Error",
                text: data.message,
                icon: "error",
            })
            loadingHide(data.btn);
        GlobalToken = {'X-CSRF-TOKEN':data.token}
        },
        error: function(){
            
            
        }
     });
}

function loadingShow(id){
    document.getElementById(id).disabled =true;
    let loading =document.createElement('span')
    $(loading).attr('class', "spinner-border spinner-border-sm");
    $(loading).attr('id', "load_btn");
    document.getElementById(id).appendChild(loading)
}

function loadingHide(id){
    document.getElementById("load_btn").remove();
    document.getElementById(id).disabled =false;
}

$(document).on("click","#btn_loginVendedor", function () {
    loadingShow("btn_loginVendedor");
    let hora = new Date();
    console.log(hora.getHours());
    if (hora.getHours() >= 8 && hora.getHours() <= 24) {
        let data = $("#from_login").serialize();
        data=data+"&_typeUser="+_typeUser;
        login(data,"/AuthVendedor");
    }else{
        loadingHide("btn_loginVendedor")
        swal({
            title:"Lo sentimos",
            text: "No se puede iniciar sesión fuera de horario laboral",
            icon: "error",
        })
    }
    
});