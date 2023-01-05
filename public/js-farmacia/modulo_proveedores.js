// -------- Código para manipular el DOM ------------------
$(document).ready(function() {
    $( "#form_proveedores" ).submit(function( event ) {
        event.preventDefault();
    });
});
function cuerpo_form(){
    return "<div class='form-group'>" +
        "<div class='title_form_almacen'>Información complementaria</div> <hr>" +
            "<div class='container'>" +
                "<div class='input-group input-group-md mb-3'>"+
                    "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-user-lock icon_r text-warning mr-2'></span> Proveedor</span>" +
                    "</div>" +
                    "<input id='Nombre' type='text' class='form-control' placeholder='Nombre' name='Nombre'>" +
                "</div>" +
                "<div class='input-group input-group-md mb-3'>" +
                "<div class='input-group-prepend'>" +
                    "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-map-marker-alt icon_r text-info mr-2'></span> Dirección</span>" +
                "</div>" +
                "<input id='Direccion' type='text' class='form-control' placeholder='....' name='Direccion'>" +
            "</div>" +
            "<div class='input-group input-group-md mb-3'>" +
                "<div class='input-group-prepend'>" +
                    "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-phone icon_r text-info mr-2'></span> Teléfono</span>" +
                "</div>" +
                "<input id='Telefono' type='text' class='form-control' name='Telefono'>" +
            "</div>"+
        "</div>"+
    "</div>"
}
function configuracion_btn(){
    document.getElementById('btn_form_proveedores').classList.remove('btn-danger')
    document.getElementById('btn_form_proveedores').classList.add('btn-primary')
    document.getElementById('btn_form_proveedores').innerText="Guardar"
}
function form_agregar(){
    document.getElementById('tituloModal').innerText="Nuevo proveedor"
    //configuracion_btn();
    document.getElementById('form_proveedores').innerHTML=cuerpo_form();
    document.getElementById('btn_form_proveedores').setAttribute("onclick","guardar()");
    document.getElementById('btn_form_proveedores').innerText="Guardar";
    document.getElementById('btn_form_proveedores').classList.add('btn-primary');
    document.getElementById('btn_form_proveedores').classList.remove('btn-danger');
}
function form_editar(id){
    row = document.getElementById(id);
    document.getElementById('tituloModal').innerText="Editar un proveedor"
    //configuracion_btn();
    document.getElementById('form_proveedores').innerHTML=cuerpo_form();
    document.getElementById('btn_form_proveedores').innerText="Guardar cambios";
    document.getElementById('btn_form_proveedores').setAttribute("onclick","actualizar("+id+")");
    document.getElementById('btn_form_proveedores').classList.add('btn-primary');
    document.getElementById('btn_form_proveedores').classList.remove('btn-danger');

    $('input[name=Nombre]').val(row.cells[0].innerText);
    $('input[name=Direccion]').val(row.cells[1].innerText);
    $('input[name=Telefono]').val(row.cells[2].innerText);
}
function form_borrar(id){
    row = document.getElementById(id);
    document.getElementById('tituloModal').innerText="Eliminar proveedor";
    
    document.getElementById('btn_form_proveedores').setAttribute("onclick","eliminar("+id+")");
    //document.getElementById('btn_formAlmacen').setAttribute("onclick","eliminar("+id+")");

    document.getElementById('form_proveedores').innerHTML= "<div class='alert alert-danger f-20' role='alert'>"+
    "Precaución usted esta por eliminar un proveedor con el nombre: <div class='f-30 text-center'>"+row.cells[0].innerText+"</div>"+
    "<h1 class='feather icon-alert-triangle display-1 text-center text-danger'></h1></div>";
    document.getElementById('btn_form_proveedores').innerText="Eliminar Producto";
    document.getElementById('btn_form_proveedores').classList.remove('btn-primary');
    document.getElementById('btn_form_proveedores').classList.add('btn-danger');
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
            '<span class="sr-only">Close</span>' +
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
    document.getElementById('btn_form_proveedores').disabled = true;
    flag = validarlleno();
    if (flag == true) {
        ruta = "GuardarProveedor";
         formData = $("#form_proveedores").serialize();
         colorA = "info";
         mnsjA = "Proveedor guardado con exito";
         inconoA = "fas fa-save";
         CRUD(ruta,formData,colorA,mnsjA,inconoA);
    }else{
        document.getElementById('btn_form_proveedores').disabled = false;
    }
}
function actualizar(id){
    document.getElementById('btn_form_proveedores').disabled = true;
    flag = validarEdicion(id);
    if (flag == true) {
        flag = validarlleno();
        if (flag == true) {
                ruta = "ActualizarProveedor/"+id;
                formData = $("#form_proveedores").serialize();
                colorA = "info";
                mnsjA = "Proveedor actualizado con exito";
                inconoA = "fas fa-save";
                CRUD(ruta,formData,colorA,mnsjA,inconoA);
        } else {
            document.getElementById('btn_form_proveedores').disabled = false;
        }
    } else {
        setTimeout(notify,0000,"inverse",' Ningún campo ha sido modificado','fas fa-leaf');
        document.getElementById('btn_form_proveedores').disabled = false;
    }
}

function eliminar(id){
    document.getElementById('btn_form_proveedores').disabled = true;

    ruta = "EliminarProveedor/"+id;
    formData = $("#form_proveedores").serialize();
    colorA = 'danger';
    mnsjA = 'Proveedor eliminado con exito';
    inconoA = 'fas fa-trash-alt';
    CRUD(ruta,formData,colorA,mnsjA,inconoA);
}

function CRUD(ruta,formData,colorA,mnsjA,inconoA){
    $.ajax({
        url:ruta,
        type: "POST",
        headers:GlobalToken,
        data: formData,
        success:  function(data){       
            $('#tbl_proveedor').DataTable().ajax.reload();

            setTimeout(notify,1000,colorA,mnsjA,inconoA);

            $('#modal_proveedores').modal('hide');
            document.getElementById('btn_form_proveedores').disabled = false;
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            document.getElementById('btn_form_proveedores').disabled = false;
        }
     });
}
function validarEdicion(id){
    fila = document.getElementById(id);
    if (fila.cells[0].innerText == $('input[name=Nombre]').val() &&
        fila.cells[1].innerText == $('input[name=Direccion]').val() &&
        fila.cells[2].innerText == $('input[name=Telefono]').val())
        {
        flag = false;
    } else {
        flag = true;
    }
    return flag
}
function validarlleno(){
    if ($('input[name=Nombre]').val() == '' || $('input[name=Direccion]').val() == '' || $('input[name=Telefono]').val() == '')
        {
        flag = false;
    } else {
        flag = true;
    }
    return flag
}
