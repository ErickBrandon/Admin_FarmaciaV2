
$(document).ready(function() {
    setInterval(Fecha_Hoy, 1000*3);
});
var Fecha_Hoy =function(){
    let Fecha;
    let hoy = new Date();
    let hora = hoy.getHours();
    let minutos = hoy.getMinutes();
    var sufijo = ' am';
    if(hora >= 12) {
        hora = ((hora -12) == 0) ? 1:(hora -12);
        
        sufijo = ' pm';
    }
    if (minutos < 10) {
        minutos = "0"+minutos;
    }

    Fecha = hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear()+"  "+hora+":"+minutos+sufijo;
    document.getElementById('Fecha_hoy').innerText = Fecha;
}

// --------- Variables Globales
    
    GlobalErrorCRUD ="Soluciones:\n"
    +"1) Intente de nuevo Guardar el registro\n"
    +"2) Recargue la página e intente de nuevo guardar el registro\n"
    +"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
    +"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
let myPieChart;
let _CorteTotal = 0;
let _UtilidadTotal = 0;
let _PerdidaTotal = 0;
let _InversionTotal = 0;

let _Porcentaje_inversion = 0;
let _Procentaje_utilidad = 0;
let _Porcentaje_perdida = 0;
    // ---------------------------

function Corte_General() {
    $.ajax({
        url:"/CorteGeneral",
        type: "POST",
        headers:GlobalToken,
        data: true,
        success:  function(data){       
           document.getElementById('No_PV').innerText =data.Farmacias+" P.V.";
           document.getElementById('Corte_General').innerText ="$"+parseFloat(data.Total).toFixed(2);
           document.getElementById('Inversion_general').innerText ="$"+parseFloat(data.Inversion).toFixed(2);
           document.getElementById('Utilidad_general').innerText ="$"+parseFloat((data.Total - data.Inversion)).toFixed(2);
           swal("¡Ok!", "Se ha generado un Corte General el día de hoy con\n "+data.Farmacias+" Farmacias", "success");

        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
        }
     });
}

