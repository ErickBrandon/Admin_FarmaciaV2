$(document).ready(function() {
    document.getElementById('btnVentanilla').disabled = true;
    document.getElementById('btnCobrar').disabled = true;
});
//document.oncontextmenu = function(){return false}
$(document).bind('keydown',function(e){
    if ( e.which == 27 ) {
     CloseScanner();
    };
});
//--- variable globales---
GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
var _ProductosVenta = [];
var ContCarrito = [];
var TotalCarrito = parseInt(0);
var _TotalProductos = parseInt(0);
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
        timer: 1500,
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
        let flag=false;
        ContCarrito.forEach(p => {
            if (p.id == idProducto) {
                flag = true;
           }
        });
        if (flag == true) {
            notify('inverse'," El producto ya se agregó al carrito de compras",'fas fa-hand-paper');
            return !flag;
        }
        agregarACarrito(idProducto);
    }
}
function agregarACarrito(id){
    let producto = _ProductosVenta.find(p => p.id == id)
    template_producto(producto);
    ContCarrito.push({'id':producto.id,'Codigo':producto.Codigo,'Producto':producto.Producto,'Precio':producto.Precio,'UnidadesVenta':1,'Existencias':producto.Existencias,'SubTotal':producto.Precio,'TipoVenta':producto.TipoVenta});   
    TotalCarrito = TotalCarrito + producto.Precio;
    document.getElementById('TotalCompra').innerText ="$ "+parseFloat(TotalCarrito).toFixed(2);

    _TotalProductos = _TotalProductos +1;
    document.getElementById('txt_TotalProductos').innerText =_TotalProductos;
    Sound_scan.play();
}
function template_producto(producto) {
    let tbl = document.getElementById('tbodyCarrito').insertRow(ContCarrito.length);
    tbl.setAttribute('id',"car_"+producto.id);
    tbl.insertCell(0).innerText = producto.Producto;
    tbl.insertCell(1).innerText = "$"+parseFloat(producto.Precio).toFixed(2);
    tbl.insertCell(2).innerHTML = "<input id='CInput_"+producto.id+"' class='CantidadP' type='number' value='1' oninput=InputPz("+producto.id+",this.value) onblur=vacio("+producto.Existencias+","+producto.id+",this.value) min='1' max='"+producto.Existencias+"' step='1'></td>";
    tbl.insertCell(3).innerText = "$"+parseFloat(producto.Precio).toFixed(2);
    let info;
    if (producto.TipoVenta == "Caja") {
        info ="<span class='text-white label bg-c-blue f-12'><b>"+producto.TipoVenta+"</b></span>"
    }else{
        info="<span class='text-white label theme-bg2 f-12'><b>"+producto.TipoVenta+"</b></span>"
    }
    tbl.insertCell(4).innerHTML = info;
    tbl.insertCell(5).innerHTML = "<button type='button' class='btn btn-icon btn-rounded btn-danger' onclick=QuitarProductoCar("+producto.id+")>"+
                                        "<i class='feather icon-trash-2'></i>"+
                                  "</button>";
    tbl.insertCell(6).innerHTML = "<btn class='btn btn-icon btn-rounded btn-info' onclick=buscarEnLista("+producto.Codigo+")>"+
                                        "<i class='fas fa-search'></i>"+                               
                                    "</btn>";
    
}
function buscarEnLista(codigo) {
    let table = $('#tbl_Productos').DataTable();
    table.search(codigo).draw();
    $("#Modal_Productos").modal('show');
}
function InputPz(id,pz){
    let decimal = pz - Math.floor(pz);
    if (decimal > 0) {
        pz = pz - decimal;
        document.getElementById('CInput_'+id).value =pz;
        return false;
    }
   let producto = ContCarrito.find(p=> p.id == id)
    if (pz <= producto.Existencias  && pz!="")  {
        if (pz!=0 && pz >=1) {
                for (let i = 0; i < ContCarrito.length; i++) {
                    if (ContCarrito[i]['id'] == id) {
                        TotalCarrito = TotalCarrito - ContCarrito[i]['SubTotal'];
                        console.log(TotalCarrito);
                        _TotalProductos = _TotalProductos - ContCarrito[i]['UnidadesVenta'];
                        
                        ContCarrito[i]['UnidadesVenta'] = parseInt(pz);
                        ContCarrito[i]['SubTotal'] =  ContCarrito[i]['UnidadesVenta'] * ContCarrito[i]['Precio'];
                        TotalCarrito =TotalCarrito + ContCarrito[i]['SubTotal'];
    
                        let filaCar = document.getElementById("car_"+ContCarrito[i]['id']);
                        filaCar.cells[3].innerText ="$"+parseFloat(ContCarrito[i]['SubTotal']).toFixed(2);
                        document.getElementById("TotalCompra").innerText ="$"+ parseFloat(TotalCarrito).toFixed(2);
                        _TotalProductos =  _TotalProductos + ContCarrito[i]['UnidadesVenta'];
                        document.getElementById('txt_TotalProductos').innerText = _TotalProductos;
                        
                        break;
                    }
                }
        }
    } 
}
function vacio(max,id,value) {
   if (value<=0 || value > max || value=='') {
        InputPz(id,1);
        document.getElementById('CInput_'+id).value =1;
   }
}
$("#btn_LimpiarCarrito").on("click", function () {
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
            swal("Se han vaciado el carrito de compras", {
                icon: "success",
            });
        }
    });  
});
function limpiarCarrito(){
    document.getElementById('btnVentanilla').disabled = true;
    for (let i = 0; i < ContCarrito.length; i++) {
        document.getElementById("car_"+ContCarrito[i]['id']).remove();
    }
    ContCarrito = [];
    TotalCarrito = 0;
    _TotalProductos=0;
    document.getElementById('TotalCompra').innerText ="$ "+parseFloat(0).toFixed(2);
    document.getElementById('PagoModal').value = '';
    document.getElementById('TotalCompra').innerText = '$0.00';
    document.getElementById('txt_cambio').innerText = '';
    document.getElementById('txt_TotalProductos').innerText = 0;
    
}
function QuitarProductoCar(id){
    for (let i = 0; i < ContCarrito.length; i++) {
       if(ContCarrito[i]['id'] == id){
           TotalCarrito = TotalCarrito - ContCarrito[i]['SubTotal'];
           document.getElementById('TotalCompra').innerText ="$ "+ parseFloat(TotalCarrito).toFixed(2);
           _TotalProductos = _TotalProductos - ContCarrito[i]['UnidadesVenta'];
           document.getElementById('txt_TotalProductos').innerText =_TotalProductos;
           ContCarrito.splice(i,1);
           document.getElementById("car_"+id).remove()
           break;
       }      
   }
   if (ContCarrito.length == 0) {
       document.getElementById('btnVentanilla').disabled = true;
       
   }
       // producto = document.getElementById("car_"+id);
}

