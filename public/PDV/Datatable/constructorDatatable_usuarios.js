$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_Usuarios').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Usuarios",
            "infoEmpty": "No existe el usuario",
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
            "previous": "<span class='feather icon-chevron-left'>",
            "searchPlaceholder": "Search records"
            
            }
        },
        lengthMenu: [30],
        bLengthChange : false,
        'ajax':{
            'url':'Usuarios',
            'type': 'POST',
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['ID'] );
            $(row).attr('class', "c-"+data['Codigo'] );
            $(row).attr('ID_Proveedor',data['proveedor_id'] );
        },
        'columns':[
            {data:'Codigo'},
            {data:'Producto'},
            {data:'Precio'},
            {data:'Existencias'},
            {data:'TipoVenta'},
            {data:'Caducidad',
            "createdCell":
            function (cells,data){
                console.log("www");
             validacionCaducidad(cells,data);
            }},
            {data:'Finalidad'},
            {data:'Costo'},
            {data:'CostoAnterior'},
            {data:'Proveedor'},
            {data:"ID",
            "render": function (data) {
                return "<button class='btn btn-primary btn-icon btn-icon fas fa-edit' data-toggle='modal' data-target='#modal_almacen' onclick='form_editar("+data+")'></button>"
                +"<button class='btn btn-danger btn-icon fas fa-trash-alt' data-toggle='modal' data-target='#modal_almacen' onclick='form_eliminar("+data+")'></button>";
              }
            },

        ],
        'columnDefs':[
            {"orderable":false, "targets":0},
            {"orderable":false, "targets":3},
            {"orderable":false, "targets":5},
            {"orderable":false, "targets":8},
           // {"orderable":false, "targets":10, "visible":false,"searchable":false},
            {"orderable":false, "targets":10},

        ]
    },
   );
} );
