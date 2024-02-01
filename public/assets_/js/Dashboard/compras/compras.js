$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
});

const GlobalErrorCRUD =`Soluciones:
    1) Intente de nuevo Guardar el registro
    2) Recargue la página e intente de nuevo guardar el registro
    3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio
    4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema`


/* Constantes Componentes */
const Tbl_showAsignaciones = document.getElementById("tbl_showAsignaciones");
const Slt_ProductoAsignacion = document.getElementById("select_asignaciones");

function notify() {
    $.growl({
        icon: "",
        title:"Ya se ingresó el producto en la factura",
        message:'',
    }, {
        element: 'body',
        type: 'primary',
        allow_dismiss: true,
        placement: {
            from: "top",
            align: "right"
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

$("#From_Factura").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    $('input, select').removeClass('is-invalid')
    Reinicio_Factura()
   
});
$("#Modal_Asignaciones").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    $('input, select').removeClass('is-invalid')
    Reinicio_Asignaciones();
  
    Slt_ProductoAsignacion.innerHTML=null
    _productosAsignacion=[];
    _ProductoEnJuego = [];
    _AsignacionesDisponibles = 0;   
         
    _ClikAsignaciones = 0;
});
/* Variables para factura */
var _factura = [];
var _totalFactura = 0.00;
var _totalProdutos = 0;
var _ClickDetalle = 0;
var _ProductosEliminados = [];
/* Variables para asignaciones */
var _productosAsignacion = [];
var _ClikAsignaciones = 0;
var _AsignacionesDisponibles = 0;
var _ProductoEnJuego = [];

$("#Nueva_factura").on("click", function () {
    document.getElementById('Title_From_Factura').innerText ="Nueva factura";
    document.getElementById('btn_RFactura').innerText ="Registrar factura";
});

function Reinicio_Factura(){
    $("#form_factura_1").validate().resetForm()
    $("#form_ProductoNuevo").validate().resetForm()
    _ClickDetalle = 0;
    if (_factura.length !=0) {
        _factura.map(producto =>{
            $("#producto"+producto.Codigo).rules('remove');
            $("#producto"+producto.Codigo).rules('remove');
            $("#costo"+producto.Codigo).rules('remove');
            $("#pz"+producto.Codigo).rules('remove');
            $("#caducidad"+producto.Codigo).rules('remove');
            $("#pz_Caja"+producto.Codigo).rules('remove');
       })
    }
    document.getElementById('Proveedor').value= "";
    document.getElementById('Factura_farmacia').value = "";
    document.getElementById('Proveedor').disabled = false;
    document.getElementById('Factura_farmacia').disabled = false;
    document.getElementById('Codigo_nuevo').disabled = false;
    document.getElementById('btn_agregarProducto').disabled = false;
    document.getElementById('btn_RFactura').disabled = false;
    _FacturaEnJuego=[];
    _factura = [];
    _ProductosEliminados = []
    _totalFactura = 0.00;
    _totalProdutos = 0
    document.getElementById('total_factura').innerText=parseFloat(0).toFixed(2)
    document.getElementById('tbodyCompras').innerHTML=null;

}

