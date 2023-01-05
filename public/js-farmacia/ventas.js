GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
GFlag=0;
function VerDetalle(id){
    $.ajax({
        url:"VentaRegistrada/"+2,
        type: "GET",
        headers:GlobalToken,
        data: true,
        success:  function(data){ 
            DesglosarVenta(data,id)
        },
        error: function(jqXHR, textStatus, errorThrown){
        }
     });
}
function DesglosarVenta(Venta, id) {
    if (GFlag != 0) {
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
        tbl.insertCell(2).innerText = Venta[i]['SubTotal'];
        $("#modal_detalles_venta").modal('show');
    }

}
function CerrarDetalle() {
    document.getElementById('tbl_detalle').remove()
    /* for (let i = 0; i < tamaño; i++) {
        document.getElementById("car_"+ContCarrito[i]['Codigo']).remove();
    } */
}