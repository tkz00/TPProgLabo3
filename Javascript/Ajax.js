window.addEventListener("load", function () {
    MostrarEmpleados();
    document.getElementById('btnEnviar').setAttribute('onclick', 'GuardarEmpleado()');
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
        var parameters = new FormData();
        parameters.append("Nombre", document.getElementById('txtNombre').value);
        parameters.append("Apellido", document.getElementById('txtApellido').value);
        parameters.append("dni", document.getElementById('numDni').value);
        parameters.append("Sexo", document.getElementById('cboSexo').value);
        parameters.append("Legajo", document.getElementById('numLegajo').value);
        parameters.append("Sueldo", document.getElementById('numSueldo').value);
        parameters.append("Turno", $('input:radio[name="Turno"]:checked').val().toString());
        parameters.append('Foto', document.getElementById('Foto').files[0], document.getElementById('Foto').value);
        parameters.append("hdnModificar", document.getElementById('hdnModificar').value);
        $.ajax({
            type: "POST",
            url: '../Administracion.php',
            data: parameters,
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data);
                if (data == 1) {
                    MostrarEmpleados();
                }
                else if (data == 0) {
                    alert('No se ha podido agregar el empleado a la fabrica.');
                }
                else if (data == 2) {
                    alert('La imagen seleccionada es demasiado grande, no se ha podido agregar el empleado a la fabrica.');
                }
                // let fotoPath = '../Fotos/' + (<HTMLFormElement>document.getElementById('numDni')).value + '-' + (<HTMLFormElement>document.getElementById('txtApellido')).value + '.' + (<HTMLFormElement>document.getElementById('Foto')).value.split('.')[1];
                // let newEmpleado = '<span style="display:flex;justify-content:space-between;align-items:center;">';
                // newEmpleado += (<HTMLFormElement>document.getElementById('numDni')).value + " - ";
                // newEmpleado += (<HTMLFormElement>document.getElementById('txtNombre')).value + " - ";
                // newEmpleado += (<HTMLFormElement>document.getElementById('txtApellido')).value + " - ";
                // newEmpleado += (<HTMLFormElement>document.getElementById('cboSexo')).value + " - ";
                // newEmpleado += (<HTMLFormElement>document.getElementById('numLegajo')).value + " - $";
                // newEmpleado += (<HTMLFormElement>document.getElementById('numSueldo')).value + " - ";
                // newEmpleado += Turno + " - ";
                // newEmpleado += fotoPath;
                // newEmpleado += '<img src="' + fotoPath + '" width="90px" height="90px">';
                // newEmpleado += '<a href="javascript:void(0);" onclick="eliminarEmpleado(' + (<HTMLFormElement>document.getElementById('numLegajo')).value + ', this)" class="eliminar">Eliminar</a>';
                // newEmpleado += '<input type="button" value="Modificar" class="modificar" onclick="modificarEmpleado(' + (<HTMLFormElement>document.getElementById('numDni')).value + ', this)">';
                // newEmpleado += '</span>';
                // (<HTMLFormElement>document.getElementsByClassName('empleados')[0]).insertAdjacentHTML('beforeend', newEmpleado);
            }
        });
        if ($('#hdnModificar').val() === 'true' || $('#hdnModificar').val() === '1') {
            var empleados = document.getElementsByClassName('empleados')[0].children;
            for (var i = 0; i < empleados.length; i++) {
                var dni = empleados[i].firstChild.textContent;
                if ((dni === null || dni === void 0 ? void 0 : dni.substr(0, dni.indexOf(' '))) == document.getElementById('numDni').value) {
                    empleados[i].remove();
                    break;
                }
            }
        }
    }
}
