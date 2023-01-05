$(document).ready(function() {
    document.getElementById('btnVentanilla').disabled = true;
    document.getElementById('btnCobrar').disabled = true;
});
//--- variable globales---
GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
var ContCarrito = [];
var TotalCarrito = 0;
// -----------------------
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
        delay: 1500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: 'animated fadeIn',
            exit: 'animated fadeOut'
        },
        offset: {
            x: 30,
            y: 30
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert alert_pdv" role="alert">'+
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
function carrito(idProducto){
    if (ContCarrito.length  == 0) {
        agregarACarrito(idProducto);
        document.getElementById('btnVentanilla').disabled = false;
    }else{
        busquedaP=0
        for (let i = 0; i < ContCarrito.length; i++) {
           if (ContCarrito[i]['Codigo'] == idProducto) {
                busquedaP = 1;
                break
           }
        }
        if (busquedaP == 1) {
            notify('inverse'," El producto  "+idProducto+"  ya se agregó al carrito de compras",'fas fa-hand-paper')
        }else{
            agregarACarrito(idProducto);
        }
    }
}
function agregarACarrito(id){
    producto = document.getElementById(id);
    codigo = parseInt(producto.cells[2].innerText);
    nombre = producto.cells[3].innerText;
    precio = parseFloat(producto.cells[4].innerText);
    template_producto(codigo,nombre,precio,1);
    ContCarrito.push({
        'Codigo':codigo,
        'Precio':precio,
        'Unidades':1,
        'SubTotal':precio,
        'Nombre':nombre,
    });
    TotalCarrito = TotalCarrito + precio;
    document.getElementById('TotalCarrito').innerText = TotalCarrito;
}
function template_producto(codigo,nombre,precio,pz) {
    let tbl = document.getElementById('tbodyCarrito').insertRow(ContCarrito.length);
    tbl.setAttribute('id',"car_"+codigo);
    tbl.insertCell(0).innerText = nombre;
    tbl.insertCell(1).innerText = precio;
    tbl.insertCell(2).innerHTML = "<input id='CInput_"+codigo+"' class='CantidadP' type='number' value='"+pz+"' oninput=InputPz("+codigo+") onblur=vacio("+codigo+")></td>";
    tbl.insertCell(3).innerText = precio;
    tbl.insertCell(4).innerHTML = "<button type='button' class='btn btn-icon btn-rounded btn-danger' onclick=QuitarProductoCar("+codigo+")>"+
                                        "<i class='feather icon-trash-2'></i>"+
                                  "</button>";
}
function InputPz(id){
    if (document.getElementById("CInput_"+id).value != '' && document.getElementById("CInput_"+id).value >0) {
        unidades = parseInt(document.getElementById("CInput_"+id).value);
        if (unidades >= 1) {
            for (let i = 0; i < ContCarrito.length; i++) {
                if (ContCarrito[i]['Codigo'] == id) {
                    TotalCarrito = TotalCarrito - ContCarrito[i]['SubTotal'];

                    ContCarrito[i]['Unidades'] = unidades;
                    ContCarrito[i]['SubTotal'] =  ContCarrito[i]['Unidades'] * ContCarrito[i]['Precio'];
                    TotalCarrito = TotalCarrito + ContCarrito[i]['SubTotal'];

                    filaCar = document.getElementById("car_"+id);

                    filaCar.cells[3].innerText =  ContCarrito[i]['SubTotal'];
                    document.getElementById("TotalCarrito").innerText = TotalCarrito;
                    break;
                }
            }
        }
    }else{
        document.getElementById("CInput_"+id).value = "";
    }
}
function vacio(id) {
    if (document.getElementById("CInput_"+id).value == "" || document.getElementById("CInput_"+id).value <= 0) {
        document.getElementById("CInput_"+id).value = 1;
        InputPz(id);
    }
}
function vaciarCarrito(){
    swal({
        title: "¡Carrito de compras!",
        text: "¿Seguro que desea vaciar el carrito?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            limpiarCarrito();
            swal("Se han removido todos los productos del carrito", {
                icon: "success",
            });
        }
    });
}
function limpiarCarrito(){
    document.getElementById('btnVentanilla').disabled = true;
    for (let i = 0; i < ContCarrito.length; i++) {
        document.getElementById("car_"+ContCarrito[i]['Codigo']).remove();
    }
    ContCarrito = [];
    TotalCarrito = 0;
    document.getElementById('TotalCarrito').innerText = 00;
    document.getElementById('PagoModal').value = '';
    document.getElementById('TotalCarritoModal').innerText = '';
    document.getElementById('Cambio').innerText = '';
}
function QuitarProductoCar(id){
    for (let i = 0; i < ContCarrito.length; i++) {
       if(ContCarrito[i]['Codigo'] == id){
           TotalCarrito = TotalCarrito - ContCarrito[i]['SubTotal'];
           document.getElementById('TotalCarrito').innerText = TotalCarrito;
           ContCarrito.splice(i,1);
           document.getElementById("car_"+id).remove()
       }      
   }
   if (ContCarrito.length == 0) {
       document.getElementById('btnVentanilla').disabled = true;
       
   }
       // producto = document.getElementById("car_"+id);
}
function ventanilla(){
    if(TotalCarrito != 0){
        document.getElementById("TotalCarritoModal").innerText = TotalCarrito;
        $("#ModalPago").modal('show');
    }
}
function PagoVentanilla(){
    if (document.getElementById("PagoModal").value != '' && document.getElementById("PagoModal").value != 0 && document.getElementById("PagoModal").value >=1) {
        pago = parseFloat(document.getElementById("PagoModal").value);
        cambio = pago - TotalCarrito;
        if (cambio >=0) {
            document.getElementById("Cambio").innerText = cambio;
            document.getElementById('btnCobrar').disabled = false;
            document.getElementById('btnCobrar').classList.remove('btn-dark');
            document.getElementById('btnCobrar').classList.add('btn-primary');
        }else{
            document.getElementById("Cambio").innerText = "-----"
            document.getElementById('btnCobrar').classList.remove('btn-primary');
            document.getElementById('btnCobrar').classList.add('btn-dark');
            document.getElementById('btnCobrar').disabled = true;
        }
    }else{
        document.getElementById('btnCobrar').classList.remove('btn-primary');
        document.getElementById('btnCobrar').classList.add('btn-dark');
        document.getElementById('btnCobrar').disabled = true;

        if (document.getElementById("PagoModal").value <0 || document.getElementById("PagoModal").value == '-0') {
            document.getElementById("PagoModal").value = "";
            document.getElementById("Cambio").innerText = "-----"

        }
    }
}
function RegistrarVenta() {
    console.log("4554545");
    $.ajax({
        url:"/RegistrarVenta",
        type: "POST",
        headers:GlobalToken,
        data: {
            'carrito':ContCarrito,
            'TotalVenta':TotalCarrito,
            'Farmacia':1
        },
        success:  function(data){
            if (data == 1) {
                VentaExitosa();
            }  
        },
        error: function(jqXHR, textStatus, errorThrown){
        }
     });
}
function VentaExitosa(){
    limpiarCarrito();
    $("#ModalPago").modal('hide');
    swal("Venta registrada", "La venta se ha registrado exitosamente", "success");
}