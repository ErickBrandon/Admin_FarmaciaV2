$(document).ready(function() {
    hoy = new Date();
    hoy = (hoy.getDate())+"/"+(hoy.getMonth()+1) +"/"+hoy.getFullYear()
    document.getElementById("FechaHoy").innerText = hoy
});

let GFlag=0;
let _ProductoCancelado = [];
let _ventaEnJuego=0;
let _DetallesVenta=[];
function VerDetalle(id){
    $.ajax({
        url:"/Detalle/"+id,
        type: "POST",
        headers:GlobalToken,
        data: true,
        success:  function(data){
            _DetallesVenta = data.Detalles;
            _ventaEnJuego = id;
            DesglosarVenta(data.Detalles,id,data.Admin)
        },
        error: function(jqXHR, textStatus, errorThrown){
        }
     });
}
function DesglosarVenta(Detalles,Codigo_venta,admin) {
    document.getElementById('CodigoVenta').innerText=Codigo_venta;
    document.getElementById('tbl_detalle').innerHTML=null;

    Detalles.forEach((producto,i) => {
        let tbl = document.getElementById('tbl_detalle').insertRow(i);
        tbl.insertCell(0).innerText = producto.Codigo;
        tbl.insertCell(1).innerText = producto.Producto;
        tbl.insertCell(2).innerText = producto.Unidades;
        tbl.insertCell(3).innerText = "$"+parseFloat(producto.SubTotal).toFixed(2);
        tbl.insertCell(4).innerText = producto.TipoVenta;
        if (admin) {
            tbl.insertCell(5).innerHTML = `<div class="checkbox checkbox-danger d-inline">
                <input class='cancelado' type="checkbox" name="checkbox-d-${producto.id}" id="checkbox-d-${producto.id}" detalle="${producto.id}">
                <label for="checkbox-d-${producto.id}" class="cr"></label>
            </div>`;
            tbl.insertCell(6).innerHTML =`<div class="form-group">
                <select class="form-control col-12 piezas_canceladas" id="pz_canceladas_${producto.producto_id}" producto='${producto.producto_id}' disabled>
                    <option id='value_null_${producto.producto_id}' value></option>
                </select>
            </div>`;
            let select = $('#pz_canceladas_'+producto.producto_id)
            let total_pz =parseInt(producto.Unidades)
            
            for (let i = 1; i <= total_pz; i++) {
                select.append(`<option value=${i}>${i}</option>`)   
            }
        }
        
    });


    $("#modal_detalles_venta").modal('show');
}
function GenerarCorte() {
        farmacia = document.getElementById('PntVenta').getAttribute('farmID');
        fecha = document.getElementById('FechaHoy').innerText;
     $.ajax({
        url:"CorteDeCaja",
        type: "POST",
        headers:GlobalToken,
        data:{"Fecha":fecha},
        success:  function(data){
            if (data != 0) {
                document.getElementById('FechaCorte').innerText = data.Fecha;
                document.getElementById('Corte').innerText = parseFloat(data.Corte).toFixed(2);
                swal("¡Ok!", "Se ha generado un corte de caja con fecha "+data.Fecha, "success");
                document.getElementById('btn_GenerarCorte').innerText ="Actualizar corte";
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
        }
     });
}

$(document).on('click','.cancelado',function(){
    let producto_id = parseInt(this.getAttribute('detalle'))
    if ($(this).is(":checked")) {
        let producto = _DetallesVenta.find(p => p.id == producto_id)
        _ProductoCancelado.push({
            'detalle_id':producto.id,
            'producto_id':producto.producto_id,
            'pz_canceladas':1
        });
        
        document.getElementById('pz_canceladas_'+producto.producto_id).disabled=false;
        document.getElementById('pz_canceladas_'+producto.producto_id).value=1;
        document.getElementById('value_null_'+producto.producto_id).disabled=true;
        
    }else{
        for (let i = 0; i < _ProductoCancelado.length; i++) {
           if(_ProductoCancelado[i]['detalle_id'] == producto_id){
            
                document.getElementById('pz_canceladas_'+_ProductoCancelado[i]['producto_id']).disabled=true;
                
                document.getElementById('pz_canceladas_'+_ProductoCancelado[i]['producto_id']).value=null;
                  
                document.getElementById('value_null_'+_ProductoCancelado[i]['producto_id']).disabled=false;
                _ProductoCancelado.splice(i,1);
                break
           }
        }
    }
  
    let txtCancelado;

    if (_ProductoCancelado.length == 1) {
        txtCancelado = '1 producto vendido'
    }else{
        txtCancelado =_ProductoCancelado.length+" productos vendidos"
    }

    if (_ProductoCancelado.length >0) {
        document.getElementById('btn_cancelar').disabled=false;
    }else{
        document.getElementById('btn_cancelar').disabled=true;

    }
    document.getElementById('No_cancelados').innerText = txtCancelado;
    
})
$(document).on('change','.piezas_canceladas',function(e){
   
    let producto_id = parseInt(e.target.getAttribute('producto'))
    _ProductoCancelado.forEach((producto,i) => {
       
        if (producto['producto_id'] == producto_id) {
            
          producto['pz_canceladas']=e.target.value
        }
    });


})
$("#btn_cancelar").on('click',function(){
    if (_ProductoCancelado.length == 0) {
        return
    }
    swal({
        title: "¡Cancelacion de ventas!",
        text: "¿Seguro que desea cancelar la venta de los productos seleccionados?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((cancelar) => {
        if (cancelar) {
            $.ajax({
                url:"/CancelarVenta/"+_ventaEnJuego,
                type: "POST",
                headers:GlobalToken,
                data: {'Cancelados':_ProductoCancelado},
                success:  function(data){
                    if (data.success) {
                        $('#tbl_ventas').DataTable().ajax.reload();
                        $("#modal_detalles_venta").modal('hide');
                        swal("¡Ok!", data.message, "success");
                    }
                   
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert (textStatus)
                }
             });
        }
    });  
})
$("#modal_detalles_venta").on("hidden.bs.modal", function () {
     _ProductoCancelado = [];
     _ventaEnJuego=0;
     _DetallesVenta=[];

});