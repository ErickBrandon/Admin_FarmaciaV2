var _usuarios;
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
            'url':'TblUsuarios',
            'type': 'POST',
             'dataSrc':function (data) {
                _usuarios=data.data
                return _usuarios;
            } 
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['id'] );
        },
        'columns':[
            {data:'name'},
            {data:'email'},
            {data:'rol'},
            {data:'id',
                render:function(data){
                    return "<button class='btn btn-primary btn-icon ' onclick='editarUsuario("+data+")'><i class='fas fa-user-edit'></i></button>";
                }
            },
            {data:'id',
                render:function(data){
                    return "<button class='btn btn-danger btn-icon ' onclick='eliminarUsuario("+data+")'><i class='fas fa-trash-alt'></i></button>";
                }
            },
           

        ],
        'columnDefs':[
    
           /*  {"orderable":false, "targets":0},
            {"orderable":false, "targets":3},
            {"orderable":false, "targets":5},
            {"orderable":false, "targets":8}, */
           // {"orderable":false, "targets":10, "visible":false,"searchable":false},
           /*  {"orderable":false, "targets":10},
 */
        ]
    },
   );
} );