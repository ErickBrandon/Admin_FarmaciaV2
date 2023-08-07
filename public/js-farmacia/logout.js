//const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
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
