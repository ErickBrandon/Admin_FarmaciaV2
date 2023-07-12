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
    document.getElementById('Rol').value = null;
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
        let nombre= document.getElementById('Nombre').value;
        let email =nombre.split(" ").join("");
        email = email.toLowerCase();
        email = email+"@farmaplus"
        let formData = $("#form_usuarios_nuevos").serialize();
        console.log(formData);
        $.ajax({
            url:url,
            type: "POST",
            headers:GlobalToken,
            data: formData+"&email="+email,
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