function Cortes_Individuales() {
    $.ajax({
        url:"/CortesIndividuales",
        type: "POST",
        headers:GlobalToken,
        data: true,
        success:  function(data){       
            if (data == true) {
                $('#tbl_contable').DataTable().ajax.reload();
                swal("¡Ok!", "Se han generado o actualizado cortes para todas las farmacias", "success");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
        }
     });
}


$(document).on('change','#Fecha_inicio_CG, #Fecha_fin_CG',function(){
    $('#tbl_HCG').DataTable().clear().draw();
    $('#tbl_HCG').DataTable().destroy();  
    
    document.getElementById('borrar_HCG').innerHTML = null;  
})
function search_CG() {
    $('#tbl_HCG').DataTable().clear().draw(); 
    $('#tbl_HCG').DataTable().destroy();
     
    document.getElementById('borrar_HCG').innerHTML= null
    let op = document.getElementById("switch-1").checked
    
    if (op == true) {
        document.getElementById('cont_personalizada_CG').innerHTML ="<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-success'></span> Inicio</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='Fecha_inicio_CG' name='Fecha_inicio_CG'>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-warning'></span> Fin</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='Fecha_fin_CG' name='Fecha_fin_CG'>"+
    "</div>";
        DelimitacionFechaHistorial('Fecha_inicio_CG');
        DelimitacionFechaHistorial('Fecha_fin_CG');
    }else{
        document.getElementById('cont_personalizada_CG').innerHTML = "";
    }
}

function ConsutlarHistorialCG() {

    let isvalidate=$("#form_HCG").valid();
    if (isvalidate) {
        $('#tbl_HCG').DataTable().destroy();  
       
    let op = document.getElementById("switch-1").checked;
   
    let tipo_busqueda;
    if (op == false) {
        tipo_busqueda={'op':1}
        Tbl_HCG(tipo_busqueda);
        document.getElementById('borrar_HCG').innerHTML = `<br><button id='btn_eliminarHI' class='btn btn-danger btn-sm col-12' onclick='Eliminar_cortes_Generales(1)'>
        Eliminar todo el histórico <br>(Corte general, Corte por farmacia, Pérdidas, ventas y detalles)
        </button>`
    }else{
        let inicio = document.getElementById('Fecha_inicio_CG').value;
        let fin = document.getElementById('Fecha_fin_CG').value;

        tipo_busqueda={
            'op':2,
            'inicio':inicio,
            'fin':fin
        }
        Tbl_HCG(tipo_busqueda);
        document.getElementById('borrar_HCG').innerHTML = `<br><button id='btn_eliminarHI' class='btn btn-danger btn-sm col-12' onclick='Eliminar_cortes_Generales(2)'>
            Eliminar todo entre <br>${inicio} y ${fin}<br>
            (Corte general, Corte por farmacia, Pérdidas, ventas y detalles)
        </button>`

    }
    }
    
     
}
/* function EliminarCG(id) {
    let corte = document.querySelector(".cg-"+id);
    let fecha_CG = corte.cells[0].innerText
    swal({
        title: "¡Corte del "+fecha_CG+" !",
        text: "¿Seguro que desea eliminar el corte general",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url:"/EliminarCG/"+id,
                type: "POST",
                headers:GlobalToken,
                data: true,
                success:  function(data){
                    $('#tbl_HCG').DataTable().ajax.reload();
                    swal("Se ha eliminado el corte general", {
                        icon: "success",
                    });       
                 
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                }
             });
        }
    });
   
} */

function Eliminar_cortes_Generales(op) {
    loadingShow("btn_eliminarHI");
    let datos;
    let texto;
    if (op == 1) {
        texto = 'Todos los cortes generales'
        datos ={'op':op}
    }else{
        let inicio = document.getElementById('Fecha_inicio_CG').value;
        let fin = document.getElementById('Fecha_fin_CG').value;
        texto = "Cortes entre "+inicio+" y "+fin;
        datos ={
                'op':op,
                'inicio':inicio,
                'fin': fin
            }
    }

    swal({
        title: "¿Seguro que desea eliminar?",
        text: texto,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url:"/EliminarTodosCG/",
                type: "POST",
                headers:GlobalToken,
                data: datos,
                success:  function(data){
                    if (data.success) {
                        $('#tbl_HCG').DataTable().ajax.reload();
                        swal("Se ha eliminado los cortes generales", {
                            icon: "success",
                        }); 
                    }
                    loadingHide('btn_eliminarHI')
                },
                error: function(jqXHR, textStatus, errorThrown){
                    loadingHide('btn_eliminarHI')
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                }
             });
        }else{
            loadingHide('btn_eliminarHI')
        }
    });
}

function DelimitacionFechaHistorial(id) {
    let hoy = new Date();
    hoy.setDate(hoy.getDate() - 1)
    hoy = hoy.toISOString().split("T")[0];
    document.getElementById(id).setAttribute("max", hoy);
}

function consulta_fechasCF(op) {
    if (op == 0) {
        document.getElementById("cont_fechasCF").innerHTML = null;
    }
    if (op == 1) {
        document.getElementById("cont_fechasCF").innerHTML = "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-warning'></span> Día</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='día_CF' name='día_CF'>"+
    "</div>";
        DelimitacionFechaHistorial('día_CF')
    }
    if (op == 2) {
        document.getElementById("cont_fechasCF").innerHTML ="<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-success'></span> Inicio</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='Fecha_inicio_CF' name='Fecha_inicio_CF'>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-warning'></span> Fin</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='Fecha_fin_CF' name='Fecha_fin_CF'>"+
    "</div>";
        DelimitacionFechaHistorial('Fecha_inicio_CF')
        DelimitacionFechaHistorial('Fecha_fin_CF')
    }
}

