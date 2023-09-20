$('#btn_EliminarHistorial').on('click',function(){
    swal({
        title: "¿Seguro que desea eliminar el historial de entradas?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url:"/EliminarHistorialEntradas",
                type: "POST",
                headers:GlobalToken,
                data:true,
                success:  function(data){
                    if (data.success) {
                        $('#tbl_Entradas').DataTable().ajax.reload();
                        swal(data.message, {
                            icon: "success",
                        }); 
                    } else {
                        swal(data.message, {
                            icon: "error",
                        });
                    }     
                 
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                }
             });
        }
    });
})