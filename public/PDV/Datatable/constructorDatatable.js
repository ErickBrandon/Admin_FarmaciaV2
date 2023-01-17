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
            "search": "<span class='feather icon-search'></span>",
            "zeroRecords": "No hay concidencias",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "<span class='feather icon-chevron-right'>",
            "previous": "<span class='feather icon-chevron-left'>"
            }
        },
        lengthMenu: [6],
        bLengthChange : false,
        'ajax':{
            'url':'/ProductosVenta/'+document.getElementById("PntVenta").getAttribute('farmID'),
            'type': 'POST',
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
            {data:"id",
            "render": function (data) {
                return "<button class='btn btn-primary fas fa-cart-arrow-down' onclick=carrito("+data+")></button>"
              }
            },
            {data:'Codigo'},
            {data:'Producto'},
            {data:'Precio'},
            {data:'Finalidad'},
            {data:'Existencias'}
        ],
        columnDefs:[
            { "width": "1px", "targets": 0 },
            { "padding": "0 !important", "targets": 1 },
            {"orderable":false, "targets":0},
            {"orderable":false, "targets":1},
            {"orderable":false, "targets":6},
        ]
    });
} );