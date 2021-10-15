var btnEnviar = document.getElementById("btnEnviar");
btnEnviar === null || btnEnviar === void 0 ? void 0 : btnEnviar.addEventListener("click", function (e) { return frmEmpleadoSubmit(e); });
function frmEmpleadoSubmit(event) {
    event.preventDefault();
    var Valido = AdministrarValidaciones();
    if (Valido) {
        var form = document.getElementById("frmEmpleado");
        if (form != null) {
            form.submit();
        }
    }
    else {
        //COMENTADO POR LA PARTE 4 DEL TP
        // let errorMessage = "Los siguientes campos están vacíos o los valores ingresados no son válidos:"
        // errorArray.forEach(element => {
        //     errorMessage = errorMessage.concat('\n', '- ', element);
        // });
        // alert(errorMessage);
    }
}
