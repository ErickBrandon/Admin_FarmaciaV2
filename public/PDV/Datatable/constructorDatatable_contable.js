$(document).ready(function() {
    console.log("inicia");
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_contable').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Farmacias",
            "infoEmpty": "No existe información",
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
            'url':'/tblCortes',
           'type': 'POST',
        },
        "createdRow": function( row, data) {
            $(row).attr('id', "F-"+data['id'] );
        },
        'columns':[
            {data:'Farmacia'},
            {
             data:'TotalCorte',
             render: function(data){
                return "$"+parseFloat(data).toFixed(2);
             }
            }
        ],
    },
   );
} );