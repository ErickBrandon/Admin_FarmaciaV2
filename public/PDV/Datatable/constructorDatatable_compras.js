$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_Facturas').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Facturas",
            "infoEmpty": "No hay información",
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
            'url':'/Facturas',
           'type': 'POST',
        },
        "createdRow": function( row, data) {
            $(row).attr('id', "Fac-"+data['ID'] );
        },
        'columns':[
            {data:'ID'},
            {data:'Fecha_registro'},
            {data:'Nombre'},
            {data:'TotalCompra'},
            {render:function (a,b,row) {
                        return btn_detalles(row);
                    }
            },
            {data:'Total_productos'},
            {data:'Total_asignados'},
            {data:'ID',
                "render": function (data) {
                    return "<button class='btn btn-dark btn-icon' onclick=asignaciones("+data+")>"+
                                "<i class='fas fa-dolly'></i>"+
                           "</button>"
            }},
            {render:function (a,b,row) {
                        return btn_eliminar(row);
                    }
            }
        ],
    },
   );
});

function btn_detalles(data) {
    let btn = "";
    if (data.Total_asignados == 0) {
        btn = "<button class='btn btn-info btn-icon' onclick=detalleFactura("+data.ID+")>"+
                "<i class='fas fa-clipboard-list'></i>"+
              "</button>"
    }else{
      btn = "<button class='btn btn-info btn-icon' disabled>"+
                "<i class='fas fa-clipboard-list'></i>"+
            "</button>"
    }
    
    return btn;
}

function btn_eliminar(data){
    let btn = "";
    if (data.Total_productos == data.Total_asignados) {
        btn = "<button class='btn btn-danger btn-icon' onclick=EliminarFactura("+data.ID+")>"+
                    "<i class='fas fa-trash-alt'></i>"+
              "</button>";
    } else {
        btn = "<button class='btn btn-danger btn-icon' disabled>"+
                    "<i class='fas fa-trash-alt'></i>"+
              "</button>";
    }
    return btn;
}

/* function Format(data) {
    if (data == null) {
        return "$ ---.--";    
    }else{
        return "$ "+parseFloat(data).toFixed(2);
    }
}

function Tbl_HCG(op) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_HCG').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Registros",
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
            'url':'/HistorialCG',
           'type': 'POST',
           'data':op
        },
        "createdRow": function( row, data) {
            $(row).attr('class', "cg-"+data['id'] );
        },
        'columns':[
            {data:'Fecha'},
            {data:'Total',
             render: function(data){
                return Format(data);
             }
            },
            {
                render:function(a,b,row) {
                    return Format((row.Total - row.Inversion));   
                 }
            },
            {data:'Inversion',
             render:function(data){
                return Format(data);
             }
            },
            {data:'id',
             render:function(data){
                return "<button class='btn btn-danger btn-icon fas fa-trash-alt' onclick='EliminarCG("+data+")'></button>";
             }
            }
        ],
    },
   );
}

function Tbl_HCF(datos) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_HCF').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Registros",
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
        "order": [[ 0, "desc" ]],
        lengthMenu: [30],
        bLengthChange : false,
        'ajax':{
            'url':'/HistorialCF',
           'type': 'POST',
           'data':datos
        },
        "createdRow": function( row, data) {
            $(row).attr('id', "CHF-"+data['id'] );
        },
        'columns':[
            {data:'id'},
            {data:'Fecha'},
            {data:'Farmacia'},
            {data:'TotalCorte',
             render: function(data){
                return Format(data);
             }
            },
            {
             render:function(a,b,row) {
                return Format((row.TotalCorte - row.InversionXcorte));   
             }
            },
            {data:'InversionXcorte',
             render:function(data){
                return Format(data);
             }
            }
        ],
        'columnDefs':[
            {"targets":0, "visible":false,"searchable":false}
        ]
    },
   );
}

function Tbl_HV(datos) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#Tbl_HV').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Registros",
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
        "order": [[ 0, "desc" ]],
        lengthMenu: [30],
        bLengthChange : false,
        'ajax':{
            'url':'/HistorialV',
           'type': 'POST',
           'data':datos
        },
        "createdRow": function( row, data) {
            $(row).attr('id', "CHF-"+data['id'] );
        },
        'columns':[
            {data:'Fecha'},
            {data:'Total',
             render: function(data){
                return Format(data);
             }
            },
            {
                render:function(a,b,row) {
                   return Format((row.Total - row.Inversion_Venta));   
                }
            },
            {data:'Inversion_Venta',
             render: function(data){
                return Format(data);
             }
            },
            {data:'id',
             render:function(data){
                return "<button class='btn btn-primary btn-icon fas fa-eye' onclick='detalle_venta("+data+")'></button>";
             }
            }
        ],
    },
   );
} */