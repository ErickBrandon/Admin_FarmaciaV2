var _Farmacias;
$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_farmacia').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay Farmacias",
            "info": "_END_ de _TOTAL_ Farmacias",
            "infoEmpty": "No se encuentran Farmacias",
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
        paging: true,
        searching: true,
        'ajax':{
            'url':'TblFarmacia',
            'type':'POST',
            'dataSrc':function (data) {
                _Farmacias=data.data
                return _Farmacias;
            }
        },
        "createdRow": function(row, data){
            $(row).attr('ID', data['ID']);
        },
        'columns':[
            {data:'ID'},
            {data:'Farmacia'},
            {data:'Vendedor',
                defaultContent:"Sin asignar"
            },
            {defaultContent:"******"},
            {data:'ID',
            'render': function(data){
                return "<button class='btn btn-icon btn-info'  onclick='form_editar("+ data +")'><span class='fas fa-edit'></span></button>";
            }
        }
        ],
    });
} );