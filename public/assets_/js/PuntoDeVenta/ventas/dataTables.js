$(document).ready(function() {
   
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_ventas').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ ventas",
            "infoEmpty": "No se encuentra la venta",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "<span class='fas fa-search'></span> Ingrese el Id de la venta",
            "zeroRecords": "No hay concidencias",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "<span class='feather icon-chevron-right'>",
            "previous": "<span class='feather icon-chevron-left'>"
            }
        },
        lengthMenu: [10],
        bLengthChange : false,
        'ajax':{
            'url':'TblVentas',
            'type': 'POST',
            /* 'dataSrc':function (data) {
                 _ProductosVenta=data.data
                return _ProductosVenta;
            }  */
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['id'] );
        },
        'columns':[
            {data:"id"},
            {data:'Total',
                render: function(data){
                    return "$"+parseFloat(data).toFixed(2);
                }
            },
            {data:'Fecha'},
            {data:"id",
                render:function(data){
                    return `<button id='detalle_${data}' class='btn btn-info btn-icon' onclick='VerDetalle(${data},this)'>
                                <i class='fas fa-list'></i>
                            </button>`
                }
            }
        ],
        columnDefs:[
           /*  {"orderable":false, "targets":1},
            {"orderable":false, "targets":4},
            {"orderable":false, "targets":6}, */
        ]
    });
});