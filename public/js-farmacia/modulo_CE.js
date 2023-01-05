function ver_h(){
    document.getElementById('btn_MH').innerHTML=null
    document.getElementById('tituloMH').innerText="Tepanco"
    document.getElementById('body_MH').innerHTML=" <p class='text-center'>Fecha: <span>dd/mm/aaa</span> | Hora: <span>00:00</span></p>"
   
}
function eliminar_h(){
    document.getElementById('tituloMH').innerText="Tepanco"
    document.getElementById('body_MH').innerHTML="<div class='alert alert-danger' role='alert'>"+
    "¿Estas seguro que desea eliminar el historial del control de entrada de la farmacia?"+
"</div>";
    document.getElementById('btn_MH').innerHTML="<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancelar</button>"+
    "<button type='button' class='btn btn-danger fas fa-trash-alt' data-dismiss='modal'></button>"

}