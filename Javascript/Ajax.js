window.addEventListener("load", function () {
    MostrarEmpleados();
});
function MostrarEmpleados() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('get', '../Backend/Mostrar.php', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                document.getElementsByClassName('empleados')[0].innerHTML = xhttp.responseText;
                var lista = document.getElementById('listaEmpleados');
                document.getElementsByClassName('empleados')[0].innerHTML = lista.innerHTML;
                var eliminar = Array.prototype.slice.call(document.getElementsByClassName('eliminar'));
                eliminar.forEach(function (element) {
                    var legajo = element.href.slice(element.href.indexOf('legajo=') + 'legajo='.length);
                    element.href = "javascript:void(0);";
                    element.setAttribute('onclick', 'eliminarEmpleado(' + legajo + ', this)');
                });
                var modificar = Array.prototype.slice.call(document.getElementsByClassName('modificar'));
                modificar.forEach(function (element) {
                    var dni = element.getAttribute('onclick').substring(element.getAttribute('onclick').indexOf('(') + 1, element.getAttribute('onclick').indexOf(')'));
                    element.setAttribute('onclick', 'modificarEmpleado(' + dni + ', this)');
                });
                document.getElementById('btnEnviar').setAttribute('onclick', 'GuardarEmpleado()');
            }
        }
    };
}
function eliminarEmpleado(legajo, ele) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('get', '../Eliminar.php?legajo=' + legajo, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        var _a;
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                (_a = ele.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
            }
        }
    };
}
function modificarEmpleado(dni, ele) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('post', 'Index.php', true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("modificar=" + dni);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                document.getElementsByClassName('formulario')[0].innerHTML = xhttp.responseText;
                var formulario = document.getElementById('frmEmpleado');
                document.getElementsByClassName('formulario')[0].innerHTML = formulario.innerHTML;
                document.getElementById('btnEnviar').setAttribute('onclick', 'GuardarEmpleado()');
                document.getElementById('btnLimpiar').setAttribute('onclick', 'Limpiar()');
            }
        }
    };
}
function Limpiar() {
    document.getElementById('numDni').value = null;
    document.getElementById('numDni').readOnly = false;
    document.getElementById('txtApellido').value = null;
    document.getElementById('txtNombre').value = null;
    document.getElementById('cboSexo').selectedIndex = 0;
    document.getElementById('numLegajo').value = null;
    document.getElementById('numSueldo').value = null;
    var ele = document.getElementsByName("Turno");
    for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }
    document.getElementById('btnEnviar').value = 'Enviar';
    document.getElementById('hdnModificar').value = false;
}
function GuardarEmpleado() {
    var Valido = AdministrarValidaciones();
    if (Valido) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('post', '../Administracion.php', true);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        var Turno_1 = "";
        var ele = document.getElementsByName("Turno");
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                Turno_1 = ele[i].value;
            }
        }
        var form = new FormData();
        form.append("Nombre", document.getElementById('txtNombre').value);
        form.append("Apellido", document.getElementById('txtApellido').value);
        form.append("dni", document.getElementById('numDni').value);
        form.append("Sexo", document.getElementById('cboSexo').value);
        form.append("Legajo", document.getElementById('numLegajo').value);
        form.append("Sueldo", document.getElementById('numSueldo').value);
        form.append("Turno", Turno_1);
        form.append('Foto', document.getElementById('Foto').files[0], document.getElementById('Foto').value);
        form.append("hdnModificar", document.getElementById('hdnModificar').value);
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    var fotoPath = '../Fotos/' + document.getElementById('numDni').value + '-' + document.getElementById('txtApellido').value + '.' + document.getElementById('Foto').value.split('.')[1];
                    var newEmpleado = '<span style="display:flex;justify-content:space-between;align-items:center;">';
                    newEmpleado += document.getElementById('numDni').value + " - ";
                    newEmpleado += document.getElementById('txtNombre').value + " - ";
                    newEmpleado += document.getElementById('txtApellido').value + " - ";
                    newEmpleado += document.getElementById('cboSexo').value + " - ";
                    newEmpleado += document.getElementById('numLegajo').value + " - $";
                    newEmpleado += document.getElementById('numSueldo').value + " - ";
                    newEmpleado += Turno_1 + " - ";
                    newEmpleado += fotoPath;
                    newEmpleado += '<img src="' + fotoPath + '" width="90px" height="90px">';
                    newEmpleado += '<a href="javascript:void(0);" onclick="eliminarEmpleado(' + document.getElementById('numLegajo').value + ', this)" class="eliminar">Eliminar</a>';
                    newEmpleado += '<input type="button" value="Modificar" class="modificar" onclick="modificarEmpleado(' + document.getElementById('numDni').value + ', this)">';
                    newEmpleado += '</span>';
                    document.getElementsByClassName('empleados')[0].insertAdjacentHTML('beforeend', newEmpleado);
                }
            }
        };
        if (document.getElementById('hdnModificar').value) {
            var empleados = document.getElementsByClassName('empleados')[0].children;
            for (var i_1 = 0; i_1 < empleados.length; i_1++) {
                var dni = empleados[i_1].firstChild.textContent;
                if ((dni === null || dni === void 0 ? void 0 : dni.substr(0, dni.indexOf(' '))) == document.getElementById('numDni').value) {
                    empleados[i_1].remove();
                    break;
                }
            }
        }
    }
}
