$(document).ready(function() {
    hoy = new Date();
    hoy = (hoy.getDate())+"/"+(hoy.getMonth()+1) +"/"+hoy.getFullYear()
    document.getElementById("FechaHoy").innerText = hoy
});
GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
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
        tbl.insertCell(3).innerText = producto.SubTotal;
    });

    /* if (GFlag != 0) {
        for (let i = 0; i < GFlag; i++) {
            document.getElementById('D_'+id).remove();
        }
    }
    document.getElementById('NoVenta').innerText = id;
    GFlag = Venta.length;
    for (let i = 0; i < Venta.length; i++) {
        let tbl = document.getElementById('tbl_detalle').insertRow(i+1);
        tbl.setAttribute('id',"D_"+id);
        tbl.insertCell(0).innerText = Venta[i]['Codigo'];
        tbl.insertCell(1).innerText = Venta[i]['Unidades'];
        tbl.insertCell(2).innerText = Venta[i]['SubTotal']; */
        $("#modal_detalles_venta").modal('show');
  /*   } */

}
/*function CerrarDetalle() {
    document.getElementById('tbl_detalle').remove()
    for (let i = 0; i < tamaño; i++) {
        document.getElementById("car_"+ContCarrito[i]['Codigo']).remove();
    }
} */
function GenerarCorte() {
        farmacia = document.getElementById('PntVenta').getAttribute('farmID');
        fecha = document.getElementById('FechaHoy').innerText;
     $.ajax({
        url:"/CorteDeCaja/"+document.getElementById('PntVenta').getAttribute('farmID'),
        type: "POST",
        headers:GlobalToken,
        data:{"Fecha":fecha},
        success:  function(data){
            if (data != 0) {
                document.getElementById('FechaCorte').innerText = data.Fecha;
                document.getElementById('Corte').innerText = data.Corte;
                swal("¡Ok!", "Se ha generado un corte de caja con fecha "+data.Fecha, "success");
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
        }
     });
}