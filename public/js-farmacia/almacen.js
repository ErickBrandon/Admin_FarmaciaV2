$(document).ready(function() {
    $( "#from_body" ).submit(function( event ) {
        event.preventDefault();
    });
});
function cuerpo_form(){
return "<div class='form-group'>"+
"<div class='title_form_almacen'>Información principal</div> <hr>"+
"<div class='container info_principal'>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text feather icon-slack' id='inputGroup-sizing-sm'></span>"+
        "</div>"+
        "<input id='Codigo' type='text' class='form-control' placeholder='Código de barras | Escanéalo' name='Codigo' requried>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text fas fa-prescription-bottle-alt text-primary' id='inputGroup-sizing-sm'></span>"+
        "</div>"+
        "<input type='text' class='form-control' placeholder='Producto: Nombre | Detalles' name='Producto' requried>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text fas fa-dollar-sign text-success' id='inputGroup-sizing-sm'></span>"+
        "</div>"+
        "<input type='number' class='form-control' placeholder='Precio venta | 00.00' name='Precio' requried>"+
    "</div>"+
"</div>"+
"<br><div class='title_form_almacen'>Información para almacén</div> <hr>"+
"<div class='container'>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-boxes icon_r text-info'></span>Existencias</span>"+
        "</div>"+
        "<input type='number' class='form-control' placeholder='0' name='Existencias' requried>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<label class='input-group-text' for='inputGroupSelect01'><span class='fas fa-tags icon_r'></span>Tipo de venta</label>"+
        "</div>"+
        "<select class='custom-select' id='inputGroupSelect01' name='TipoVenta'>"+
            "<option value='Caja'>Caja</option>"+
            "<option value='Pieza'>Pieza</option>"+
        "</select>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-times icon_r text-danger'></span>Caducidad</span>"+
        "</div>"+
        "<input type='date' class='form-control' name='Caducidad' requried>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text feather icon-info text-primary' id='inputGroup-sizing-sm'></span>"+
        "</div>"+
        "<input type='text' class='form-control' placeholder='Finalidad | ¿Para qué sirve?' name='Finalidad' requried>"+
    "</div>"+
"</div>"+
"<br><div class='title_form_almacen'>Información complementaria</div> <hr>"+
"<div class='container'>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-donate icon_r text-warning'></span>Costo</span>"+
        "</div>"+
        "<input type='number' class='form-control' placeholder='00.00' name='Costo' requried>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-donate icon_r text-info'></span>Costo anterior</span>"+
        "</div>"+
        "<input type='number' class='form-control' placeholder='00.00' name='CostoAnterior' requried>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<label class='input-group-text' for='inputGroupSelect01'><span class='fas fa-user-lock icon_r text-primary'></span>Proveedor</label>"+
        "</div>"+
        "<select class='custom-select' id='inputGroupSelect01' name='Proveedor'>"+
            "<option value='1'>Erick Brandon</option>"+
        "</select>"+
    "</div>"+
"</div>"+
"</div>"
}
function pregunta(){
    return"<div class='form-group'>"+
    "<div class='checkbox checkbox-primary d-inline'>"+
    "<input type='checkbox' name='checkbox-p-1' id='checkbox-p-1' onclick='info_automatico()'>"+

    "<label for='checkbox-p-1' class='cr text-info'>¿Hay otro producto similar?</label>"+
    "</div>"+
    "<span id='form_autoCompletado'></span>"+
"</div>"+
"</div>"
}
function checkEditar(id){
return"<div class='form-group'>"+
    "<div class='checkbox checkbox-primary d-inline'>"+
    "<input type='checkbox' name='checkbox-p-1' id='checkbox-p-1' onclick='editarCodigo("+id+")'>"+

    "<label for='checkbox-p-1' class='cr text-info'>¿Deseas editar el código de barras?<br>¡Recuerdad que es su identificador!</label>"+
    "</div>"+
    "<span id='form_autoCompletado'></span>"+
    "</div>"+
"</div>"
}
function form_busqueda(){
return "<div class='alert alert-secondary' role='alert'>"+
    "<form id='form_similar'>"+
        "<div class='form-group'>"+
            "<div class='title_form_almacen'>Busqueda para auto-acompletar</div> <hr>"+
            "<p>Ingresa el código para auto-completar el producto</p>"+
            "<div class='input-group input-group-md mb-3'>"+
                "<div class='input-group-prepend'>"+
                    "<span class='input-group-text feather icon-slack' id='inputGroup-sizing-sm'></span>"+
                "</div>"+
                "<input id='ProductoSimilar' type='text' class='form-control' placeholder='Código de barras | Escanéalo'>"+
            "</div>"+
        "</div>"+
        "<button type='button' class='btn btn-rounded btn-dark col-12 feather icon-search' onclick='buscarSimilar()'></button>"+
    "</form>"+
"</div>"
}
function info_automatico(){
    if (document.getElementById('checkbox-p-1').checked) {
        document.getElementById('form_autoCompletado').innerHTML=form_busqueda();
    } else {
        document.getElementById('form_autoCompletado').innerHTML=null;
    }
}
function form_agregar(){
    document.getElementById('tituloModal').innerText="Nuevo Producto";
    document.getElementById('similar').innerHTML=pregunta();
    document.getElementById('from_body').innerHTML=cuerpo_form();
    document.getElementById('btn_formAlmacen').innerText="Agregar al almacen";
    document.getElementById('from_body').setAttribute("onsubmit","return guardar()");
    document.getElementById('btn_formAlmacen').classList.add('btn-primary');
    document.getElementById('btn_formAlmacen').classList.remove('btn-danger');
}
function form_editar(id){
    row = document.getElementById(id);
    document.getElementById('tituloModal').innerText="Editar Producto";
    document.getElementById('similar').innerHTML=checkEditar(id);
    document.getElementById('from_body').innerHTML=cuerpo_form();
    document.getElementById('btn_formAlmacen').innerText="Guardar cambios";
    document.getElementById('from_body').setAttribute("onsubmit","actualizar("+id+")");
    document.getElementById('btn_formAlmacen').classList.add('btn-primary');
    document.getElementById('btn_formAlmacen').classList.remove('btn-danger');
    document.getElementById('Codigo').disabled = true;
    //-------- Aqui empieza la inserción de información de la fila al formulario
    row = document.getElementById(id);
    $('input[name=Codigo]').val(row.cells[0].innerText);
    $('input[name=Producto]').val(row.cells[1].innerText);
    $('input[name=Precio]').val(row.cells[2].innerText);
    $('input[name=Existencias]').val(row.cells[3].innerText);
    $('input[name=TipoVenta]').val(row.cells[4].innerText);
    $('input[name=Caducidad]').val(row.cells[5].innerText);
    $('input[name=Finalidad]').val(row.cells[6].innerText);
    $('input[name=Costo]').val(row.cells[7].innerText);
    $('input[name=CostoAnterior]').val(row.cells[8].innerText);
}
function editarCodigo(id){
    if (document.getElementById('checkbox-p-1').checked) {
        document.getElementById('Codigo').disabled = false;
        document.getElementById("Codigo").focus();
        document.getElementById('form_autoCompletado').innerHTML="<div class='alert alert-warning' role='alert'>"+
        "Precaución <span class='feather icon-alert-triangle text-center text-danger f-20'></span> está habilitada la función para editar el código de barras"+
    "</div>";
    } else {
        document.getElementById('Codigo').disabled = true;
        document.getElementById('form_autoCompletado').innerHTML=null;
        document.getElementById('Codigo').value=id;
    }
}
function form_eliminar(id){
    document.getElementById('tituloModal').innerText="Eliminar producto";
    document.getElementById('similar').innerHTML=null;
    row = document.getElementById(id);

    document.getElementById('from_body').setAttribute("onsubmit","eliminar("+row.cells[0].innerText+")");

    document.getElementById('from_body').innerHTML= "<div class='alert alert-danger f-20' role='alert'>"+
    "Precaución usted esta por eliminar el producto con el código: <div class='f-30 text-center'>"+row.cells[0].innerText+"</div>"+
    "<h1 class='feather icon-alert-triangle display-1 text-center text-danger'></h1></div>";
    document.getElementById('btn_formAlmacen').innerText="Eliminar Producto";
    document.getElementById('btn_formAlmacen').classList.remove('btn-primary');
    document.getElementById('btn_formAlmacen').classList.add('btn-danger');
}
// ---------- Notificación -------------//
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

