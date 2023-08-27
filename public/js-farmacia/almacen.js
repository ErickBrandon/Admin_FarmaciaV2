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
  
    let tbl = document.getElementById('tbl_infoProducto');
    _AsignacionEnJuego = producto;
    tbl.rows[0].cells[1].innerText = producto.Codigo
    tbl.rows[1].cells[1].innerText = producto.Producto
    tbl.rows[2].cells[1].innerText = "$"+ parseFloat(producto.Precio).toFixed(2)
    tbl.rows[3].cells[1].innerText = producto.Existencias
    tbl.rows[4].cells[1].innerText = producto.TipoVenta
    let piezas = "Sin información";
    if (producto.Piezas_unidad != null) {
        piezas =producto.Piezas_unidad;
    }else{
        document.getElementById('cont_pxc').innerHTML = `<div class="input-group input-group-md mb-3 col-12">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><span class="fas fa-boxes text-primary"></span>&nbsp;Piezas por caja</span>
                                                            </div>
                                                            <input id="pzXcaja" type="number" class="form-control" name="pzXcaja" requried="" min ="1" max>
                                                        </div>`
    }
    tbl.rows[5].cells[1].innerText = piezas;
    tbl.rows[6].cells[1].innerText = "$"+parseFloat(producto.Costo).toFixed(2)
    document.getElementById('cajas_piezas').setAttribute('max', producto.Existencias);
    $('#modal_CambioTipoVenta').modal('show');
}

$("#asignacion_venaPiezas").on('click',function(){
    let idExistente = 0;
    let exist = false;
    let infoPz= true
    let valid = $("#form_asignacionVentaPiezas").valid();
    if (valid) {
        
        _ExistentePZ = _productosAlmacen.find(p=> (p.Codigo == _AsignacionEnJuego.Codigo && p.TipoVenta == "PIEZA"));
        
       
    
        if (_ExistentePZ != undefined) {
            exist = true;
            idExistente = _ExistentePZ.ID;
            if (_ExistentePZ.Piezas_unidad != null) {
                infoPz = true;
            }
        }

        
        let data ={
            "Cajas":document.getElementById('cajas_piezas').value,
            "Precio":document.getElementById('precio_ventaPiezas').value,
            "Farmacia":_AsignacionEnJuego.farmacia_id,
            "Existente": exist,
            "Producto":_AsignacionEnJuego,
            "idExistente": idExistente

        }
        $.ajax({
            url:"/AsignacionVentaPiezas",
            type: "POST",
            headers:GlobalToken,
            data: data,
            success:  function(data){ 
                if (data.success) {
                    $('#tbl_almacen').DataTable().ajax.reload();
                    swal("Asignado con éxito",{icon:"success",});
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
         });
    }
});