const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
const GlobalErrorCRUD ="Soluciones:\n"
    +"1) Intente de nuevo Guardar el registro\n"
    +"2) Recargue la página e intente de nuevo guardar el registro\n"
    +"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
    +"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";


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
var _factura = [];
var _totalFactura = 0.00;
var _ContadorClickDetalle = 0;

$("#Nueva_factura").on("click", function () {
    document.getElementById('Title_From_Factura').innerText ="Nueva factura";
    document.getElementById('btn_RFactura').innerText ="Registrar factura";
 });

function Reinicio_Factura(){
    _ContadorClickDetalle = 0;
    if (_factura.length !=0) {
        _factura.map(producto =>{
            $("#producto"+producto.Codigo).rules('remove');
       })
    }
    _factura = [];
    _totalFactura = 0.00;
    document.getElementById('total_factura').innerText=parseFloat(0).toFixed(2)
    document.getElementById('tbodyCompras').innerHTML=null
}

function CreateRowFactura(tbl,codigo,producto,costo,pz, sub) {
    if (!producto && !costo && !pz && !sub) {
       producto = "";
       costo = null;
       pz = 1;
       sub = parseFloat(0).toFixed(2);
    }

    tbl.setAttribute('id',"row_"+codigo);
    tbl.insertCell(0).innerText = codigo;
    tbl.insertCell(1).innerHTML = "<div class='form-group'>"+
        "<input type='text' class='form-control' id='producto"+codigo+"' name='producto"+codigo+"' placeholder='Producto' value='"+producto+"' onchange=Nombre_Producto("+codigo+",this.value)>"+
    "</div>";

    tbl.insertCell(2).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='costo"+codigo+"' name='costo"+codigo+"' placeholder='0.00' value='"+costo+"' oninput=calculo(1,"+codigo+",this.value) min='0'>"+
    "</div>";

    tbl.insertCell(3).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='pz"+codigo+"' name='pz"+codigo+"' value='1' value='"+pz+"' oninput=calculo(2,"+codigo+",this.value) min='0'>"+
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
            _factura.push({Codigo:codigo,Producto:'',Costo:0.00, Piezas:1,SubTotal:0});
            document.getElementById('Codigo_nuevo').value =null
        }else{
            notify();   
        }
    }
   
}
function calculo (op,codigo,valor){
    let old_sub = 0;
    let nuevo_sub = 0;
    let rowFactura = document.getElementById('row_'+codigo);
    let piezas = document.getElementById('pz'+codigo).value;
    let costo = document.getElementById('costo'+codigo).value;
    console.log(costo);
    console.log(piezas);
    // condicion    true     :           false
   (op == 1) ? costo = valor : piezas = valor;

   nuevo_sub = costo * piezas;
   rowFactura.cells[4].innerText = nuevo_sub;

   _factura.map(producto =>{
        if (producto.Codigo == codigo) {
            old_sub =producto.SubTotal

            producto.Piezas = piezas;
            producto.SubTotal = parseInt(nuevo_sub);
            producto.Costo = parseFloat(costo).toFixed(2)
        }
   })

   _totalFactura = _totalFactura - old_sub;
   _totalFactura = _totalFactura + nuevo_sub;
   document.getElementById('total_factura').innerText = parseFloat(_totalFactura).toFixed(2)
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
$('#btn_RFactura').on('click', function() {
    if (_factura.length !=0) {
        let validate = $("#form_factura").valid()
        if (validate) {
            swal({
                title: "Total de la compra\n $ "+parseFloat(_totalFactura).toFixed(2),
                text: "¿Seguro que desea registrar la factura en el sistema?\n\nAsegurece que el total de la factura registrada coincide con el de la factura física",
                icon: "info",
                buttons: true,
                dangerMode: false,
            })
            .then((registrar) => {
                if (registrar) {
                    let proveedor =document.getElementById('Proveedor').value;
                    let data = {
                        Factura:_factura,
                        TotalFactura:_totalFactura,
                        Proveedor:proveedor
                    }
                    let mensaje = "La factura fue registrada exitosamente y se le asignó el ID: "
                    Query_Factura(
                        1,
                        'GuardarFactura',
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
            if (tipo_query == 1) {
                $('#From_Factura').modal('hide');
                Reinicio_Factura();
                $('#tbl_Facturas').DataTable().ajax.reload();
            }
            swal(mensaje+payload,{icon:"success",});
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
        }
     });
 }

function detalleFactura(id){
    if ( _ContadorClickDetalle == 0) {
        _ContadorClickDetalle = 1;
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