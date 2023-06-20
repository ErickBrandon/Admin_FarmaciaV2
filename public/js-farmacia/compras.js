$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
  });
const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
const GlobalErrorCRUD ="Soluciones:\n"
    +"1) Intente de nuevo Guardar el registro\n"
    +"2) Recargue la página e intente de nuevo guardar el registro\n"
    +"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
    +"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";

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
    Reinicio_Factura()
   
});
$("#Modal_Asignaciones").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    Reinicio_Asignaciones();
    AccesoFormAsignacion(true);
    Slt_ProductoAsignacion.innerHTML=null
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
var _ProductoEnJuego = [];

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
            _factura.push({Codigo:codigo,Producto:'',Costo_Unidad:0.00, Unidades:1,SubTotal:0});
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
    let old_Unidades = 0;
    let rowFactura = document.getElementById('row_'+codigo);
    let unidades = parseInt(document.getElementById('pz'+codigo).value);
    let costo = document.getElementById('costo'+codigo).value;

    // condicion    true     :           false
   (op == 1) ? costo = valor : unidades = parseInt(valor);

   nuevo_sub = costo * unidades;
   rowFactura.cells[4].innerText = nuevo_sub;

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
    }h
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

                    CreateRowFactura(tbl, producto.Codigo, producto.Producto, producto.Costo_Unidad, producto.Unidades, producto.SubTotal);
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
                
                let op = document.createElement('option');
                op.value =0;
                op.text = "Seleccione un producto"
                Slt_ProductoAsignacion.appendChild(op);
    
                _productosAsignacion.map(producto =>{
                    op = document.createElement('option');
                    op.value = producto.id;
                    op.text = producto.Producto
                    Slt_ProductoAsignacion.appendChild(op);
               })
             
               $('#Modal_Asignaciones').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
        });
    }
   
}
function AccesoFormAsignacion(flag){
    document.getElementById('select_farmacias').disabled=flag
    document.getElementById('piezas_asignacion').disabled=flag
    document.getElementById('select_TV').disabled=flag
    document.getElementById('Caducidad').disabled=flag
    document.getElementById('btn_GuardarAsignacion').disabled=flag;
}
$(Slt_ProductoAsignacion).on('change', function(e){
    let op =e.target.value;

    if (op !=0) {
        Reinicio_Asignaciones();
        for (let i = 0; i < _productosAsignacion.length; i++) {
            if (_productosAsignacion[i].id == op ) {
                _ProductoEnJuego = _productosAsignacion[i];
                break;
            }  
        }
        if ((_ProductoEnJuego.Unidades - _ProductoEnJuego.Asignadas) !=0) {
           
            AccesoFormAsignacion(false);
        }
        
        document.getElementById('btn_PrecioUnidad').disabled = false;
        document.getElementById('btn_PrecioPz').disabled = false;

        

        Tbl_showAsignaciones.rows[0].cells[1].innerText =_ProductoEnJuego.Codigo;
        Tbl_showAsignaciones.rows[1].cells[1].innerText =_ProductoEnJuego.Unidades;

        let piezasUnidad = "";
        document.getElementById('PrecioPz').setAttribute('min',1);

        if (_ProductoEnJuego.Piezas_unidad != null) {
            piezasUnidad =_ProductoEnJuego.Piezas_unidad
            document.getElementById('PiezasUnidad').value = piezasUnidad;
            let min = parseFloat(_ProductoEnJuego.Costo_Unidad / piezasUnidad).toFixed(2);
            document.getElementById('PrecioPz').setAttribute('min',min);
        }

        Tbl_showAsignaciones.rows[2].cells[1].innerText =piezasUnidad;

        let porAsignar = (parseInt(_ProductoEnJuego.Unidades) - parseInt(_ProductoEnJuego.Asignadas))
        Tbl_showAsignaciones.rows[3].cells[1].innerText = porAsignar;
        _AsignacionesDisponibles = porAsignar

        document.getElementById('piezas_asignacion').setAttribute('max',porAsignar);
        Tbl_showAsignaciones.rows[4].cells[1].innerText ="$ "+parseFloat(_ProductoEnJuego.Costo_Unidad).toFixed(2);
        document.getElementById('PrecioUnidad').setAttribute('min',parseFloat(_ProductoEnJuego.Costo_Unidad).toFixed(2));
        
        let opTipoVenta = document.createElement('option');
        opTipoVenta.value="";
        opTipoVenta.text = "- Seleccione tipo de venta -";
        document.getElementById('select_TV').appendChild(opTipoVenta);
        
        let precioUnidad="";
        if (_ProductoEnJuego.Precio_Unidad != null) {   
            precioUnidad = "$ "+_ProductoEnJuego.Precio_Unidad;
            opTipoVenta = document.createElement('option');
            opTipoVenta.value="Unidad";
            opTipoVenta.text="Unidad";
            document.getElementById('select_TV').appendChild(opTipoVenta);
        }

        Tbl_showAsignaciones.rows[5].cells[1].innerText=precioUnidad

        let precioPieza="";
        if (_ProductoEnJuego.Precio_Piezas!= null) {
            precioPieza = "$ "+_ProductoEnJuego.Precio_Piezas;
            opTipoVenta = document.createElement('option');
            opTipoVenta.value="Piezas";
            opTipoVenta.text="Piezas";
            document.getElementById('select_TV').appendChild(opTipoVenta);
        }
        Tbl_showAsignaciones.rows[6].cells[1].innerText=precioPieza

    }else{
     
       Reinicio_Asignaciones();
       AccesoFormAsignacion(true);
       document.getElementById('btn_PrecioUnidad').disabled = true;
       document.getElementById('btn_PrecioPz').disabled = true;
    }
    
})
function Reinicio_Asignaciones(){
    
    Tbl_showAsignaciones.rows[0].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[1].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[2].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[3].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[4].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[5].cells[1].innerText ="";
    Tbl_showAsignaciones.rows[6].cells[1].innerText ="";
    _AsignacionesDisponibles=0;
    Reinicio_FormAsignaciones();
    Reinicio_FromPreciosVentas();
    document.getElementById('btn_PrecioUnidad').disabled = true;
    document.getElementById('btn_PrecioPz').disabled = true;  
}
function Reinicio_FormAsignaciones() {
    
    let validate = $("#From_Asignaciones").validate();
    validate.resetForm();
    document.getElementById('select_farmacias').value="";
    document.getElementById('piezas_asignacion').value="";
    
    document.getElementById('select_TV').innerHTML=null;
    document.getElementById('Caducidad').value=null;
    
}

