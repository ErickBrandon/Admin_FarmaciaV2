//
$("#btn_Logout").on("click", function () {
    swal({
        title: "¿Desea cerrar su sesión?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((logout) => {
        if (logout) {
            $.ajax({
                url:'/logout',
                type: "POST",
                headers:GlobalToken,
                data:true,
                success:  function(payload){
                    $(location).attr('href',payload);
                }
            });
        }
    });
});
function loadingShow(id){
    document.getElementById(id).disabled =true;
    let loading =document.createElement('span')
    $(loading).attr('class', "spinner-border spinner-border-sm");
    $(loading).attr('id', "load_btn");
    document.getElementById(id).appendChild(loading)
}

function loadingHide(id){
    $("#load_btn").remove();
    document.getElementById(id).disabled =false;
}