$("#btnVentanilla").on("click", function () {
    if(TotalCarrito != 0){
        document.getElementById("txt_confirmacionTotal").innerText ="$"+parseFloat(TotalCarrito).toFixed(2);
        if (_TotalProductos == 1) {
            document.getElementById("txt_confimacionNP").innerText =_TotalProductos+" producto.";
        }else{
            document.getElementById("txt_confimacionNP").innerText =_TotalProductos+" productos.";
        }
        $("#ModalPago").modal('show');
    }
});
$("#PagoModal").on("input", function (e) {
    if (e.target.value != "") {
        pago = parseFloat(e.target.value);
        let cambio = pago - TotalCarrito;
         
        if (cambio >=0) {
            document.getElementById('txt_cambio').innerText ="$"+parseFloat(cambio).toFixed(2);
            document.getElementById('btnCobrar').disabled = false;
        }else{
            document.getElementById('btnCobrar').disabled = true;
            document.getElementById('txt_cambio').innerText = ""
        }
    }else{
        document.getElementById('btnCobrar').disabled = true;
        document.getElementById('txt_cambio').innerText = "";
    }
});

function PagoVentanilla(){
    
}
$("#btnCobrar").on("click", function () {
    let farmacia = +document.getElementById("PntVenta").getAttribute('farmID');
   
    $.ajax({
        url:"/RegistrarVenta",
        type: "POST",
        headers:GlobalToken,
        data: {
            'carrito':ContCarrito,
            'TotalVenta':TotalCarrito,
            'Farmacia':farmacia
        },
        success:  function(data){
            console.log(data);
            if (data == 1) {
                VentaExitosa();
            }else{
                $('#tbl_Productos').DataTable().ajax.reload();
                let mensaje =data.length+" de los productos que se encuentran en el carrito "+
                "se encuentran agotados o no se cuenta con las unidades suficientes."+
                "\nPuedes usar el botón de busqueda de cada producto que se encuentra en el carrito"+
                "para ajustar la compra.\n \nLa lista de productos en venta fue actualizada";
                swal(
                    "Favor de ajustar la compra",
                    mensaje,
                    "warning"
                )
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
          
        }
     });
});

function VentaExitosa(){
    limpiarCarrito();
    $('#tbl_Productos').DataTable().ajax.reload();
    $("#ModalPago").modal('hide');
    swal("Venta registrada", "La venta se ha registrado exitosamente", "success");
    document.getElementById('txt_confirmacionTotal').innerText="";
    document.getElementById('txt_confimacionNP').innerText="";
    document.getElementById('PagoModal').value="";
    document.getElementById('txt_cambio').innerText="";
    document.getElementById('btnCobrar').disabled=true;
}
function IngresarAlCarrito(codigo) {
   console.log(1);
    /* try {
       let similar = document.querySelector(".c-"+codigo).getAttribute('id');
       carrito(similar);
    } catch (error) {
        notify('inverse'," No se encontró el producto, intente de nuevo",'fas fa-times');
    }
    document.getElementById('Codigo').value =null; */
    let similar = [];
    _ProductosVenta.forEach((p,i)=>{
        if (p.Codigo == codigo) {
            similar.push(p.Codigo)
            /* if (similar.length>1) {
                return;
            } */

        }
    })
    if (similar.length == 1) {
        document.getElementById('Codigo').value =null;

        carrito(similar);
       
    }
    if (similar.length>1) {
        document.getElementById('Codigo').value =null;
        $('#tbl_Productos').DataTable().search(similar[0]).draw();
            $("#Modal_Productos").modal('show')
           
    }
    if (similar.length < 1) {
        notify('inverse'," No se encontró el producto, intente de nuevo",'fas fa-times');
        document.getElementById('Codigo').value =null;
    }
    
}
function OpenScanner() {
    $('#modal_Scanner').modal('show');     
      Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;
      
        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
              return box !== result.box;
            }).forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 0 }, drawingCtx, { color: "green", lineWidth: 2 });
            });
          }
      
          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
          }
      
          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
          }
         
        }
        
      });
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#Camara')    // Or '#yourElement' (optional)
        },
        decoder : {
          readers : [
          /* "code_128_reader",
          "code_128_reader",
          "code_39_reader",
           "code_39_vin_reader", */
          "ean_reader"
         /*  "ean_8_reader",
          "upc_reader",
          "upc_e_reader",
          "codabar_reader",
          "i2of5_reader",
          "2of5_reader",
          "code_93_reader" */
        ]
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          Quagga.start();
      });

      Quagga.onDetected(function(data){
      
        document.getElementById('Codigo').value = data.codeResult.code;
        G_scan.play();
        IngresarAlCarrito(data.codeResult.code);

        
        Quagga.stop();
        document.getElementById('Codigo').value = null;
        $('#modal_Scanner').modal('hide');
   
        Quagga.offDetected();
      });
      
}
function CloseScanner() {
    Quagga.stop();
    Quagga.offDetected();
    $('#modal_Scanner').modal('hide');
}
