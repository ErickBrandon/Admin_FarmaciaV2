// -------- Código para manipular el DOM ------------------
$(document).ready(function() {
    $( "#form_farmacias" ).submit(function( event ) {
        event.preventDefault();
    });
});
function cuerpo_form(){
    return "<div class='row'>" +
        "<div class='col-md-12'>" +
            "<div class='form-group'>" +
                "<input id='Farmacia' type='text' class='form-control' name='Farmacia' placeholder='Nombre farmacia'>" +
            "</div>" +
        "</div>" +
        "<div class='col-md-12'>" +
            "<div class='form-group'>" +
                "<input id='Encargado' type='text' class='form-control' name='Encargado' placeholder='Encargado'>" +
            "</div>" +
        "</div>" +
    "</div>" 
}
function configuracion_btn(){
    document.getElementById('btn_form_farmacias').classList.remove('btn-danger')
    document.getElementById('btn_form_farmacias').classList.add('btn-primary')
    document.getElementById('btn_form_farmacias').innerText="Guardar"
}
function form_agregar(){
    document.getElementById('tituloModal').innerText="Nueva Farmacia"
    //configuracion_btn();
    document.getElementById('form_farmacias').innerHTML=cuerpo_form();
    document.getElementById('btn_form_farmacias').setAttribute("onclick","guardar()")
    document.getElementById('btn_form_farmacias').innerText="Guardar";
    document.getElementById('btn_form_farmacias').classList.add('btn-primary');
    document.getElementById('btn_form_farmacias').classList.remove('btn-danger');
}
function form_editar(id){
    row = document.getElementById(id);
    document.getElementById('tituloModal').innerText="Editar Farmacia"
    //configuracion_btn();
    document.getElementById('form_farmacias').innerHTML=cuerpo_form();
    document.getElementById('btn_form_farmacias').innerText="Guardar cambios";
    document.getElementById('btn_form_farmacias').setAttribute("onclick","actualizar("+ row.cells[0].innerText +")");
    document.getElementById('btn_form_farmacias').classList.add('btn-primary');
    document.getElementById('btn_form_farmacias').classList.remove('btn-danger');
    
    $('input[name=Farmacia]').val(row.cells[1].innerText);
    $('input[name=Encargado]').val(row.cells[2].innerText);
}
function form_borrar(){
    document.getElementById('tituloModal').innerText="Eliminar Farmacia"
    document.getElementById('form_farmacias').innerHTML="<div class='alert alert-danger alert-link' role='alert'>"+
    "Usted está por eliminar una farmacia <br> ¿Desea continuar?"+
    "</div>"
    document.getElementById('btn_form_farmacias').classList.remove('btn-primary')
    document.getElementById('btn_form_farmacias').classList.add('btn-danger')
    document.getElementById('btn_form_farmacias').innerText="Continuar"
    document.getElementById('btn_form_farmacias').removeAttribute("onclick")

}

function notify(color,mnsj,icono) {
    $.growl({
        icon: icono,
        title: mnsj,
        message:'',
    }, {
        element: 'body',
        type: color,
        allow_dismiss: true,
        placement: {
            from: "top",
            align: "center"
        },
        spacing: 10,
        z_index: 999999,
        delay: 2500,
        timer: 2000,
        url_target: '_blank',
        mouse_over: false,

        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
            '<button type="button" class="close" data-growl="dismiss">' +
            '<span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span><br>' +
            '</button>' +
            '<span data-growl="icon"></span>' +
            '<span data-growl="title"></span>' +
            '<span data-growl="message"></span>' +
            '</div>'
    });

};

// ---------------------------- Lógica ------------------------------------
    // --------- Variables Globales
    GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
    GlobalErrorCRUD ="Soluciones:\n"
    +"1) Intente de nuevo Guardar el registro\n"
    +"2) Recargue la página e intente de nuevo guardar el registro\n"
    +"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
    +"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
        // --------- -----------------
    

// -------- Código para manipular la lógica en el front ------------------

function guardar(){
    document.getElementById('btn_form_farmacias').disabled = true;
    flag = validarlleno();
    if (flag == true) {
        ruta = "GuardarFarmacia";
        formData = $("#form_farmacias").serialize();
        colorA = "info";
        mnsjA = "Farmacia guardada con exito";
        inconoA = "fas fa-save";
        CRUD(ruta,formData,colorA,mnsjA,inconoA);
    } else {
        document.getElementById('btn_form_farmacias').disabled = false;
    }
}
function actualizar(id){
    document.getElementById('btn_form_farmacias').disabled = true;
    flag = validarEdicion(id);
    if (flag == true) {
        flag = validarlleno();
        if (flag == true) {
            ruta = "ActualizarFarmacia/"+id;
            formData = $("#form_farmacias").serialize();
            colorA = "info";
            mnsjA = "Farmacia actualizada con exito";
            inconoA = "fas fa-save";
            CRUD(ruta,formData,colorA,mnsjA,inconoA);
        } else {
            document.getElementById('btn_form_farmacias').disabled = false;
        }
    } else {
        setTimeout(notify,0000,"inverse",' Ningún campo ha sido modificado','fas fa-leaf');
        document.getElementById('btn_form_farmacias').disabled = false;
    }
}
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
function validarEdicion(id){
    fila = document.getElementById(id);
    if (fila.cells[1].innerText == $('input[name=Farmacia]').val() &&
        fila.cells[2].innerText == $('input[name=Encargado]').val())
        {
        flag = false;
    } else {
        flag = true;
    }
    return flag
}
function validarlleno(){
    if ($('input[name=Farmacia]').val() == '' || $('input[name=Encargado]').val() == '')
        {
        flag = false;
    } else {
        flag = true;
    }
    return flag
}