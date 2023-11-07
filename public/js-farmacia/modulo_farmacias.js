// --------- Variables Globales

const GlobalErrorCRUD ="Soluciones:\n"
+"1) Intente de nuevo Guardar el registro\n"
+"2) Recargue la página e intente de nuevo guardar el registro\n"
+"3) Compruebe su conexión a Internet e intente de nuevo - si no hay conexión, comuniquese con el Administrador y con el Proveedor del servicio\n"
+"4) ¡Si hay conexión a internet! y los problemas persisten comuniquese con el Administrador y con el Desarrollador del sistema";
// --------- -----------------
var _FarmaciaEnJuego=[];

$("#modal_farmacias").on("hidden.bs.modal", function () {
    _FarmaciaEnJuego=[]
    document.getElementById('tituloModalFarmacia').innerText='';
    document.getElementById('btn_form_farmacias').innerText='';

    document.getElementById('Farmacia').value='';
    document.getElementById('Llave').value=null;
    document.getElementById('Calle_Numero').value=null;
    document.getElementById('Colonia').value=null;
    document.getElementById('Llave').value=null;
    document.getElementById('Vendedor').value='';

    let validate = $("#form_farmacias").validate();
    validate.resetForm();
});
$('#btn_verLlave').on('click', function() {
   let tipo = $("#Llave").attr("type")
  
   if (tipo == "password") {
        $("#Llave").attr("type",'text');
        $("#btn_verLlave i").attr("class",'fas fa-eye');
   }else{
        $("#Llave").attr("type",'password')
        $("#btn_verLlave i").attr("class",'fas fa-eye-slash');

   }
});
$('#btn_nuevaFarmacia').on('click', function() {
   $('#tituloModalFarmacia').text('Nueva Farmacia');
   document.getElementById('btn_form_farmacias').innerText='Guardar';
   $("#modal_farmacias").modal('show');
});
function form_editar(id) {
    _FarmaciaEnJuego = _Farmacias.find(f=> f.ID == id);
    document.getElementById('tituloModalFarmacia').innerText=_FarmaciaEnJuego.Farmacia;
    document.getElementById('btn_form_farmacias').innerText='Actualizar';

    document.getElementById('Farmacia').value=_FarmaciaEnJuego.Farmacia;
    document.getElementById('Calle_Numero').value=_FarmaciaEnJuego.direccion;
    document.getElementById('Colonia').value=_FarmaciaEnJuego.colonia;
    document.getElementById('Llave').value=_FarmaciaEnJuego.Llave;
    document.getElementById('Vendedor').value=_FarmaciaEnJuego.user_id;
    console.log(_FarmaciaEnJuego);
    $("#modal_farmacias").modal('show');
}
$('#btn_form_farmacias').on('click', function() {
    
    let text;
    let url;
    let llaveActualizada = false;
    let validate = $("#form_farmacias").valid();
    if (validate) {
        if (_FarmaciaEnJuego.length == 0) {
       

            text ="Se ha creado una farmacia";
            url ='GuardarFarmacia';
            create_update(url,text,llaveActualizada);
        }else{
        

            text ="Se ha actualizado la farmacia";
            url ='ActualizarFarmacia/'+_FarmaciaEnJuego.ID;
            if (document.getElementById('Llave').value != _FarmaciaEnJuego.Llave) {
                swal({
                    title: "¡Se ha detectado un cambio de Llave en la farmacia!",
                    text: "En la farmacia: "+_FarmaciaEnJuego.Farmacia+"\n¿Seguro que desea continuar?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((op) => {
                    if (op) {
                        llaveActualizada = true;
                        create_update(url,text,llaveActualizada);
                    }else{
                        document.getElementById('Llave').value = _FarmaciaEnJuego.Llave
                    }
                });
            }else{
                create_update(url,text,llaveActualizada);
            }
        }
    }
});
function create_update(url,text,llaveActualizada) {
    let formData = $("#form_farmacias").serialize();
   
        $.ajax({
            url:url,
            type: "POST",
            headers:GlobalToken,
            data: formData,
            success:  function(data){
                if (data) {
                    $('#tbl_farmacia').DataTable().ajax.reload();
                    swal(text,
                            {icon:"success"}
                        ).then(()=>{
                            if (llaveActualizada) {
                                swal('Recuerda cambiar el codigo en la farmacia fisica para que el vendedor pueda entrar al punto de venta',{icon:"info"});
                            }
                        });
                    $("#modal_farmacias").modal('hide');   
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("¡Error al ejecutar!\n"+GlobalErrorCRUD);
                document.getElementById('btn_form_farmacias').disabled = false;
            }
         });
}