function HistorialCF() {
    let validate = $("#form_HCF").valid()
  
    if (validate) {

        $('#tbl_HCF').DataTable().destroy();      
        let Farmacias =document.getElementById('Farmacias_CF').value;
        let consulta = document.getElementById('tipo_registro_CF').value;
        let datos;

        if (consulta == 0) {
            datos = {
                'Farmacias': Farmacias,
                'Consulta': consulta,
            }
        }
        if (consulta == 1) {
            let dia = document.getElementById('día_CF').value;
            datos = {
                'Farmacias': Farmacias,
                'Consulta': consulta,
                'Dia': dia
            }
        }
        if (consulta == 2) {
            let inicio =document.getElementById('Fecha_inicio_CF').value;
            let fin =document.getElementById('Fecha_fin_CF').value;
            datos = {
                'Farmacias': Farmacias,
                'Consulta': consulta,
                'Inicio':inicio,
                'Fin':fin
            }
        }
        Tbl_HCF(datos);
    }
    
}

function Eliminar_CF() {
    let farmacia = document.getElementById('Farmacias_CF');
    let nombre =farmacia.options[farmacia.selectedIndex].text;
    
    let consulta = document.getElementById('tipo_registro_CF').value;
   
    let mensaje;
    let datos;
    if (consulta == 0) {
        mensaje = "Se eliminaran todos los cortes existentes";
        datos = {
            'Farmacia': farmacia.value,
            'Consulta':consulta
        }
    }else{
        if (consulta == 1) {
            let dia = document.getElementById('día_CF').value;
            mensaje = "Se eliminará el corte del "+dia;
            datos = {
                'Farmacia': farmacia.value,
                'Consulta':consulta,
                'Dia':dia
            }
        } else {
            if (consulta == 2) {
                let inicio = document.getElementById('Fecha_inicio_CF').value;
                let fin = document.getElementById('Fecha_fin_CF').value;
                mensaje = "Se elimarán los cortes existentes entre "+inicio+" y "+fin
                datos = {
                    'Farmacia': farmacia.value,
                    'Consulta':consulta,
                    'Inicio':inicio,
                    'Fin': fin
                }
            }
        }
    }

    mensaje = mensaje+"\nAsí como sus ventas y detalles en relación";

    
    swal({
        title: "¿Seguro que desea eliminar los cortes de "+nombre+"?",
        text: mensaje,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url:"/EliminarCF",
                type: "POST",
                headers:GlobalToken,
                data: datos,
                success:  function(data){
                    $('#tbl_HCF').DataTable().ajax.reload();
                    swal("Se ha eliminado los cortes generales", {
                        icon: "success",
                    });       
                 
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                }
             });
        }
    });
}
/* Evento */
$('#switch-2').on('click', function() {
    ReinicioTBLVentas()

    let Consulta = document.getElementById('switch-2').checked;
    if (Consulta) {
    
        document.getElementById('cont_personalizada_CV').innerHTML = `
        <div class='input-group input-group-md mb-3'>
            <div class='input-group-prepend'>
                <span class='input-group-text' id='inputGroup-sizing-sm'>
                    <span class='fas fa-calendar-alt icon_r text-warning'></span>
                    Día
                </span>
            </div>
            <input type='date' class='form-control' id='día_CV' name='día_CV'>
        </div>`;
        DelimitacionFechaHistorial('día_CV');
    }else{
        document.getElementById('cont_personalizada_CV').innerHTML = null;
    }
});

function Consultar_HV() {
    let validate = $("#form_HV").valid();

    if (validate) {
        $('#Tbl_HV').DataTable().destroy();  
        let Farmacia = document.getElementById('Farmacias_ventas').value;
        let Consulta = document.getElementById('switch-2').checked;
        let request;
        if (Consulta) {
            request ={
                'Farmacia':Farmacia,
                'Consulta':Consulta,
                'Dia':document.getElementById('día_CV').value
            }
        } else {
            request ={
                'Farmacia':Farmacia,
                'Consulta':Consulta,
            }
        }
        Tbl_HV(request)
    }
    
}

