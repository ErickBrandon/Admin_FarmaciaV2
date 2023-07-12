var _typeUser = 0;
const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
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
    </div>`
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
    loadig(1,"btn_login")
    login(data);
});

function login(data){
    $.ajax({
        url:"/Auth",
        type: "POST",
        headers:GlobalToken,
        data: data,
        success:  function(data){
            if (data == false) {
                swal({
                    title: "Las credenciales son incorrectas",
                    text: "",
                    icon: "error",
                })
                loadig(2,"btn_login")
                return false;
            }
    
            $(location).attr('href',data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            document.getElementById('btn_form_farmacias').disabled = false;
        }
     });
}

function loadig(flag,id) {
    if (flag == 1) {
        document.getElementById(id).disabled =true;
        let loading =document.createElement('span')
        $(loading).attr('class', "spinner-border spinner-border-sm");
        $(loading).attr('id', "load_btn");
        document.getElementById(id).appendChild(loading)
    }else{
        document.getElementById("load_btn").remove();
        document.getElementById(id).disabled =false;
    }
    
}
