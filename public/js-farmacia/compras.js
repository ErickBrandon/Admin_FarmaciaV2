

const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
const GlobalErrorCRUD ="Soluciones:\n"
    +"1) Intente de nuevo Guardar el registro\n"
    +"2) Recargue la página e intente de nuevo guardar el registro\n"
    +"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
    +"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";

/* Constantes Componentes */
const Tbl_showAsignaciones = document.getElementById("tbl_showAsignaciones");

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
    Reinicio_Factura()
   
});
$("#Modal_Asignaciones").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    Reinicio_Asignaciones();
    document.getElementById('select_asignaciones').innerHTML=null
    _productosAsignacion = [];
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

$("#Nueva_factura").on("click", function () {
    document.getElementById('Title_From_Factura').innerText ="Nueva factura";
    document.getElementById('btn_RFactura').innerText ="Registrar factura";
 });

function Reinicio_Factura(){
    _ClickDetalle = 0;
    if (_factura.length !=0) {
        _factura.map(producto =>{
            $("#producto"+producto.Codigo).rules('remove');
       })
    }
    _factura = [];
    _ProductosEliminados = []
    _totalFactura = 0.00;
    _totalProdutos = 0
    document.getElementById('total_factura').innerText=parseFloat(0).toFixed(2)
    document.getElementById('tbodyCompras').innerHTML=null
}

function CreateRowFactura(tbl,codigo,producto,costo,pz, sub) {
    if (!producto && !costo && !pz && !sub) {
       producto = "";
       costo = "";
       pz = 1;
       sub = parseFloat(0).toFixed(2);
    }

    tbl.setAttribute('id',"row_"+codigo);
    tbl.insertCell(0).innerText = codigo;
    tbl.insertCell(1).innerHTML = "<div class='form-group'>"+
        "<input type='text' class='form-control' id='producto"+codigo+"' name='producto"+codigo+"' placeholder='Producto' value='"+producto+"' onchange=Nombre_Producto("+codigo+",this.value)>"+
    "</div>";

    tbl.insertCell(2).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='costo"+codigo+"' name='costo"+codigo+"' placeholder='0.00' value='"+costo+"' oninput=calculo(1,"+codigo+",this.value) min='0.5' step='0.5'>"+
    "</div>";

    tbl.insertCell(3).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='pz"+codigo+"' name='pz"+codigo+"' value='"+pz+"' oninput=calculo(2,"+codigo+",this.value) min='1'>"+
    "</div>";
    tbl.insertCell(4).innerText = sub;

    tbl.insertCell(5).innerHTML = "<button type='button' class='btn btn-danger btn-icon' onclick=eliminarRow("+codigo+")><i class='fas fa-trash'><i></button>";

  
    $("#producto"+codigo).rules('add',{required:true});
    $("#costo"+codigo).rules('add',{required:true});
    $("#pz"+codigo).rules('add',{required:true});
}

function AgregarProducto() {
    let validate = $("#form_ProductoNuevo").valid()
    if (validate) {
        codigo = document.getElementById('Codigo_nuevo').value;
        if (document.getElementById('row_'+codigo) == null) {
           
            let tbl = document.getElementById('tbodyCompras').insertRow(_factura.length);
            CreateRowFactura(tbl,codigo)
            _totalProdutos = _totalProdutos+1;
            _factura.push({Codigo:codigo,Producto:'',Costo:0.00, Piezas:1,SubTotal:0});
            document.getElementById('Codigo_nuevo').value =null
        }else{
            notify();   
        }
    }
   
}
function calculo (op,codigo,valor){
    if (valor == "") {
        valor = 0;
    }
    let old_sub = 0;
    let nuevo_sub = 0;
    let old_pz = 0;
    let rowFactura = document.getElementById('row_'+codigo);
    let piezas = parseInt(document.getElementById('pz'+codigo).value);
    let costo = document.getElementById('costo'+codigo).value;

    // condicion    true     :           false
   (op == 1) ? costo = valor : piezas = parseInt(valor);

   nuevo_sub = costo * piezas;
   rowFactura.cells[4].innerText = nuevo_sub;

   _factura.map(producto =>{
        if (producto.Codigo == codigo) {
            old_sub =producto.SubTotal
            old_pz = parseInt(producto.Piezas);

            producto.Piezas = piezas;
            producto.SubTotal = parseFloat(nuevo_sub).toFixed(2);
            producto.Costo = parseFloat(costo).toFixed(2)
        }
   })
   
   _totalFactura = _totalFactura - old_sub;
   _totalFactura = _totalFactura + nuevo_sub;
   document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2);

   _totalProdutos = _totalProdutos - old_pz;
   _totalProdutos = _totalProdutos + piezas;
   
}

function Nombre_Producto(codigo,value){
    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _factura[i].Producto = value;
            break;
        }
    }
}
function eliminarRow(codigo) {
    let sub = 0;
    for (let i = 0; i < _factura.length; i++) {
        if (_factura[i].Codigo == codigo) {
            _ProductosEliminados.push(_factura[i].Codigo);
            sub = _factura[i].SubTotal;
            _factura.splice(i,1);
            document.getElementById('row_'+codigo).remove();
            $("#producto"+codigo).rules('remove');
            $("#costo"+codigo).rules('remove');
            $("#pz"+codigo).rules('remove');
            break;
        }
    }
    _totalFactura = _totalFactura - sub;
   document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2)
}