$('#btn_GuardarAsignacion').on('click', function(){
   
    let validate = $("#From_Asignaciones").valid();
    if (validate) {
        let formData = $("#From_Asignaciones").serialize();
        formData='Factura='+_ClikAsignaciones+'&Producto_id='+_ProductoEnJuego.id+"&"+formData;
        
        $.ajax({
            url:'GuardarAsignacion',
            type: "POST",
            headers:GlobalToken,
            data: formData,
            success:  function(payload){
                
                for (let i = 0; i < _productosAsignacion.length; i++) {
                    if (_productosAsignacion[i].id == _ProductoEnJuego.id) {
                       
                        _ProductoEnJuego.Asignadas = parseInt(_ProductoEnJuego.Asignadas) + parseInt(payload.Asignadas);
                        _productosAsignacion[i] =  _ProductoEnJuego;
        
                        Tbl_showAsignaciones.rows[3].cells[1].innerText =_ProductoEnJuego.Unidades - _ProductoEnJuego.Asignadas  ;
                        break;
                    }
                }
                let Farmacia =$("#select_farmacias option:selected").text();
                
                if ((_ProductoEnJuego.Unidades - _ProductoEnJuego.Asignadas) == 0) {
                    AccesoFormAsignacion(true);
                }
                Reinicio_FormAsignaciones();
                $('#tbl_Facturas').DataTable().ajax.reload();
                swal("El producto se ha asignado correctamente\n En farmacia: "+Farmacia,{icon:"success",});
              
            },
            error: function(){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
        });
    }  
})


function Reinicio_FromPreciosVentas(){
    let validate = $("#from_PrecioUnidad").validate();
    validate.resetForm();
    let validate2 =$("#form_PrecioPieza").validate();
    validate2.resetForm();
    document.getElementById('PiezasUnidad').value=""
    document.getElementById('PrecioUnidad').value=""
    document.getElementById('PrecioPz').value=""
}
function AddTipoVenta(tipo) {
    let tipos =document.getElementById('select_TV').options;
    let agregado = false;
    for (let i = 0; i < tipos.length; i++) {
        if (tipos[i].value == tipo) {
            agregado = true;
            break;
        }
    }
    if (!agregado) {
        op = document.createElement('option');
        op.value=tipo;
        op.text=tipo;
        document.getElementById('select_TV').appendChild(op);
    }
}
$('#btn_PrecioUnidad').on('click', function () {
    document.getElementById('btn_PrecioUnidad').disabled = true;
    Slt_ProductoAsignacion.disabled = true;
    
    let validate = $("#from_PrecioUnidad").valid();
    if (validate) {
        let precio = parseFloat(document.getElementById('PrecioUnidad').value).toFixed(2);
        $.ajax({
            url:'PrecioUnidad/'+_ProductoEnJuego.id,
            type: "POST",
            headers:GlobalToken,
            data: {Precio:precio},
            success:  function(payload){
                for (let i = 0; i < _productosAsignacion.length; i++) {
                    if (_productosAsignacion[i].id==payload) {
                         _productosAsignacion[i].Precio_Unidad = precio;
                         _ProductoEnJuego.Precio_Unidad = precio;
                         Tbl_showAsignaciones.rows[5].cells[1].innerText="$ "+precio;
                         break;
                    } 
                 }
                Reinicio_FromPreciosVentas()
                document.getElementById('btn_PrecioUnidad').disabled = false;
                Slt_ProductoAsignacion.disabled = false;
                AddTipoVenta("Unidad");
                swal("El precio por unidad del producto se actualizó",{icon:"success",});
            },
            error: function(){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                document.getElementById('btn_PrecioUnidad').disabled = false;
                Slt_ProductoAsignacion.disabled = false;
                
            }
        });
    }else{
        document.getElementById('btn_PrecioUnidad').disabled = false;
        Slt_ProductoAsignacion.disabled = false;
    }
});
$('#btn_PrecioPz').on('click', function () {
    document.getElementById('form_PrecioPieza').disabled = true;
    Slt_ProductoAsignacion.disabled = true;
    
    let validate = $("#form_PrecioPieza").valid();
    if (validate) {
        let piezas= document.getElementById('PiezasUnidad').value;
        let precio = parseFloat(document.getElementById('PrecioPz').value).toFixed(2);
        $.ajax({
            url:'PrecioPieza/'+_ProductoEnJuego.id,
            type: "POST",
            headers:GlobalToken,
            data: {
                Piezas: piezas,
                Precio:precio
            },
            success:  function(payload){
                for (let i = 0; i < _productosAsignacion.length; i++) {
                    if (_productosAsignacion[i].id==payload) {
                         _productosAsignacion[i].Precio_Piezas = precio;
                         _productosAsignacion[i].Piezas_unidad = piezas;
                            //document.getElementById('PiezasUnidad').value=piezas
                        
                         _ProductoEnJuego.Precio_Piezas = precio;
                         _ProductoEnJuego.Piezas_unidad = piezas;

                         Tbl_showAsignaciones.rows[6].cells[1].innerText="$ "+precio;
                         Tbl_showAsignaciones.rows[2].cells[1].innerText=piezas;
                         break;
                    } 
                 }
                Reinicio_FromPreciosVentas()
                document.getElementById('btn_PrecioPz').disabled = false;
                Slt_ProductoAsignacion.disabled = false;
                AddTipoVenta("Piezas");
                swal("El precio de piezas por unidad del producto se actualizó",{icon:"success",});
            },
            error: function(){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                document.getElementById('btn_PrecioPz').disabled = false;
                Slt_ProductoAsignacion.disabled = false;
                
            }
        });
    }else{
        document.getElementById('btn_PrecioPz').disabled = false;
        Slt_ProductoAsignacion.disabled = false;
    }
})

$('#PiezasUnidad').on('change', function (e) {
    let piezas = e.target.value
    if (_ProductoEnJuego != []) {
        let min = parseFloat(_ProductoEnJuego.Costo_Unidad / piezas).toFixed(2);
        document.getElementById('PrecioPz').setAttribute('min',min);
    }
});
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
$('#btn_OtrasAsignaciones').on('click', function () {
    let op=document.getElementById('cbx_otrasAsignaciones').value;
    console.log(op);
    let producto;
    switch (op) {
        case '1':
            console.log("entra 1");
            producto = _ProductoEnJuego.id
        break;
        case '2':
            console.log("entra 2");
            producto= _ProductoEnJuego.Codigo
        break;
        case '3':
            console.log("entra 3");
            producto = _ProductoEnJuego.Producto;
            console.log(producto);
        break;
    }
console.log(producto);
    $.ajax({
        url:'OtrasAsignaciones',
        type: "POST",
        headers:GlobalToken,
        data: {
            op:op,
            producto:producto
        },
        success:  function(payload){
            document.getElementById('Cont_OA').innerText = payload;
            TblOtrasAsignaciones(payload,op);
        },
        error: function(){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);    
        }
    });
});

