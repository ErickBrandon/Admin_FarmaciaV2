
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
    console.log("se ejecutó");
}

// --------- Variables Globales
    GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
    GlobalErrorCRUD ="Soluciones:\n"
    +"1) Intente de nuevo Guardar el registro\n"
    +"2) Recargue la página e intente de nuevo guardar el registro\n"
    +"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
    +"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
// ---------------------------
    
function Corte_General() {
    $.ajax({
        url:"/CorteGeneral",
        type: "POST",
        headers:GlobalToken,
        data: true,
        success:  function(data){       
           console.log(data);
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
function search_CG() {
    document.getElementById('borrar_HCG').innerHTML= null
    let op = document.getElementById("switch-1").checked
    console.log(op);
    if (op == true) {
        document.getElementById('cont_personalizada_CG').innerHTML ="<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-success'></span> Inicio</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='Fecha_inicio_CG' name='Fecha_inicio_CG'  onchange='cambio_rango()'>"+
    "</div>"+
    "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-warning'></span> Fin</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='Fecha_fin_CG' name='Fecha_fin_CG'  onchange='cambio_rango()'>"+
    "</div>";
    }else{
        document.getElementById('cont_personalizada_CG').innerHTML = "";
    }
}

function ConsutlarHistorialCG() {

    let isvalidate=$("#form_HCG").valid();
    if (isvalidate) {
        $('#tbl_HCG').DataTable().destroy();  
       
    let op = document.getElementById("switch-1").checked;
    console.log(op);
    let tipo_busqueda;
    if (op == false) {
        tipo_busqueda={'op':1}
        Tbl_HCG(tipo_busqueda);
        document.getElementById('borrar_HCG').innerHTML = "<button class='btn btn-danger btn-sm col-12' onclick='Eliminar_cortes_Generales(1)'>Eliminar todo el histórico</button>"
    }else{
        let inicio = document.getElementById('Fecha_inicio_CG').value;
        let fin = document.getElementById('Fecha_fin_CG').value;

        tipo_busqueda={
            'op':2,
            'inicio':inicio,
            'fin':fin
        }
        Tbl_HCG(tipo_busqueda);
        document.getElementById('borrar_HCG').innerHTML = "<button class='btn btn-danger btn-sm col-12' onclick='Eliminar_cortes_Generales(2)'>Eliminar todo entre <br>"+inicio+" y "+fin+"</button>"

    }
    }
    
     
}
function EliminarCG(id) {
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
   
}
function cambio_rango() {
    document.getElementById('borrar_HCG').innerHTML = null;
}

function Eliminar_cortes_Generales(op) {
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
                    $('#tbl_HCG').DataTable().ajax.reload();
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
$('#Farmacias_CF, #tipo_registro_CF').on('change', function() {
    document.getElementById("cont_btn_borrarCF").innerHTML = null
});

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

        if (Farmacias != 0) {
            document.getElementById("cont_btn_borrarCF").innerHTML = "<button class='btn btn-danger btn-sm col-12' onclick='Eliminar_CF()'>Eliminar registros consultados</button>"
        }

    }
    
}

function Eliminar_CF() {
    let farmacia = document.getElementById('Farmacias_CF');
    let nombre =farmacia.options[farmacia.selectedIndex].text;
    
    let consulta = document.getElementById('tipo_registro_CF').value;
    console.log(farmacia);
    console.log(farmacia.value);
    console.log(document.getElementById('Farmacias_CF').value);
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
    let Consulta = document.getElementById('switch-2').checked;
    if (Consulta) {
        document.getElementById('cont_personalizada_CV').innerHTML = "<div class='input-group input-group-md mb-3'>"+
        "<div class='input-group-prepend'>"+
            "<span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-warning'></span> Día</span>"+
        "</div>"+
        "<input type='date' class='form-control' id='día_CV' name='día_CV'>"+
    "</div>";
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
        url:'/HistorialVD/',
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