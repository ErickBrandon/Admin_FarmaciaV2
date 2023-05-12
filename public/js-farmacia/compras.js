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
var factura = [];
var total = 0.00;


function CreateRowFactura(tbl,codigo) {
    tbl.setAttribute('id',"row_"+codigo);
    tbl.insertCell(0).innerText = codigo;
    tbl.insertCell(1).innerHTML = "<div class='form-group'>"+
        "<input type='text' class='form-control' id='producto"+codigo+"' name='producto"+codigo+"' placeholder='Producto' aria-invalid='false'>"+
    "</div>";
    tbl.insertCell(2).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='costo"+codigo+"' name='costo"+codigo+"' value='0.00' oninput=calculo(1,"+codigo+",this.value)>"+
    "</div>";
    tbl.insertCell(3).innerHTML = "<div class='form-group'>"+
        "<input type='number' class='form-control' id='pz"+codigo+"' name='pz"+codigo+"' value='1'  oninput=calculo(2,"+codigo+",this.value)>"+
    "</div>";
    tbl.insertCell(4).innerText = "0.00";
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
           
            let tbl = document.getElementById('tbodyCompras').insertRow(factura.length);
            CreateRowFactura(tbl,codigo)
            console.log(Rules);
            factura.push({'Codigo':codigo,'Producto':'','Costo':0.00, 'Pz':1,'Sub':0});
            document.getElementById('Codigo_nuevo').value =null
        }else{
            notify();   
        }
    }
   
}
function calculo (op,codigo,valor){
    console.log(valor);
    let old_sub = 0;
    let nuevo_sub = 0;
    let rowFactura = document.getElementById('row_'+codigo);
    let piezas = document.getElementById('pz'+codigo).value;
    let costo = document.getElementById('costo'+codigo).value;

// condicion    true                false
   (op == 1) ? costo = valor : piezas = valor;

   nuevo_sub = costo * piezas;
   rowFactura.cells[4].innerText = nuevo_sub;

   factura.map(producto =>{
        if (producto.Codigo == codigo) {
            old_sub =producto.Sub

            producto.Pz = piezas;
            producto.Sub = nuevo_sub;
            producto.costo = costo
        }
   })

   total = total - old_sub;
   total = total + nuevo_sub;
   document.getElementById('total_factura').innerText = parseFloat(total).toFixed(2)
}
function eliminarRow(codigo) {
    let sub = 0;
    for (let i = 0; i < factura.length; i++) {
        if (factura[i].Codigo == codigo) {
            sub = factura[i].Sub;
            factura.splice(i,1);
            document.getElementById('row_'+codigo).remove();
            $("#producto"+codigo).rules('remove');
            $("#costo"+codigo).rules('remove');
            $("#pz"+codigo).rules('remove');
            break;
        }
    }
    total = total - sub;
   document.getElementById('total_factura').innerText = parseFloat(total).toFixed(2)
}
$('#btn_RFactura').on('click', function() {
   if (factura.length !=0) {
    let validate = $("#form_factura").valid()
    if (validate) {
        
    }
   }
    
});
