$("#modal_traslado").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    Reinicio_Traslados();
   
});

var _productosAlmacen = [];
var _TraspasoEnJuego = [];
var _AsignacionEnJuego={};
var _ExistentePZ={};
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

GlobalErrorCRUD ="Soluciones:\n"
+"1) Intente de nuevo Guardar el registro\n"
+"2) Recargue la página e intente de nuevo guardar el registro\n"
+"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
+"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
    // --------- -----------------
$("#modal_CambioTipoVenta").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Asignacion PZ*/
    $('input, select').removeClass('is-invalid')
    reincio_asignacionPZ();       
});
function traslado(id){
    _TraspasoEnJuego = _productosAlmacen.find(p => p.ID == id);
    document.getElementById('txt_codigo').innerText = _TraspasoEnJuego.Codigo;
    document.getElementById('txt_producto').innerText = _TraspasoEnJuego.Producto;
    document.getElementById('txt_existencias').innerText = _TraspasoEnJuego.Existencias;
    document.getElementById('N_cajas').setAttribute('max',_TraspasoEnJuego.Existencias);
    $('#modal_traslado').modal('show');
}
$("#btn_formTraslado").on("click",function(){
    let valid = $("#form_traslados").valid();
    if (valid) {
        let data = $("#form_traslados").serialize();
        $.ajax({
            url:'/Traspaso/'+_TraspasoEnJuego.ID,
            type: "POST",
            headers:GlobalToken,
            data: data,
            success:  function(data){ 
                console.log(data);      
                if (data) {
                    swal("El traspaso del producto se realizó con éxito",{icon:"success",});
                    $('#modal_traslado').modal('hide');
                    $('#tbl_almacen').DataTable().ajax.reload();
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
         });
    }
})

function Reinicio_Traslados() {
    _TraspasoEnJuego=[]
    document.getElementById('txt_codigo').innerText = "";
    document.getElementById('txt_producto').innerText = "";
    document.getElementById('txt_existencias').innerText = "";
    document.getElementById('N_cajas').setAttribute('max',0);
    document.getElementById('Traslado_Farmacias').value="";
    document.getElementById('N_cajas').value="";

}

function CambioTipoVenta(id) {
    let producto = _productosAlmacen.find(p=> p.ID == id);
    if (producto.Existencias <= 0) {
        swal(
            "¡Existencias en 0!",
            "Ya no hay exitencias para cambiar del tipo de venta CAjA a PIEZA del producto "+producto.Producto,
            {icon:"error",
        });
        return;
    }

    let tbl = document.getElementById('tbl_infoProducto');
    _AsignacionEnJuego = producto;

    tbl.rows[0].cells[1].innerText = _AsignacionEnJuego.Codigo
    document.getElementById('NombreProducto_pz').innerText=_AsignacionEnJuego.Producto
    tbl.rows[1].cells[1].innerText = "$"+ parseFloat(_AsignacionEnJuego.Precio).toFixed(2)
    tbl.rows[2].cells[1].innerText = _AsignacionEnJuego.Existencias
    tbl.rows[3].cells[1].innerText = _AsignacionEnJuego.TipoVenta
    let piezas = "Sin información";
    if (_AsignacionEnJuego.Piezas_unidad != null) {
        piezas =producto.Piezas_unidad;
        document.getElementById('pzXcaja').value= producto.Piezas_unidad;
        document.getElementById('pzXcaja').disabled = true;
        document.getElementById('precio_ventaPiezas').setAttribute('min',(parseFloat(_AsignacionEnJuego.Costo /_AsignacionEnJuego.Piezas_unidad )).toFixed(2));
    }else{
        document.getElementById('pzXcaja').setAttribute('min',1)
    }
    tbl.rows[4].cells[1].innerText = piezas;
    tbl.rows[5].cells[1].innerText = "$"+parseFloat(producto.Costo).toFixed(2)
    document.getElementById('cajas_piezas').setAttribute('max', _AsignacionEnJuego.Existencias);
    $('#modal_CambioTipoVenta').modal('show');
}

$("#asignacion_ventaPiezas").on('click',function(){
    loadingShow("asignacion_ventaPiezas")
    data={
        "Similar_id":Number,
        "ProductoEnJuego":Number,
        "Farmacia":Number,
        "CajasAsignacion":Number,
        "Precio_pz":Number,
        "Pz_exisitentes":Boolean,
        "Piezas":Number,
    }

    let valid = $("#form_asignacionVentaPiezas").valid();
    if (valid) {

        let similar = _productosAlmacen.find( p=> (
            p.Codigo == _AsignacionEnJuego.Codigo && 
            p.TipoVenta == "PIEZA"
        ));
        
        if (similar != undefined) {
            data.Similar_id = similar.ID;
        }

        if (_AsignacionEnJuego.Piezas_unidad == null) {
            data.Piezas = document.getElementById('pzXcaja').value;
        }else{
            data.Pz_exisitentes = true;
            data.Piezas = _AsignacionEnJuego.Piezas_unidad;
        }

        data.ProductoEnJuego = _AsignacionEnJuego.ID;
        data.Farmacia = _AsignacionEnJuego.farmacia_id;
        data.CajasAsignacion = document.getElementById('cajas_piezas').value;
        data.Precio_pz = document.getElementById('precio_ventaPiezas').value;

        $.ajax({
            url:"/AsignacionVentaPiezas",
            type: "POST",
            headers:GlobalToken,
            data: data,
            success:  function(data){ 
                if (data.success) {
                    $('#tbl_almacen').DataTable().ajax.reload();
                    swal("Asignacion exitosa",data.message,{icon:"success",});
                    $('#modal_CambioTipoVenta').modal('hide');
                }else{
                    swal(data.message,{icon:"error",});
                }
                loadingHide("asignacion_ventaPiezas");
                return;
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                loadingHide("asignacion_ventaPiezas");
                return
            }
         });  
    }
    loadingHide("asignacion_ventaPiezas");
});
$("#precio_ventaPiezas").on('input',function(){
    if ( document.getElementById('pzXcaja').value == '') {
        swal("Favor de asignar primero el número de PIEZAS que contiene la caja del producto",{icon:"warning",});
        document.getElementById('cajas_piezas').value = "";
    }
});
$("#pzXcaja").on('blur',function(){
    document.getElementById('precio_ventaPiezas').setAttribute('min',
    parseFloat(_AsignacionEnJuego.Costo / document.getElementById('pzXcaja').value).toFixed(2));
});

function reincio_asignacionPZ() {
    document.getElementById('cajas_piezas').setAttribute('max',null);
    document.getElementById('precio_ventaPiezas').setAttribute('min',null);
    document.getElementById('pzXcaja').setAttribute('min',null);
    document.getElementById('pzXcaja').disabled = false;
    document.getElementById('pzXcaja').value = "";
    document.getElementById('cajas_piezas').value = "";
    document.getElementById('cajas_piezas').value = "";
    document.getElementById('precio_ventaPiezas').value = "";

    let tbl = document.getElementById('tbl_infoProducto');
    tbl.rows[0].cells[1].innerText = '';
    tbl.rows[1].cells[1].innerText = '';
    tbl.rows[2].cells[1].innerText = '';
    tbl.rows[3].cells[1].innerText = '';
    tbl.rows[4].cells[1].innerText = '';
    tbl.rows[5].cells[1].innerText = '';

    _AsignacionEnJuego = {};
}