function TblOtrasAsignaciones(data,op) {
    let tbl = document.createElement('table');
    let thead = document.createElement('thead');
    let row = document.createElement('tr');
    let titulos;
    if (op == 1) {
         titulos = ["Producto","Tipo de venta","Unidades asignadas","Piezas x Unidad","Fecha asignación","Farmacia"]
      
    }else{
         titulos = ["Producto","Tipo de venta","Precio venta","Existencias","Farmacia","Última asignación"]
    }
    titulos.forEach((t) => {
           
        let cell = document.createElement('th');
        cell.innerText = t;
        row.appendChild(cell);
    });
    thead.appendChild(row);
    tbl.appendChild(thead);

    let tbody = document.createElement('tbody');
  
    data.forEach(e => {
        row = document.createElement('tr');
        
        if (op == 1) {
            let producto = document.createElement('td');
            producto.innerText = e.Producto
            let tv = document.createElement('td');
            tv.innerText = e.Tipo_Venta
            let unidades = document.createElement('td');
            unidades.innerText = e.Unidades;
            let pz = document.createElement('td');
            pz.innerText = e.Piezas_unidad;
            console.log(e.Piezas_unidad);
            let fecha = document.createElement('td');
            fecha.innerText = e.Fecha_asignacion;
            let farmacia = document.createElement('td');
            farmacia.innerText = e.farmacia_id;

            row.appendChild(producto)
            row.appendChild(tv)
            row.appendChild(unidades)
            row.appendChild(pz)
            row.appendChild(fecha)
            row.appendChild(farmacia)
        }else{
            let producto = document.createElement('td');
            producto.innerText = e.Producto
            let tv = document.createElement('td');
            tv.innerText = e.Tipo_Venta
            let precio = document.createElement('td');
            precio.innerText = e.Unidades;
            let existencia = document.createElement('td');
            existencia.innerText = e.Unidades;
            let farmacia = document.createElement('td');
            farmacia.innerText = e.Piezas_unidad;
            let Fecha = document.createElement('td');
            Fecha.innerText = e.Fecha_asignacion;

            row.appendChild(producto)
            row.appendChild(tv)
            row.appendChild(precio)
            row.appendChild(existencia)
            row.appendChild(farmacia)
            row.appendChild(fecha)

        }
        tbody.appendChild(row   )
    });

    tbl.appendChild(tbody);

   document.getElementById('Cont_OA').appendChild(tbl)

}