function detalle_venta(id) {
    $.ajax({
        url:'/HistorialVD',
        type: "POST",
        headers:GlobalToken,
        data: {'Venta':id},
        success:  function(data){
            DesglosarVenta(data,id);
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
    
    $("#modal_detalles_venta").modal('show');
}
$('#Farmacias_ventas, #cont_personalizada_CV').on('change', function () {
    ReinicioTBLVentas()
});
function ReinicioTBLVentas() {
    document.getElementById('cont_btnCorte').innerHTML = null;
    if ($.fn.DataTable.isDataTable('#Tbl_HV')) {
        $('#Tbl_HV').DataTable().clear().draw();
    }
}   

$(document).on('click','#btnCorte',function(){
    loadingShow('btnCorte')
    let farmacia = $("#Farmacias_ventas option:selected").text();
    let fecha = $("#día_CV").val();
    let farmacia_id = document.getElementById('Farmacias_ventas').value;
    let datos={
        'Farmacia':farmacia_id,
        'Fecha': fecha
    }

    swal({
        title: farmacia,
        text: "Desea generar el corte del día "+fecha+" ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((GoCorte) => {
        if (GoCorte) {
            $.ajax({
                url:"/CorteHistorialFarmacia",
                type: "POST",
                headers:GlobalToken,
                data: datos,
                success:  function(data){
                    if (data.success) {
                        swal(data.message, {
                            icon: "success",
                        });
                    }
                    loadingHide('btnCorte');
                    return;
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                    loadingHide('btnCorte');
                }
             });
        }
        loadingHide('btnCorte');
    });
});
$('#form_NCG').on('submit',function(e) {
  
    e.preventDefault();
    let validate=$("#form_NCG").valid();
    if (validate) {
        loadingShow("btn_NCG");
        let datos = $("#form_NCG").serialize();
        $.ajax({
            url:"/NuevoCorteGeneral",
            type: "POST",
            headers:GlobalToken,
            data: datos,
            success:  function(data){
                if (data.success) {
                    swal(data.message, {
                        icon: "success",
                    });
                    return
                }
                swal(data.message,{
                    icon: "error",
                });
                document.getElementById('txt_fechaNCG').value = null;
                loadingHide('btn_NCG');
                return;
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                loadingHide('btn_NCG');
            }
         });
    } 
})

$('#btn_consultarPerdida').on('click',function(){
    loadingShow("btn_consultarPerdida");
    $('#HistorialPerdidas').DataTable().destroy();  
    Tbl_perdidas();
});
function CalculoGrafica(PerdidasData) {
    let corteTotal = 0;
    let utilidadTotal = 0;
    let inversionTotal = 0;
    let perdidas = 0;

    _dataCorteGeneral.forEach(c => {
        corteTotal = corteTotal + c.Total;
        inversionTotal = inversionTotal + c.Inversion;
    });

    utilidadTotal = corteTotal - inversionTotal;
  
    PerdidasData.forEach(p => {
        perdidas = perdidas + p.perdida_total;
    });
    if (perdidas > utilidadTotal) {
        utilidadTotal = 0;
    }else{
        utilidadTotal = utilidadTotal - perdidas;
    }
    

    _Porcentaje_inversion =  parseFloat((inversionTotal * 100) / corteTotal).toFixed(2)
    _Procentaje_utilidad = parseFloat((utilidadTotal * 100) / corteTotal).toFixed(2)
    _Porcentaje_perdida = parseFloat((perdidas * 100) / corteTotal).toFixed(2)

    _CorteTotal = parseFloat(corteTotal).toFixed(2)
    _UtilidadTotal = parseFloat(utilidadTotal).toFixed(2)
    _PerdidaTotal = parseFloat(perdidas).toFixed(2)
    _InversionTotal = parseFloat(inversionTotal).toFixed(2)

    $('#modal_grafica').modal('show');
    loadingHide("btn_graficar");
}

$('#btn_graficar').on('click',function(){
    
    if ($.fn.dataTable.isDataTable('#tbl_HCG')) {
        loadingShow("btn_graficar")
        let op = document.getElementById("switch-1").checked
        let fecha_inicio;
        let fecha_fin;
        if (op) {
            fecha_inicio = document.getElementById('Fecha_inicio_CG').value;
            fecha_fin = document.getElementById('Fecha_fin_CG').value;
        }

        datos = {
            Busqueda : op,
            Fecha_inicio : fecha_inicio,
            fecha_fin : fecha_fin
        }
        $.ajax({
            url:"/ConsultaPerdidas",
            type: "POST",
            headers:GlobalToken,
            data: datos,
            success:  function(data){
                if (data.success) {
                    CalculoGrafica(data.Perdidas)
                }
                loadingHide("btn_graficar");
            },
            error: function(jqXHR, textStatus, errorThrown){
                loadingHide("btn_graficar");
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
            }
        });
    }else{
        swal("Sin información","Primero realiza una consulta al historial de cortes generales para poder graficar",{
            icon: "info",
        });
    } 
});
function crearGrafica(){
    if (document.getElementById("switch-1").checked) {
        let inicio = document.getElementById('Fecha_inicio_CG').value;
        let fin = document.getElementById('Fecha_fin_CG').value;

        document.getElementById('info_grafica').innerHTML=`<p>La información considerada (Inversión, Utilidad, Pérdida) en la grafica es del periodo:</p>
        <p><b>Del ${inicio} al ${fin}</b></p>`
    }else{
        document.getElementById('info_grafica').innerHTML='Se ha considerado <b>toda la información</b> (Inversión, Utilidad, Pérdida) registrada en la base de datos'
    }

    let tbl = document.getElementById('tbl_grafica')
    //Corte total
    tbl.rows[0].cells[1].innerText="$"+_CorteTotal;

    //Inversion total
    tbl.rows[1].cells[1].innerText="$"+_InversionTotal;
    tbl.rows[1].cells[2].innerText=_Porcentaje_inversion+"%";

    //Perdida total
    tbl.rows[2].cells[1].innerText="$"+_PerdidaTotal;
    tbl.rows[2].cells[2].innerText=_Porcentaje_perdida+"%";

    tbl.rows[3].cells[1].innerText="$"+_UtilidadTotal;
    tbl.rows[3].cells[2].innerText=_Procentaje_utilidad+"%";
    // [ pie-chart ] start
        let bar = document.getElementById("chart-pie-1").getContext('2d');
        let color_inversion = bar.createLinearGradient(100, 0, 300, 0);
        color_inversion.addColorStop(0, 'rgba(0, 123, 255, 1)');
        color_inversion.addColorStop(1, 'rgba(0, 123, 255, 1)');

        let color_utilidad = bar.createLinearGradient(100, 0, 300, 0);
        color_utilidad.addColorStop(0, 'rgba(40, 167, 69, 1)');
        color_utilidad.addColorStop(1, 'rgba(40, 167, 69, 1)');

        let color_perdida = bar.createLinearGradient(100, 0, 300, 0);
        color_perdida.addColorStop(0, 'rgba(220, 53, 69, 1)');
        color_perdida.addColorStop(1, 'rgba(220, 53, 69, 1)');
    
        let data4 = {
        labels: [
            "Inversión",
            "Utilidad",
            "Pérdida"
        ],
        datasets: [{
            data: [
                _Porcentaje_inversion,
                _Procentaje_utilidad,
                _Porcentaje_perdida
            ],
            backgroundColor: [
                color_inversion,
                color_utilidad,
                color_perdida
            ],
            hoverBackgroundColor: [
                color_inversion,
                color_utilidad,
                color_perdida
            ]
        }]
        };
        myPieChart = new Chart(bar, {
        type: 'pie',
        data: data4,
        responsive: true,
        options: {
            maintainAspectRatio: false,
        }
        });
}

$('#modal_grafica').on('shown.bs.modal', function () {
    crearGrafica();
});

$("#modal_grafica").on("hidden.bs.modal", function () {
    myPieChart.destroy();
    let tbl = document.getElementById('tbl_grafica')
    //Corte total
    tbl.rows[0].cells[1].innerText=null;

    //Inversion total
    tbl.rows[1].cells[1].innerText=null;
    tbl.rows[1].cells[2].innerText=null;

    //Perdida total
    tbl.rows[2].cells[1].innerText=null;
    tbl.rows[2].cells[2].innerText=null;

    tbl.rows[3].cells[1].innerText=null;
    tbl.rows[3].cells[2].innerText=null;
     _CorteTotal = 0;
     _UtilidadTotal = 0;
     _PerdidaTotal = 0;
     _InversionTotal = 0;

     _Porcentaje_inversion = 0;
     _Procentaje_utilidad = 0;
     _Porcentaje_perdida = 0;
});