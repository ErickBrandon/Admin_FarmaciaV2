var _Entradas;
$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_Entradas').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay Entradas",
            "info": "_END_ de _TOTAL_ Entradas",
            "infoEmpty": "No se encuentran Entradas",
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
            'url':'/tbl_entradas',
            'type':'POST',
            'dataSrc':function (data) {
                _Entradas=data.data
                return _Entradas;
            }
        },
        'columns':[
            {data:'Farmacia'},
            {data:'Fecha_entrada'},
            {data:'Fecha_entrada'},
            {data:'Hora_entrada'},
        ],
    });
} );