$(document).ready(function() {
    $( "#form_administradores" ).submit(function( event ) {
        event.preventDefault();
    });
});
// --------- Variables Globales
const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
const GlobalErrorCRUD ="Soluciones:\n"
+"1) Intente de nuevo Guardar el registro\n"
+"2) Recargue la página e intente de nuevo guardar el registro\n"
+"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
+"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
// --------- -----------------
var _usuarioEnJuego =[];

$("#Modal_Usuarios").on("hidden.bs.modal", function () {
    
    ReinicioFormUsuarios();
});

$('#btn_usuarioNuevo').on('click', function() {
    $("#Modal_Usuarios").modal('show');
});
function ReinicioFormUsuarios() {
    _usuarioEnJuego = []
    document.getElementById('Nombre').value = null;
    document.getElementById('Rol').value = "";
    document.getElementById('password_admin').innerHTML=null
}

$('#btn_guardarUsuario').on('click', function() {
    let url;
    let text
    if (_usuarioEnJuego.length ==0) {
        console.log("entró");
        url = 'Guardarusuario';
        text="Se ha registrado el nuevo usuario"
    }else{
        console.log(2);
        url = 'ActualizarUsuario/'+_usuarioEnJuego.id;
        text = 'Se ha actualizado la información del usuario'
    }

    let validate = $("#form_usuarios_nuevos").valid();
    if (validate) {
        let data = {};
        data.Nombre = document.getElementById('Nombre').value;
        data.Rol = document.getElementById('Rol').value;
       
        let email =data.Nombre.split(" ").join("");
        email = email.toLowerCase();
        
       
        if (document.getElementById('Rol').value == "Administrador") {
            email = email+"_admin@farmaplus"
            data.Email =email;
            data.Password = document.getElementById('PasswordA').value;
        }else{
            data.Email= email+"@farmaplus";
        }

       
       
        
       
        $.ajax({
            url:url,
            type: "POST",
            headers:GlobalToken,
            data: data,
            success:  function(data){
                $('#tbl_Usuarios').DataTable().ajax.reload();   
                $("#Modal_Usuarios").modal('hide');
                swal(text,{icon:"success"});
                ReinicioFormUsuarios();
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                document.getElementById('btn_form_farmacias').disabled = false;
            }
         });
    }
});

function editarUsuario(id) {
    _usuarioEnJuego = _usuarios.find(u => u.id == id )
    document.getElementById('Nombre').value = _usuarioEnJuego.name;
    document.getElementById('Rol').value = _usuarioEnJuego.rol;
    $("#Modal_Usuarios").modal('show');
}

function eliminarUsuario(id) {
    _usuarioEnJuego = _usuarios.find(u => u.id == id )
    swal({
        title: "¿Desea eliminar el usuario?",
        text: "Nombre: "+_usuarioEnJuego.name+"\n Nombre de usuario: "+_usuarioEnJuego.email+"\nRol: "+_usuarioEnJuego.rol,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((Eliminar) => {
        if (Eliminar) {
            $.ajax({
                url:'EliminarUsuario/'+id,
                type: "POST",
                headers:GlobalToken,
                data: true,
                success:  function(payload){
                    _usuarioEnJuego = []
                $('#tbl_Usuarios').DataTable().ajax.reload();
                    swal("Se ha eliminado el usuario correctamente",
                        {icon:"success",});
                },
                error: function(){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);    
                }
            });
        }
    });
}

$('#Rol').on('change', function(e) {
    if (e.target.value == 'Administrador') {
        document.getElementById('password_admin').innerHTML=`<div class='input-group input-group-md mb-3'>
        <div class='input-group-prepend'>
            <span class='input-group-text'><span class="fas fa-unlock text-info"></span></span>
        </div>
        <input id='PasswordA' type='password' class='form-control' placeholder='Contraseña' name='PasswordA' requried>
    </div>
    <div class='input-group input-group-md mb-3'>
        <div class='input-group-prepend'>
            <span class='input-group-text'><span class="fas fa-unlock-alt text-info"></span></span>
        </div>
        <input id='PasswordA_confirmacion' type='password' class='form-control' placeholder='Confirmar contraseña' name='PasswordA_confirmacion' requried>
    </div>`
    }else{
        document.getElementById('password_admin').innerHTML=null
    }
});