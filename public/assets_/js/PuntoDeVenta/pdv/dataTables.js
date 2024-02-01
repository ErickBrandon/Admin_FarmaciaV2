$(document).ready(function() {
   
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_Productos').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Productos",
            "infoEmpty": "No existe el producto",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "<span class='fas fa-search'></span> Ingrese Producto | Código de barras ",
            "zeroRecords": "No hay concidencias",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "<span class='feather icon-chevron-right'>",
            "previous": "<span class='feather icon-chevron-left'>"
            }
        },
        lengthMenu: [20],
        bLengthChange : false,
        'ajax':{
            'url':'/ProductosVenta/'+document.getElementById("PntVenta").getAttribute('farmID'),
            'type': 'POST',
            'dataSrc':function (data) {
                 _ProductosVenta=data.data
                return _ProductosVenta;
            } 
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['id'] );
            $(row).attr('class', "c-"+data['Codigo'] );
        },
        'columns':[
            {data:"id",
                "render":function () {
                return "";
            }},
            {data:'Codigo'},
            {data:'Producto'},
            {data:'Precio',
                "render": function (data) {
                    return "$ "+parseFloat(data).toFixed(2);
                }
            },
            {data:"id",
            "render": function (data) {
                return "<button class='btn btn-primary btn-icon fas fa-cart-arrow-down' onclick=carrito("+data+")></button>"
              }
            },
            {data:'TipoVenta',
            "render": function (data) {
                return formatoTipoVenta(data);
              }
            },
            {data:'Existencias'},
        ],
        columnDefs:[
            {"orderable":false, "targets":1},
            {"orderable":false, "targets":4},
            {"orderable":false, "targets":6},
        ]
    });
} );

function formatoTipoVenta(data) {
    let info;
    if (data == "CAJA") {
        info ="<span class='text-white label bg-c-blue f-12'><b>"+data+"</b></span>"
    }else{
        info="<span class='text-white label theme-bg2 f-12'><b>"+data+"</b></span>"
    }
    return info
}