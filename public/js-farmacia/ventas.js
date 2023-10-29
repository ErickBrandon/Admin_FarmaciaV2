$(document).ready(function() {
    


    hoy = new Date();
    hoy = (hoy.getDate())+"/"+(hoy.getMonth()+1) +"/"+hoy.getFullYear()
    document.getElementById("FechaHoy").innerText = hoy
});

GFlag=0;
function VerDetalle(id){
    $.ajax({
        url:"/Detalle/"+id,
        type: "POST",
        headers:GlobalToken,
        data: true,
        success:  function(data){
            DesglosarVenta(data,id)
        },
        error: function(jqXHR, textStatus, errorThrown){
        }
     });
}
function DesglosarVenta(Productos,Codigo_venta) {
    document.getElementById('CodigoVenta').innerText=Codigo_venta;
    document.getElementById('tbl_detalle').innerHTML=null;

    Productos.forEach((producto,i) => {
        let tbl = document.getElementById('tbl_detalle').insertRow(i);
        tbl.insertCell(0).innerText = producto.Codigo;
        tbl.insertCell(1).innerText = producto.Producto;
        tbl.insertCell(2).innerText = producto.Unidades;
        tbl.insertCell(3).innerText = "$"+parseFloat(producto.SubTotal).toFixed(2);
        tbl.insertCell(4).innerText = producto.TipoVenta;
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

