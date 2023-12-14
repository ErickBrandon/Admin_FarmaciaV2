const lenguaje ={
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
    "previous": "<span class='feather icon-chevron-left'>",
    "searchPlaceholder": "Search records"
    
    }
}
$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_almacen').DataTable({
        language:lenguaje ,
        lengthMenu: [30],
        bLengthChange : false,
        'ajax':{
            'url':'ProductoEnAlmacen',
            'type': 'POST',
             'dataSrc':function (data) {
                _productosAlmacen=data.data
                return _productosAlmacen;
            } 
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['ID'] );
            $(row).attr('class', "c-"+data['Codigo'] );
        },
        'columns':[
            {data:'Codigo'},
            {data:'Producto'},
            {data:'Precio',
                'createdCell':function(cells,data){
                    cells.innerText ="$ "+parseFloat(data).toFixed(2);
                }
            },
            {data:'Existencias'},
            {data:'TipoVenta'},
            {data:'Caducidad',
                "createdCell": //// solo se ejecuta una vez en la renderización
                function (cells,data){
                    validacionCaducidad(cells,data);
                }
            },
            {data:'Costo',
                'createdCell':function(cells,data){
                    cells.innerText ="$ "+parseFloat(data).toFixed(2);
                }
            },
            {data:'Piezas_unidad'},
            {data:"Ultima_asignacion"},
            {data:"ID",
               
                render:function (data,a,b,) {
                
                    if (b.TipoVenta.includes("CAJA")) {
                        return `<button id='btn_modalCambioTV' class='btn btn-info btn-icon' onclick=CambioTipoVenta(${data})>
                            <i class='fas fa-capsules'></i>
                        </button>`
                    }
                    return "";
                
                }
            },
            {data:'ID',
            render:function (data,a,b,) {
                
                if (b.TipoVenta.includes("PIEZA")) {
                
                    return `<button id='btn_PzCaja' class='btn btn-light btn-icon text-primary' producto =${data}>
                        <i class='fas fa-box'></i>
                    </button>`;
                }
                return "";
            
            },
            },
            {data:"btn"},
            {data:"ID",
            
                render:function(data,a,b){
                    if(b.Existencias > 0){
                        return `<button id='btn_modalPerdidas' class='btn btn-danger btn-icon' onclick=perdidasProductos(${data})>
                                    <i class='fas fa-window-close'></i>
                                </button>`;
                    }
                    return "";
                    
                }

            },
            {data:'ID',
                render:function(data){
                    return `<button id='btn_modalAjustes' class='btn btn-dark btn-icon' producto = '${data}'>
                                    <i class='fas fa-cogs'></i>
                                </button>`;
                }

            }

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

function validacionCaducidad(cells,data) {
   
    if (data != '0000-00-00') {
        let caducidad = new Date(data)
        caducidad = (caducidad.getDate()+1)+"/"+(caducidad.getMonth()+1) +"/"+caducidad.getFullYear();
        let hoy = new Date()
        hoy = hoy.getDate()+"/"+(hoy.getMonth()+1) +"/"+hoy.getFullYear();


        let aFecha1 = hoy.split('/');
        let aFecha2 = caducidad.split('/');
        let fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
        let fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
        let dif = fFecha2 - fFecha1;
        let dias = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (dias<0) {
            $(cells).attr('class',"Caduco");
        }
        if (dias >=0 && dias<=20) {
            $(cells).attr('class',"ProximoAcudar");
        }
    }else{
        $(cells).text('Sin fecha');
    }
  
}

function btnRegreso(cells,data) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info btn-icon fas fa-cloud-upload-alt'
    cells.appendChild(btn);
    cells.innerHTML = "<button class='btn btn-info btn-icon fas fa-cloud-upload-alt'></button>"
}

function Tbl_historialTraspaso(data){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#Tbl_historialTraspaso').DataTable({
        language:lenguaje ,
        lengthMenu: [15],
        bLengthChange : false,
        'ajax':{
            'url':'Tbl_historialTraspaso',
            'type': 'POST',
            'data':data
        },
        'columns':[
            {data:'Farmacia'},
            {data:'Codigo'},
            {data:'Producto'},
            {data:'Cajas'},
            {data:'Fecha_traspaso'}
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
}