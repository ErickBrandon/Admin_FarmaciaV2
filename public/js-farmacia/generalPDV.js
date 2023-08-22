$(document).ready(function() {

    setInterval(CheckInternet, 1000*5);
});

function CheckInternet() {
    if (navigator.onLine) {
        document.getElementById('Internet').innerText = "En linea";
        $("#Internet").removeClass("btn-danger");
        $("#Internet").addClass("btn-success");
    } else {
        $("#Internet").removeClass("btn-success");
        $("#Internet").addClass("btn-danger");
        document.getElementById('Internet').innerText = "Desconectado";
    }
}