$('#btn_RFactura').on('click', function(){
    let title;
    let text;
    let mensaje;
    let url;
    let tq;
    if (_factura.length !=0) {
        let validate = $("#form_factura").valid();
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
            let data = {
                        Factura:_factura,
                        TotalFactura:_totalFactura,
                        Proveedor:proveedor,
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
});

 function Query_Factura(tipo_query,url,data,mensaje) {
    $.ajax({
        url:url,
        type: "POST",
        headers:GlobalToken,
        data: data,
        success:  function(payload){
            swal(mensaje+payload,{icon:"success",});
            if (tipo_query == 1) {
                $('#From_Factura').modal('hide');
            }
            $('#tbl_Facturas').DataTable().ajax.reload();
        },
        error: function(){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
        }
     });
 }

function detalleFactura(id){
    if ( _ClickDetalle == 0) {
        _ClickDetalle = id;
        document.getElementById('Title_From_Factura').innerText ="Factura - Id: "+id;
        document.getElementById('btn_RFactura').innerText ="Actualizar factura";
        $.ajax({
            url:'DetalleFactura',
            type: "POST",
            headers:GlobalToken,
            data: {factura_id:id},
            success:  function(payload){

                _factura = payload;
                payload.forEach((producto,i) => {
                    let tbl = document.getElementById('tbodyCompras').insertRow(i);

                    CreateRowFactura(tbl, producto.Codigo, producto.Producto, producto.Costo, producto.Piezas, producto.SubTotal);
                    _totalFactura = _totalFactura + producto.SubTotal;
                    _totalProdutos = _totalProdutos + producto.Piezas;
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

function asignaciones(id) {
    if (_ClikAsignaciones == 0) {
        _ClikAsignaciones = id;
        document.getElementById('Title_ModalAsigaciones').innerText = "Asignaciones - Factura - Id: "+id;
        $.ajax({
            url:'DetalleFactura',
            type: "POST",
            headers:GlobalToken,
            data: {factura_id:id},
            success:  function(payload){
                _productosAsignacion = payload;
                let select =document.getElementById('select_asignaciones');
                let op = document.createElement('option');
                op.value =0;
                op.text = "Seleccione un producto"
                select.appendChild(op);
    
                _productosAsignacion.map(producto =>{
                    op = document.createElement('option');
                    op.value = producto.id;
                    op.text = producto.Producto
                    select.appendChild(op);
               })
               $('#Modal_Asignaciones').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
        });
    }
   
}
$('#select_asignaciones').on('change', function(e){
    Reinicio_FormAsignaciones();
    let op =e.target.value;
    if (op !=0) {
        document.getElementById('btn_GuardarAsignacion').disabled=false;
        for (let i = 0; i < _productosAsignacion.length; i++) {
            if (_productosAsignacion[i].id == op ) {
                Tbl_showAsignaciones.rows[0].cells[1].innerText =_productosAsignacion[i].Codigo;
                Tbl_showAsignaciones.rows[1].cells[1].innerText =_productosAsignacion[i].Piezas;
                let porAsignar = (parseInt(_productosAsignacion[i].Piezas) - parseInt(_productosAsignacion[i].Asignadas))
                Tbl_showAsignaciones.rows[2].cells[1].innerText = porAsignar;
                _AsignacionesDisponibles = porAsignar
                document.getElementById('piezas_asignacion').setAttribute('max',porAsignar);
                Tbl_showAsignaciones.rows[3].cells[1].innerText ="$ "+parseFloat(_productosAsignacion[i].Costo).toFixed(2);
                document.getElementById('PrecioVenta').setAttribute('min',parseFloat(_productosAsignacion[i].Costo).toFixed(2));
                break;
            }  
        }
    }else{
       Reinicio_Asignaciones();
    }
    
})
function Reinicio_Asignaciones(){
    document.getElementById('btn_GuardarAsignacion').disabled=true;
    Tbl_showAsignaciones.rows[0].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[1].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[2].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[3].cells[1].innerText ="";
    _AsignacionesDisponibles=0;
    Reinicio_FormAsignaciones();
}
function Reinicio_FormAsignaciones(params) {
    var validator = $("#From_Asignaciones").validate();
    validator.resetForm();
    document.getElementById('select_farmacias').value="";
    document.getElementById('piezas_asignacion').value="";
    document.getElementById('PrecioVenta').value="";
    document.getElementById('select_TV').value="";
    document.getElementById('Caducidad').value=null;
    
}
$('#btn_GuardarAsignacion').on('click', function(){
    let validate = $("#From_Asignaciones").valid();
    if (validate) {
        let formData = $("#From_Asignaciones").serialize();
        $.ajax({
            url:'GuardarAsignacion',
            type: "POST",
            headers:GlobalToken,
            data: formData,
            success:  function(payload){
                
            },
            error: function(){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
        });
    }
    
})
$('#piezas_asignacion').on('input', function(e){
    if (e.target.value <= _AsignacionesDisponibles && e.target.value >= 1) {
        Tbl_showAsignaciones.rows[2].cells[1].innerText =_AsignacionesDisponibles - e.target.value;
    }else{
        Tbl_showAsignaciones.rows[2].cells[1].innerText =_AsignacionesDisponibles;
    }
    
})