function CreateRowFactura(tbl,codigo,producto,costo,pz, sub,caducidad,pz_caja,precio, disabled) {
    if (!producto && !costo && !pz && !sub && !caducidad && !pz_caja && !precio && !disabled) {
       producto = "";
       costo = "";
       pz = 1;
       pz_caja= 1;
       sub = parseFloat(0).toFixed(2);
       caducidad = "";
       precio = ""
       disabled = ""
    }

    tbl.setAttribute('id',"row_"+codigo);
    tbl.insertCell(0).innerText = codigo;
    tbl.insertCell(1).innerHTML = "<div class='form-group'>"+
        "<input type='text' class='form-control' id='producto"+codigo+"' name='producto"+codigo+"' placeholder='Producto' value='"+producto+"' onchange=Nombre_Producto('"+codigo+"',this.value) "+disabled+">"+
    "</div>";
    tbl.insertCell(2).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='pz"+codigo+"' name='pz"+codigo+"' value='"+pz+"' oninput=calculo(2,'"+codigo+"',this.value) min='1' "+disabled+">"+
    "</div>";

    tbl.insertCell(3).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='costo"+codigo+"' name='costo"+codigo+"' placeholder='0.00' value='"+costo+"' oninput=calculo(1,'"+codigo+"',this.value) min='0.01' step='0.01' "+disabled+">"+
    "</div>";
    tbl.insertCell(4).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='precio"+codigo+"' name='precio"+codigo+"' placeholder='0.00' value='"+precio+"' oninput=precioVenta('"+codigo+"',this.value) oninput=calculo(1,'"+codigo+"',this.value)min='' step='0.01' "+disabled+">"+
    "</div>";

    
    tbl.insertCell(5).innerText = sub;
    
    tbl.insertCell(6).innerHTML = `<div class='form-group'>
        <input type='number' class='form-control' id='${"pz_Caja"+codigo}' name='${"pz_Caja"+codigo}' value='${pz_caja}' min='1' onchange=P_pz('${codigo}',this.value) ${disabled}>
    </div>`;
    
    tbl.insertCell(7).innerHTML = `<div class='form-group'>
        <input type='date' class='form-control' id='${"caducidad"+codigo}' name='${"caducidad"+codigo}' value='${caducidad}' onblur=P_caducidad('${codigo}',this.value) ${disabled}>
    </div>`;

    tbl.insertCell(8).innerHTML = `<button type='button' class='btn btn-danger btn-icon' onclick=eliminarRow('${codigo}')><i class='fas fa-trash'><i></button ${disabled}>`;

    
  
    $("#producto"+codigo).rules('add',{required:true});
    $("#costo"+codigo).rules('add',{required:true});
    $("#precio"+codigo).rules('add',{required:true});
    $("#pz"+codigo).rules('add',{required:true});
    $("#caducidad"+codigo).rules('add',{required:true});
    $("#pz_Caja"+codigo).rules('add',{required:true});
}

$('#btn_agregarProducto').on('click', async function () {
    loadingShow("btn_agregarProducto")
    let validate = $("#form_ProductoNuevo").valid()
    if (validate) {
        let codigo = document.getElementById('Codigo_nuevo').value;
        let farmacia = document.getElementById('Factura_farmacia').value;
        
        let contieneEspacios = /\s/.test(codigo);
        if (contieneEspacios) {
            swal("Error en el código de barras","No se aceptan codigos de barras con ESPACIOS",{icon:"error"});
            loadingHide("btn_agregarProducto");
            return;
        }
        if (farmacia != "") {
            data = {
                'Codigo':codigo,
                'Farmacia':farmacia
            }
           await $.ajax({
                url:"BusquedaProducto",
                type: "POST",
                headers:GlobalToken,
                data: data,
                success:  function(payload){
                    let itemRow = 0;
                    if (_factura.length != 0 && _factura.length > 1) {
                        itemRow = _factura.length - _factura.length
                    }

               
                    if (payload.Existencia) {
                       
                        let tbl = document.getElementById('tbodyCompras').insertRow(itemRow);
                         CreateRowFactura(
                            tbl,
                            codigo,
                            payload.Producto,
                            payload.Costo,
                            1,
                            (payload.Costo * 1),
                            "",
                            payload.Piezas_unidad,
                            payload.Precio,
                            ""
                        )
                        _totalProdutos = _totalProdutos+1;
                        _factura.push({
                            Codigo:codigo,
                            Producto:payload.Producto,
                            Costo_Unidad:payload.Costo,
                            Unidades:1,
                            SubTotal:(payload.Costo * 1),
                            Caducidad:'',
                            Piezas_unidad:payload.Piezas_unidad,
                            Precio_Unidad:payload.Precio    
                        });
                        _totalFactura = _totalFactura+ (payload.Costo * 1);
                        document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2);
                        document.getElementById('Codigo_nuevo').value =null;
                        return;
                    }
                    swal("No se encontraron coincidencias",{icon:"warning",});
                    let tbl = document.getElementById('tbodyCompras').insertRow(itemRow);
                    
                    CreateRowFactura(
                        tbl,
                        codigo,
                        "",
                        parseFloat(0).toFixed(2),
                        1,
                        (0*1),
                        "",
                        "",
                        "",
                        ""
                    )
                    
                    _totalProdutos = _totalProdutos+1;
                    _factura.push({Codigo:codigo,Producto:'',Costo_Unidad:0.00, Unidades:1,SubTotal:0,Caducidad:'',Piezas_unidad:1,Precio_Unidad:0.00});
                    document.getElementById('Codigo_nuevo').value =null
                },
                error: function(){
                    swal("Hubo un error en la busqueda de coincidencias, intente de nuevo",{icon:"error",});
                }
             });
        }else{
            swal("Primero seleccione una farmacia",{icon:"error",});
        }
    }
    loadingHide("btn_agregarProducto");
});

