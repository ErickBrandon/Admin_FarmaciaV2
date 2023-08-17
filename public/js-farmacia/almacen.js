$("#modal_traslado").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    Reinicio_Traslados();
   
});

var _productosAlmacen = [];
var _TraspasoEnJuego = [];

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
    $('#modal_CambioTipoVenta').modal('show');
}