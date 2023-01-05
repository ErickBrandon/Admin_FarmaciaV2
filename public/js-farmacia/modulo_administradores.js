$(document).ready(function() {
    $( "#form_administradores" ).submit(function( event ) {
        event.preventDefault();
    });
});
function cuerpo_form() {
    return "<div class='form-group'>" +
            "<div class='container'>" +
                "<div class='input-group input-group-md mb-3'>"+
                    "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-user-tie mr-2'></span>Nombre</span>" +
                    "</div>" +
                    "<input id='Proveedor' type='text' class='form-control' placeholder='' name='Proveedor'>" +
                "</div>" +
                "<div class='input-group input-group-md mb-3'>" +
                "<div class='input-group-prepend'>" +
                    "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-shield-alt icon_r text-info mr-2'></span>Contraseña</span>" +
                "</div>" +
                "<input id='Password' type='password' class='form-control' placeholder='....' name='Password'>" +
            "</div>" +
            "<div class='input-group input-group-md mb-3'>" +
                "<div class='input-group-prepend'>" +
                    "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-shield-alt icon_r text-info mr-2'></span>Confirmar contraseña</span>" +
                "</div>" +
                "<input id='validate_Password' type='password' class='form-control' name='validate_Password'>" +
            "</div>"+
        "</div>"+
    "</div>"
}
function form_agregar() {
    document.getElementById("tituloModal").innerText = "Nuevo Administrador";
    document.getElementById("form_administradores").innerHTML = cuerpo_form();
    document.getElementById('btn_form_administradores').setAttribute("onclick","guardar()")
    document.getElementById("btn_form_administradores").innerText ="Guardar";
    document.getElementById("btn_form_administradores").classList.add('btn-primary');
}
function form_editar() {
    document.getElementById("tituloModal").innerText = "Editar Administrador";
    document.getElementById("form_administradores").innerHTML = cuerpo_form();
    document.getElementById("btn_form_administradores").innerText ="Actualizar";
    document.getElementById("btn_form_administradores").classList.add('btn-primary');
}
// --------- Variables Globales
GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
GlobalErrorCRUD ="Soluciones:\n"
+"1) Intente de nuevo Guardar el registro\n"
+"2) Recargue la página e intente de nuevo guardar el registro\n"
+"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
+"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
// --------- -----------------

function CRUD(ruta,formData,colorA,mnsjA,inconoA){
    $.ajax({
        url:ruta,
        type: "POST",
        headers:GlobalToken,
        data: formData,
        success:  function(data){       
            $('#tbl_farmacia').DataTable().ajax.reload();

            setTimeout(notify,1000,colorA,mnsjA,inconoA);

            $('#modal_farmacias').modal('hide');
            document.getElementById('btn_form_farmacias').disabled = false;
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            document.getElementById('btn_form_farmacias').disabled = false;
        }
     });
}
function guardar() {
    document.getElementById('btn_form_administradores').disabled = true;
    CRUD(
        "GuardarAdministrador",
        $("#form_farmacias").serialize(),
        "info",
        "Farmacia guardada con exito",
        "fas fa-save"
    );
}