function calculo (op,codigo,valor){
    if (valor == "") {
        valor = 0;
    }
    let old_sub = 0;
    let nuevo_sub = 0;
    let old_Unidades = 0;
    let rowFactura = document.getElementById('row_'+codigo);
    let unidades = parseInt(document.getElementById('pz'+codigo).value);
    let costo = document.getElementById('costo'+codigo).value;

    // condicion    true     :           false
   if (op == 1) {
    costo = valor;
    document.getElementById('precio'+codigo).setAttribute('min',costo);
   }else{
    unidades = parseInt(valor);
   }

   nuevo_sub = costo * unidades;
   rowFactura.cells[5].innerText = parseFloat(nuevo_sub).toFixed(2);

   _factura.map(producto =>{
        if (producto.Codigo == codigo) {
            old_sub =producto.SubTotal
            old_Unidades = parseInt(producto.Unidades);

            producto.Unidades = unidades;
            producto.SubTotal = parseFloat(nuevo_sub).toFixed(2);
            producto.Costo_Unidad = parseFloat(costo).toFixed(2)
        }
   })
   
   _totalFactura = _totalFactura - old_sub;
   _totalFactura = _totalFactura + nuevo_sub;
   document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2);

   _totalProdutos = _totalProdutos - old_Unidades;
   _totalProdutos = _totalProdutos + unidades;
   
}

function Nombre_Producto(codigo,value){
    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _factura[i].Producto = value;
            break;
        }
    }
}
function precioVenta(codigo,value){
    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _factura[i].Precio_Unidad = parseFloat(value).toFixed(2);
            break;
        }
    }
}
function P_caducidad (codigo,value){
    let fecha = new Date(value);
    let year = new Date();


    if (String(fecha.getFullYear()).length != 4) {
        document.getElementById('caducidad'+codigo).value = null;
        return;
    }
    
    if ( parseInt(fecha.getFullYear()) < parseInt(year.getFullYear()) ) {
       
        document.getElementById('caducidad'+codigo).value = null;
        return;
    }

    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _factura[i].Caducidad = value;
            break;
        }
    }
}
function P_pz(codigo,value) {
    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _factura[i].Piezas_unidad = parseInt(value);
            break;
        }
    }
}

function eliminarRow(codigo) {

    let sub = 0;
    let Nproductos = 0;

   
 
    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _ProductosEliminados.push(_factura[i].Codigo);
            sub = _factura[i].SubTotal;
            Nproductos = _factura[i].Unidades
            _factura.splice(i,1);
            document.getElementById('row_'+codigo).remove();
            $("#producto"+codigo).rules('remove');
            $("#costo"+codigo).rules('remove');
            $("#pz"+codigo).rules('remove');
            $("#caducidad"+codigo).rules('remove');
            $("#pz_Caja"+codigo).rules('remove');
            break;
        }
    }
    _totalFactura = _totalFactura - sub;
    _totalProdutos = _totalProdutos - Nproductos;
   document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2)
}

