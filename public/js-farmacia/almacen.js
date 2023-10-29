$("#modal_traslado").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    Reinicio_Traslados();
   
});

var _productosAlmacen = [];
var _TraspasoEnJuego = [];
var _AsignacionEnJuego={};
var _ProductoEnJuego=[];
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
$("#modal_historialTraslado").on("hidden.bs.modal", function () {
    $('#Tbl_historialTraspaso').DataTable().destroy();    
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

$('#btn_modalHT').on('click', function(e){
   
    $('#modal_historialTraslado').modal('show');
    document.getElementById('tipoTespaso').innerText= "Historial de productos recibidos";
    document.getElementById('th_farmaciaTraspaso').innerText= "Farmacia origen";

    let data = {
        Busqueda:e.target.value
    }
    Tbl_historialTraspaso(data);
})

$('#btn_modalHT2').on('click', function(e){
    
    $('#modal_historialTraslado').modal('show');
    document.getElementById('tipoTespaso').innerText= "Historial de productos enviados";
    document.getElementById('th_farmaciaTraspaso').innerText= "Farmacia destino";

    let data = {
        Busqueda:e.target.value
    }
    Tbl_historialTraspaso(data);
})
function perdidasProductos(id) {
    _ProductoEnJuego = _productosAlmacen.find(p => p.ID == id)
    document.getElementById('lbl_productoBaja').innerText = _ProductoEnJuego.Producto
    tbl = document.getElementById('tbl_infoProductoPerdida');
    tbl.rows[0].cells[1].innerText = _ProductoEnJuego.Codigo
    tbl.rows[1].cells[1].innerText = _ProductoEnJuego.Existencias
    document.getElementById('txt_existenciasPerdidas').setAttribute('max', _ProductoEnJuego.Existencias);
    tbl.rows[2].cells[1].innerText = "$ "+parseFloat(_ProductoEnJuego.Costo).toFixed(2)  
    tbl.rows[3].cells[1].innerText = _ProductoEnJuego.TipoVenta

  

    tbl.rows[4].cells[1].innerText = _ProductoEnJuego.Caducidad 
   
    $('#modal_perdidasProductos').modal('show');
}
$('#form_perdidas').on('submit',function(e){
    loadingShow("guardarPerdidas");
    e.preventDefault();
    let validate=$("#form_perdidas").valid();
    
    if (validate) {
        let perdida = e.target[0].value;
        if (perdida<= _ProductoEnJuego.Existencias) {
            $.ajax({
                url:"/Perdida/"+_ProductoEnJuego.ID,
                type: "POST",
                headers:GlobalToken,
                data: {'Perdida':perdida},
                success:  function(data){
                    loadingHide('guardarPerdidas');
                    if (data.success) {
                        $('#tbl_almacen').DataTable().ajax.reload();
                        $('#modal_perdidasProductos').modal('hide');
                        swal('Pérdida',data.message, {
                            icon: "success",
                        });
                        return;
                    }
                    swal(data.message,{
                        icon: "error",
                    });
                    
                  
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                    loadingHide('guardarPerdidas');
                }
             });
        }
    }
    loadingHide('guardarPerdidas');
});
$("#modal_perdidasProductos").on("hidden.bs.modal", function () {
    _ProductoEnJuego = [];
    document.getElementById('lbl_productoBaja').innerText = ""
    tbl = document.getElementById('tbl_infoProductoPerdida');
    tbl.rows[0].cells[1].innerText = ""
    tbl.rows[1].cells[1].innerText =""
    document.getElementById('txt_existenciasPerdidas').setAttribute('max', 0);
    tbl.rows[2].cells[1].innerText = ""
    tbl.rows[3].cells[1].innerText = ""
});

$(document).on('click','#btn_modalAjustes',function(){
    
   let producto_id = parseInt(this.getAttribute('producto'));
    swal({
        title: "¡PRECAUCIÓN! \n Estas a punto de acceder a los ajustes del producto",
        text: `Donde podrás modificar directamente la información del producto,lo cual podría causar ciertas diferencias en: 
        Existencias, Costo, Precio venta, Caducidad y Piezas x Caja.
        Con respecto al producto Vendido, Traspaso o marcado como Pérdida`,
        icon: "warning",
        buttons: {
            confirm: "Continuar a los ajustes"
        }
    }).then((continuar)=>{
        if (continuar) {
            _ProductoEnJuego = _productosAlmacen.find(p=> p.ID == producto_id);
            let tbl = document.getElementById('tbl_ajusteProducto');
            tbl.rows[0].cells[1].innerText = _ProductoEnJuego.Codigo;
            tbl.rows[1].cells[1].innerText = _ProductoEnJuego.Producto;
            tbl.rows[2].cells[1].innerText = _ProductoEnJuego.TipoVenta;

            document.getElementById('Ajuste_Costo').value = _ProductoEnJuego.Costo;

            document.getElementById('Ajuste_Precio').setAttribute('min',_ProductoEnJuego.Costo);
            document.getElementById('Ajuste_Precio').value = _ProductoEnJuego.Precio;

            document.getElementById('Ajuste_Existencias').value = _ProductoEnJuego.Existencias;
            
            let hoy = new Date();
            hoy.setHours(0, 0, 0, 0); // Establece las horas, minutos, segundos y milisegundos a 0 para obtener el inicio del día en la zona horaria local

            let hoyEnUTC = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate())); // Obtiene la fecha actual en formato UTC
            hoyEnUTC = hoyEnUTC.toISOString().split("T")[0];

            document.getElementById('Ajuste_caducidad').setAttribute("min", hoyEnUTC);
            document.getElementById('Ajuste_caducidad').value = _ProductoEnJuego.Caducidad;
            if (_ProductoEnJuego.TipoVenta == 'CAJA') {
                document.getElementById('Ajuste_PzCaja').disabled = false;
                document.getElementById('Ajuste_PzCaja').value = _ProductoEnJuego.Piezas_unidad;
            }
            $('#modal_AjusteProducto').modal('show');
        }
    })
})
$('#Ajuste_Costo').on('change',function(e){
    document.getElementById('Ajuste_Precio').setAttribute('min',e.target.value);
})