function guardar(){
    document.getElementById('btn_formAlmacen').disabled = true;
    flag = validarlleno();
    if (flag == true) {
         CRUD(
            "/AlmacenarProducto",
            $("#from_body").serialize(),
            "info",
            "Producto guardado con exito",
            "fas fa-save"
        );
   }else{
    document.getElementById('btn_formAlmacen').disabled = false;
   }
}
function actualizar(id){
    document.getElementById('btn_formAlmacen').disabled = true;
    
    flag = validarEdicion(id);
    if (flag == true) {
        flag = validarlleno();
        if (flag == true) {
            /* $.ajax({
                url:"ActualizarProducto/"+Codigo,
                type: "POST",
                headers:GlobalToken,
                data:formData,
                success:  function(data){
                    $('#tbl_almacen').DataTable().ajax.reload();
                    document.getElementById('Codigo').disabled = true;
                    setTimeout(notify,1000,"success",' Producto actualizado exitosamente','fas fa-clipboard-check');
                    $('#modal_almacen').modal('hide');
                    document.getElementById('btn_formAlmacen').disabled = false;
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("¡Error al Actualizar!\n"+GlobalErrorCRUD);
                    document.getElementById('btn_formAlmacen').disabled = false;
            }
        }); */
                document.getElementById('Codigo').disabled = false;
                ruta = "ActualizarProducto/"+id;
                formData = $("#from_body").serialize();
                colorA = "info";
                mnsjA = "Producto se actualizó con exito";
                inconoA = "fas fa-save";
                CRUD(ruta,formData,colorA,inconoA);
        } else {
            document.getElementById('Codigo').disabled = true;
            document.getElementById('btn_formAlmacen').disabled = false;

        }
        
    } else {
        setTimeout(notify,0000,"inverse",' Ningún campo ha sido modificado','fas fa-leaf');
        document.getElementById('Codigo').disabled = false;
    }
}
function eliminar(id){
        document.getElementById('btn_formAlmacen').disabled = true;
 
         ruta = "EliminarProducto/"+id;
         formData = $("#from_body").serialize();
         colorA = 'danger';
         mnsjA = 'Producto eliminado con exito';
         inconoA = 'fas fa-trash-alt';
         CRUD(ruta,formData,colorA,inconoA);
}
function CRUD(ruta,formData,colorA,mnsjA,inconoA){
    $.ajax({
        url:ruta,
        type: "POST",
        headers:GlobalToken,
        data: formData,
        success:  function(data){       
            $('#tbl_almacen').DataTable().ajax.reload();
            setTimeout(notify,1000,colorA,mnsjA,inconoA);

            $('#modal_almacen').modal('hide');
            document.getElementById('btn_formAlmacen').disabled = false;
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            document.getElementById('btn_formAlmacen').disabled = false;
        }
     });
}
function buscarSimilar(){
    Codigo = document.getElementById('ProductoSimilar').value;
    $.ajax({
        url:"BuscarProducto/"+Codigo,
        type: "POST",
        headers:GlobalToken,
        success:  function(data){
            if (data == 0) {
                console.log("n");
                document.getElementById('error').innerHTML="<div class='alert alert-danger text-center' role='alert'>"
                +"No se encontro un producto similar"
            "</div>"
            } else {
                $('input[name=Producto]').val(data[0]['Producto']);
                $('input[name=Precio]').val(data[0]['Precio']);
                $('input[name=Caducidad]').val(data[0]['Caducidad']);
                $('input[name=Finalidad]').val(data[0]['Finalidad']);
                $('input[name=Costo]').val(data[0]['Costo']);
                $('input[name=CostoAnterior]').val(data[0]['CostoAnterior']);   
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al Actualizar!\n"+GlobalErrorCRUD)
        }
    });
}
function validarEdicion(id){
    fila = document.getElementById(id);
    if (fila.cells[0].innerText == $('input[name=Codigo]').val() &&
        fila.cells[1].innerText == $('input[name=Producto]').val() &&
        fila.cells[2].innerText == $('input[name=Precio]').val() &&
        fila.cells[3].innerText == $('input[name=Existencias]').val() &&
        fila.cells[5].innerText == $('input[name=Caducidad]').val() &&
        fila.cells[6].innerText == $('input[name=Finalidad]').val() &&
        fila.cells[7].innerText == $('input[name=Costo]').val() &&
        fila.cells[8].innerText == $('input[name=CostoAnterior]').val())
        {
        flag = false;
    } else {
        flag = true;
    }
    return flag
}
function validarlleno(){
    if ($('input[name=Codigo]').val() == '' || $('input[name=Producto]').val() == '' || $('input[name=Precio]').val() == '' ||
        $('input[name=Existencias]').val() == '' || $('input[name=Caducidad]').val() == '' || $('input[name=Finalidad]').val() == '' ||
        $('input[name=Costo]').val() == '' || $('input[name=CostoAnterior]').val() == '')
        {
        flag = false;
    } else {
        flag = true;
    }
    return flag
}