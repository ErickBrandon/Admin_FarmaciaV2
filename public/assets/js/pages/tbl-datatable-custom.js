$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_proveedor').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay proveedores",
            "info": "_END_ de _TOTAL_ Proveedores",
            "infoEmpty": "No se encuentra el proveedor",
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
            'url':'TblProveedores',
            'type':'POST',
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['id'] );
          },
        'columns':[
            {data:'Nombre'},
            {data:'Direccion'},
            {data:'Telefono'},
            {data:'id',
            "render": function (data, type, row) {      
                return "<button class='btn btn-icon btn-info' data-toggle='modal' data-target='#modal_proveedores' onclick='form_editar("+ data +")'><span class='feather icon-settings'></span></button>"
               +"<button class='btn btn-icon btn-danger' data-toggle='modal' data-target='#modal_proveedores' onclick='form_borrar("+ data +")'><span class='feather icon-trash-2'></span></button>";
            }
        }
        ],
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
        },
        "createdRow": function(row, data){
            $(row).attr('id', data['id']);
        },
        'columns':[
            {data:'id'},
            {data:'Farmacia'},
            {data:'Encargado'},
            {data:'id',
            'render': function(data){
                return "<button class='btn btn-icon btn-info' data-toggle='modal' data-target='#modal_farmacias' onclick='form_editar("+ data +")'><span class='feather icon-settings'></span></button>";
            }
        }
        ],
    });
} );