$('#form_ajustes').on('submit',function(e){
    loadingShow("guardarAjusteProducto");
    e.preventDefault();
    console.log(e.target[4].value);
    let validate=$("#form_ajustes").valid();
    console.log(validate);
    if (validate) {
        swal({
            title: "¿Deseas continuar?",
            icon: "warning",
            buttons: {
                confirm: "Ok"
            }
        }).then((continuar)=>{
            if (continuar) {
                let ventaCaja = false
                if (_ProductoEnJuego.TipoVenta == 'CAJA') {
                    ventaCaja = true
                }
                data={
                    'Costo': e.target[0].value,
                    'Precio':e.target[1].value,
                    'Existencias': e.target[2].value,
                    'Caducidad': e.target[3].value,
                    'Piezas_unidad': e.target[4].value,
                    'VentaCaja': ventaCaja
                };
                $.ajax({
                    url:"/Ajuste/"+_ProductoEnJuego.ID,
                    type: "POST",
                    headers:GlobalToken,
                    data: data,
                    success:  function(response){
                      if (response.success) {
                        swal({
                            title: response.message,
                            icon: "success",
                            buttons: {
                                confirm: "Ok"
                            }
                        })
                        $('#tbl_almacen').DataTable().ajax.reload();
                        $('#modal_AjusteProducto').modal('hide');
                      }
                      loadingHide('guardarAjusteProducto')
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                        loadingHide('guardarAjusteProducto')
                    }
                 });
            }
            loadingHide('guardarAjusteProducto')
            return
        })
    }else{
        loadingHide('guardarAjusteProducto')
    }
})
$("#modal_AjusteProducto").on("hidden.bs.modal", function () {
   _ProductoEnJuego = [];


   document.getElementById('Ajuste_Costo').value = null;

   document.getElementById('Ajuste_Precio').setAttribute('min',null);
   document.getElementById('Ajuste_Precio').value = null;

   document.getElementById('Ajuste_Existencias').value = null;
   document.getElementById('Ajuste_caducidad').value = null;
   document.getElementById('Ajuste_PzCaja').disabled = true;
   document.getElementById('Ajuste_PzCaja').value =false;
});