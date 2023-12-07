$( "form" ).on( "submit", function( event ) {
    event.preventDefault();
});

const GlobalErrorCRUD =`Soluciones:
    1) Intente de nuevo Guardar el registro
    2) Recargue la página e intente de nuevo guardar el registro
    3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio
    4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema`

const Tbl_showAsignaciones = document.getElementById("tbl_showAsignaciones");
const Slt_ProductoAsignacion = document.getElementById("select_asignaciones");

/* Variables para factura */
let _factura = [];
let _totalFactura = 0.00;
let _totalProdutos = 0;
let _ClickDetalle = 0;
let _ProductosEliminados = [];
let _IntentosCrearRows= 0;
let _ListaRows = [];

$("#From_Factura").on("hidden.bs.modal", function () {
    /* El evento detecta cuando se cierra el modal del formulario Factura */
    $('input, select').removeClass('is-invalid')
    Reinicio_Factura()
   
});

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
    _totalProdutos = 0;
    _RowsCreados = 0;
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