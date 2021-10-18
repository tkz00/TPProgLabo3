// var btnEnviar = document.getElementById("btnEnviar");
// btnEnviar?.addEventListener("click", (e:Event) => AdministrarValidaciones(e));
function AdministrarValidaciones() {
    var _a, _b, _c, _d;
    var Valido = true;
    var errorArray = [];
    if (!ValidarCamposVacios("numDni") || !ValidarRangoNumerico("numDni", 1000000, 55000000)) {
        console.log("Error en el DNI");
        errorArray.push("DNI");
        Valido = false;
        ManageAsteriskBeforeElement("numDni", true);
    }
    else {
        ManageAsteriskBeforeElement("numDni", false);
    }
    if (!ValidarCamposVacios("txtApellido")) {
        console.log("El apellido está vacío");
        errorArray.push("Apellido");
        Valido = false;
        ManageAsteriskBeforeElement("txtApellido", true);
    }
    else {
        ManageAsteriskBeforeElement("txtApellido", false);
    }
    if (!ValidarCamposVacios("txtNombre")) {
        console.log("El nombre está vacío");
        errorArray.push("Nombre");
        Valido = false;
        ManageAsteriskBeforeElement("txtNombre", true);
    }
    else {
        ManageAsteriskBeforeElement("txtNombre", false);
    }
    if (!ValidarCombo("cboSexo", "--")) {
        console.log("No se ha seleccionado sexo");
        errorArray.push("Sexo");
        Valido = false;
        ManageAsteriskBeforeElement("cboSexo", true);
    }
    else {
        ManageAsteriskBeforeElement("cboSexo", false);
    }
    if (!ValidarCamposVacios("numLegajo") || !ValidarRangoNumerico("numLegajo", 100, 550)) {
        console.log("Error en el legajo");
        errorArray.push("Legajo");
        Valido = false;
        ManageAsteriskBeforeElement("numLegajo", true);
    }
    else {
        ManageAsteriskBeforeElement("numLegajo", false);
    }
    if (!ValidarCamposVacios("numSueldo") || !ValidarRangoNumerico("numSueldo", 800, ObtenerSueldoMaximo(ObtenerRbSeleccionado("Turno")))) {
        console.log("Error en el sueldo");
        errorArray.push("Sueldo");
        Valido = false;
        ManageAsteriskBeforeElement("numSueldo", true);
    }
    else {
        ManageAsteriskBeforeElement("numSueldo", false);
    }
    if (!ValidarCamposVacios("Foto")) {
        console.log("Error en la foto");
        errorArray.push("Foto");
        Valido = false;
        ManageAsteriskBeforeElement("Foto", true);
    }
    else {
        ManageAsteriskBeforeElement("Foto", false);
    }
    if (ObtenerRbSeleccionado("Turno") == "") {
        console.log("Error en el turno");
        errorArray.push("Turno");
        Valido = false;
        if (((_a = document.getElementsByClassName("turnos")[0]) === null || _a === void 0 ? void 0 : _a.previousSibling).tagName != 'SPAN') {
            var newNode = document.createElement("span");
            newNode.style.color = "brown";
            newNode.appendChild(document.createTextNode("*"));
            (_b = document.getElementsByClassName("turnos")[0].parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(newNode, document.getElementsByClassName("turnos")[0]);
        }
    }
    else {
        if (((_c = document.getElementsByClassName("turnos")[0]) === null || _c === void 0 ? void 0 : _c.previousSibling).tagName == 'SPAN') {
            ((_d = document.getElementsByClassName("turnos")[0]) === null || _d === void 0 ? void 0 : _d.previousSibling).remove();
        }
    }
    return Valido;
    // if(Valido)
    // {
    //     let form = (<HTMLFormElement>document.getElementById("frmEmpleado"));
    //     if(form != null)
    //     {
    //         form.submit();
    //     }
    // }
    // else
    // {
    //     //COMENTADO POR LA PARTE 4 DEL TP
    //     // let errorMessage = "Los siguientes campos están vacíos o los valores ingresados no son válidos:"
    //     // errorArray.forEach(element => {
    //     //     errorMessage = errorMessage.concat('\n', '- ', element);
    //     // });
    //     // alert(errorMessage);
    // }
}
function ValidarCamposVacios(id) {
    if (document.getElementById(id).value == null) {
        return false;
    }
    else {
        if (document.getElementById(id).value == "") {
            return false;
        }
    }
    return true;
}
//Si max o min son -1 significa que no tiene limite maximo o minimo
function ValidarRangoNumerico(id, min, max) {
    if (min === void 0) { min = -1; }
    if (max === void 0) { max = -1; }
    var value = parseInt(document.getElementById(id).value);
    if ((max != -1 ? max > value : true) && (min != -1 ? value > min : true)) {
        return true;
    }
    return false;
}
function ValidarCombo(id, valor) {
    if (document.getElementById(id).value == valor) {
        return false;
    }
    return true;
}
function ObtenerRbSeleccionado(name) {
    var radios = document.getElementsByName(name);
    var aux = "";
    radios.forEach(function (element) {
        if (element.checked) {
            aux = element.value;
        }
    });
    return aux;
}
function ObtenerSueldoMaximo(turno) {
    switch (turno) {
        case "Mañana":
            return 20000;
            break;
        case "Tarde":
            return 18500;
            break;
        case "Noche":
            return 25000;
            break;
        default:
            return -1;
            break;
    }
}
function setMaxSueldo(max) {
    document.getElementById("numSueldo").setAttribute("max", max.toString());
    if (document.getElementById("numSueldo").value > max) {
        document.getElementById("numSueldo").value = max;
    }
}
function AdministrarSpanError(id, show) {
    if (show) {
        document.getElementById(id).parentElement.getElementsByTagName("Span")[0].style.display = "block";
    }
    else {
        document.getElementById(id).parentElement.getElementsByTagName("Span")[0].style.display = "none";
    }
}
//Esta función y la de arriba son muy similares, podrían hacerse en una sola.
function ManageAsteriskBeforeElement(id, show) {
    var _a, _b, _c, _d;
    if (show) {
        if (((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.previousSibling).tagName == undefined) {
            var newNode = document.createElement("span");
            newNode.style.color = "brown";
            newNode.appendChild(document.createTextNode("*"));
            (_b = document.getElementById(id).parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(newNode, document.getElementById(id));
        }
    }
    else {
        if (((_c = document.getElementById(id)) === null || _c === void 0 ? void 0 : _c.previousSibling).tagName == 'SPAN') {
            ((_d = document.getElementById(id)) === null || _d === void 0 ? void 0 : _d.previousSibling).remove();
        }
    }
}
function VerificarValidacionesLogin() {
    var _a, _b;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (((_a = inputs[i].parentElement) === null || _a === void 0 ? void 0 : _a.tagName) != 'FORM') {
            if (((_b = inputs[i].parentElement) === null || _b === void 0 ? void 0 : _b.getElementsByTagName("Span")[0]).style.display == "block") {
                return false;
            }
        }
    }
    return true;
}
function AdministrarValidacionesLogin() {
    if (!ValidarCamposVacios("numDni") || !ValidarRangoNumerico("numDni", 1000000, 55000000)) {
        AdministrarSpanError("numDni", true);
    }
    else {
        AdministrarSpanError("numDni", false);
    }
    if (!ValidarCamposVacios("txtApellido")) {
        AdministrarSpanError("txtApellido", true);
    }
    else {
        AdministrarSpanError("txtApellido", false);
    }
    if (VerificarValidacionesLogin()) {
        document.getElementById("frmLogin").submit();
    }
}
function AdministrarModificar(dni) {
    document.getElementById('modificar').value = dni;
    document.getElementById('frmModificar').submit();
}
