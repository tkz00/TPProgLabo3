window.addEventListener("load", function()
{
    MostrarEmpleados();
    (<HTMLFormElement>document.getElementById('btnEnviar')).setAttribute('onclick', 'GuardarEmpleado()');
})

function MostrarEmpleados()
{
    var xhttp = new XMLHttpRequest();
    xhttp.open('get', '../Backend/Mostrar.php', true);
    
    xhttp.send();

    xhttp.onreadystatechange = (): void =>
    {
        if(xhttp.readyState === 4)
        {
            if(xhttp.status === 200)
            {
                (<HTMLFormElement>document.getElementsByClassName('empleados')[0]).innerHTML = xhttp.responseText;
                let lista = (<HTMLFormElement>document.getElementById('listaEmpleados'));
                (<HTMLFormElement>document.getElementsByClassName('empleados')[0]).innerHTML = lista.innerHTML;

                let eliminar = Array.prototype.slice.call(document.getElementsByClassName('eliminar'));
                eliminar.forEach(element => {
                    let legajo = element.href.slice(element.href.indexOf('legajo=') + 'legajo='.length);
                    element.href = "javascript:void(0);";
                    element.setAttribute('onclick', 'eliminarEmpleado(' + legajo +', this)');

                });

                let modificar = Array.prototype.slice.call(document.getElementsByClassName('modificar'));
                modificar.forEach(element => {
                    let dni = element.getAttribute('onclick').substring(element.getAttribute('onclick').indexOf('(') + 1, element.getAttribute('onclick').indexOf(')'));
                    element.setAttribute('onclick', 'modificarEmpleado(' + dni +', this)');
                });

            }
        }
    };
}

function eliminarEmpleado(legajo : number, ele : HTMLFormElement)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open('get', '../Eliminar.php?legajo=' + legajo, true);
    
    xhttp.send();

    xhttp.onreadystatechange = (): void =>
    {
        if(xhttp.readyState === 4)
        {
            if(xhttp.status === 200)
            {
                ele.parentElement?.remove();
            }
        }
    }
}

function modificarEmpleado(dni : string, ele : HTMLFormElement)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open('post', 'Index.php', true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhttp.send(`modificar=${dni}`);

    xhttp.onreadystatechange = (): void =>
    {
        if(xhttp.readyState === 4)
        {
            if(xhttp.status === 200)
            {
                (<HTMLFormElement>document.getElementsByClassName('formulario')[0]).innerHTML = xhttp.responseText;
                let formulario = (<HTMLFormElement>document.getElementById('frmEmpleado'));
                (<HTMLFormElement>document.getElementsByClassName('formulario')[0]).innerHTML = formulario.innerHTML;

                (<HTMLFormElement>document.getElementById('btnEnviar')).setAttribute('onclick', 'GuardarEmpleado()');
                (<HTMLFormElement>document.getElementById('btnLimpiar')).setAttribute('onclick', 'Limpiar()');
            }
        }
    };
}

function Limpiar()
{
    (<HTMLFormElement>document.getElementById('numDni')).value = null;
    (<HTMLFormElement>document.getElementById('numDni')).readOnly = false;
    (<HTMLFormElement>document.getElementById('txtApellido')).value = null;
    (<HTMLFormElement>document.getElementById('txtNombre')).value = null;

    (<HTMLFormElement>document.getElementById('cboSexo')).selectedIndex = 0;

    (<HTMLFormElement>document.getElementById('numLegajo')).value = null;
    (<HTMLFormElement>document.getElementById('numSueldo')).value = null;

    var ele = document.getElementsByName("Turno");
    for(var i=0;i<ele.length;i++)
    {
        (<HTMLFormElement>ele[i]).checked = false;
    }

    (<HTMLFormElement>document.getElementById('btnEnviar')).value = 'Enviar';
    (<HTMLFormElement>document.getElementById('hdnModificar')).value = false;
}

function GuardarEmpleado()
{
    let Valido = AdministrarValidaciones();

    if(Valido)
    {
        let parameters: FormData = new FormData();

        parameters.append("Nombre", (<HTMLFormElement>document.getElementById('txtNombre')).value);
        parameters.append("Apellido", (<HTMLFormElement>document.getElementById('txtApellido')).value);
        parameters.append("dni", (<HTMLFormElement>document.getElementById('numDni')).value);
        parameters.append("Sexo", (<HTMLFormElement>document.getElementById('cboSexo')).value);
        parameters.append("Legajo", (<HTMLFormElement>document.getElementById('numLegajo')).value);
        parameters.append("Sueldo", (<HTMLFormElement>document.getElementById('numSueldo')).value);
        parameters.append("Turno", $('input:radio[name="Turno"]:checked').val()!.toString());
        parameters.append('Foto', (<HTMLFormElement>document.getElementById('Foto')).files[0], (<HTMLFormElement>document.getElementById('Foto')).value);
        parameters.append("hdnModificar", (<HTMLFormElement>document.getElementById('hdnModificar')).value);

        $.ajax({
            type: "POST",
            url: '../Administracion.php',
            data: parameters,
            contentType: false,
            processData: false,
            success: function(data){
                // console.log(data);

                if(data == 1)
                {
                    MostrarEmpleados();
                }
                else if(data == 0)
                {
                    alert('No se ha podido agregar el empleado a la fabrica.');
                }
                else if(data == 2)
                {
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

        if($('#hdnModificar').val() === 'true' || $('#hdnModificar').val() === '1')
        {
            let empleados = (<HTMLFormElement>document.getElementsByClassName('empleados')[0]).children;

            for (let i = 0; i < empleados.length; i++)
            {
                let dni = (<HTMLFormElement>empleados[i].firstChild).textContent;
                if(dni?.substr(0, dni.indexOf(' ')) == (<HTMLFormElement>document.getElementById('numDni')).value)
                {
                    empleados[i].remove();
                    break;
                }
            }
        }
    }
}