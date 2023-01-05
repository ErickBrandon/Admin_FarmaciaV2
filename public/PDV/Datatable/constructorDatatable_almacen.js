$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#tbl_almacen').DataTable({
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
            "previous": "<span class='feather icon-chevron-left'>",
            "searchPlaceholder": "Search records"
            
            }
        },
        lengthMenu: [30],
        bLengthChange : false,
        'ajax':{
            'url':'/PuntoDeVenta/ProductoEnAlmacen',
            'type': 'POST',
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['id'] );
          },
        'columns':[
            {data:'id'},
            {data:'Producto'},
            {data:'Precio'},
            {data:'Existencias'},
            {data:'TipoVenta'},
            {data:'Caducidad',
            "createdCell":
            function (cells,data){
             validacionCaducidad(cells,data);
            }},
            {data:'Finalidad'},
            {data:'Costo'},
            {data:'CostoAnterior'},
            {data:'id_proveedor'},
            {data:"id",
            "render": function (data) {
                return "<button class='btn btn-primary btn-icon fas fa-edit' data-toggle='modal' data-target='#modal_almacen' onclick='form_editar("+data+")'></button>"
                +"<button class='btn btn-danger btn-icon fas fa-trash-alt' data-toggle='modal' data-target='#modal_almacen' onclick='form_eliminar("+data+")'></button>";
              }
            },

        ],
    },
   );
} );

function validacionCaducidad(cells,data) {
  let caducidad = new Date(data)
  caducidad = (caducidad.getDate()+1)+"/"+(caducidad.getMonth()+1) +"/"+caducidad.getFullYear();
  let hoy = new Date()
  hoy = hoy.getDate()+"/"+(hoy.getMonth()+1) +"/"+hoy.getFullYear();


 var aFecha1 = hoy.split('/');
 var aFecha2 = caducidad.split('/');
 var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
 var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
 var dif = fFecha2 - fFecha1;
 var dias = Math.floor(dif / (1000 * 60 * 60 * 24));

 if (dias<0) {
  $(cells).attr('class',"Caduco");
 }else{
  if (dias >=0 && dias<=20) {
    $(cells).attr('class',"ProximoAcudar")
  }
 }
 console.log(dias);
 
}