$('#btn_RFactura').on('click', function(){
    
    let title;
    let text;
    let mensaje;
    let url;
    let tq;
    if (_factura.length !=0) {
        let form_factura =$('#form_factura_1').valid();
     
        if (form_factura) {
            let validate = $("#form_factura_2").valid();
            if (validate) {
    
                if (_ClickDetalle == 0) {
                    title = "Total de la factura:\n $ "+parseFloat(_totalFactura).toFixed(2);
                    text = "¿Desea continuar con el registro de la factura en el sistema?\n\nAsegúrese que el total de la factura registrada coincida con el total de la factura entregada por el proveedor."
                    mensaje = "La factura fue registrada exitosamente y se le asignó el Id: ";
                    url = 'GuardarFactura';
                    tq = 1;
                }else{
                    title = "Nuevo Total de la factura:\n $ "+parseFloat(_totalFactura).toFixed(2);
                    text = "¿Desea continuar con la actualización de la factura?\n\nAsegurece que el total de la factura registrada coincide con el de la factura física."
                    mensaje = "Se actualizó correctamente la FACTURA de Id: ";
                    url = "ActualizarFactura/"+_ClickDetalle;
                    tq= 2
                }
    
                let proveedor =document.getElementById('Proveedor').value;
                let farmacia =document.getElementById('Factura_farmacia').value;
                let data = {
                            Factura:_factura,
                            TotalFactura:_totalFactura,
                            Proveedor:proveedor,
                            Farmacia:farmacia,
                            TotalProductos:_totalProdutos,
                            Eliminados:_ProductosEliminados
                           }
                swal({
                    title: title,
                    text:text,
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((registrar) => {
                    if (registrar) {
                        Query_Factura(
                            1,
                            url,
                            data,
                            mensaje,
                        );
                    }
                });
            }
        }
       
    }
});

 function Query_Factura(tipo_query,url,data,mensaje) {
    $.ajax({
        url:url,
        type: "POST",
        headers:GlobalToken,
        data: data,
        success:  function(payload){
            if (payload.success) {
                swal(mensaje+payload.Factura,{icon:"success",});
                if (tipo_query == 1) {
                    $('#From_Factura').modal('hide');
                }
                $('#tbl_Facturas').DataTable().ajax.reload();
                return;
            }
           
            swal(payload.error.errorInfo[2],{icon:"error",});
        },
        error: function(){
           
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
        }
     });
 }

function detalleFactura(id){
    if ( _ClickDetalle == 0) {
        _ClickDetalle = id;

   
        _factura =_Facturas.find(f=>f.ID == id);
      
        document.getElementById('Proveedor').value= _factura.proveedor_id;
        document.getElementById('Proveedor').disabled = true;
        document.getElementById('Factura_farmacia').value = _factura.farmacia_id;
        document.getElementById('Factura_farmacia').disabled = true;
      

        document.getElementById('Title_From_Factura').innerText ="Factura - Id: "+id;
        document.getElementById('btn_RFactura').innerText ="Actualizar factura";
        document.getElementById('btn_RFactura').disabled = true;

        document.getElementById('Codigo_nuevo').disabled = true;
    document.getElementById('btn_agregarProducto').disabled = true;

        $.ajax({
            url:'DetalleFactura',
            type: "POST",
            headers:GlobalToken,
            data: {factura_id:id},
            success:  function(payload){
                _factura = payload;
                payload.forEach((producto,i) => {
                    let tbl = document.getElementById('tbodyCompras').insertRow(i);
                    CreateRowFactura(
                        tbl, 
                        producto.Codigo, 
                        producto.Producto, 
                        producto.Costo_Unidad, 
                        producto.Unidades, 
                        producto.SubTotal,
                        producto.Caducidad,
                        producto.Piezas_unidad,
                        producto.Precio_Unidad,
                        "disabled"
                    );
                    _totalFactura = _totalFactura + producto.SubTotal;
                    _totalProdutos = _totalProdutos + producto.Unidades;
                 });
                 
                document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2)
              
                $('#From_Factura').modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
        }
     });
    }   
}
function EliminarFactura(id) {
    swal({
        title: "¿Desea eliminar la factura \nid: "+id+"?",
        text: "Se eliminará el CONTENIDO de la factura asi como su Historial de asignaciones, pero NO los productos en del almacen",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((Eliminar) => {
        if (Eliminar) {
            $.ajax({
                url:'EliminarFactura/'+id,
                type: "POST",
                headers:GlobalToken,
                data: {id:id},
                success:  function(payload){
                $('#tbl_Facturas').DataTable().ajax.reload();
                    swal("La Factura se eliminó correctamente",
                        {icon:"success",});
                },
                error: function(){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);    
                }
            });
        }
    });
}
/* EVENTOS para width de los campos de factura */

        