var btnEnviar = document.getElementById("btnEnviar");
btnEnviar?.addEventListener("click", (e:Event) => frmEmpleadoSubmit(e));

function frmEmpleadoSubmit(event : Event)
{
    event.preventDefault();

    let Valido = AdministrarValidaciones();

    if(Valido)
    {
        let form = $('#frmEmpleado');
        if(form != null)
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
            parameters.append("hdnModificar", (<HTMLFormElement>document.getElementById('hdnModificar')).value === 'true' ? 'true' : 'false');

            var url = form.attr('action'); //get submit url [replace url here if desired]
            $.ajax({
                type: "POST",
                url: url,
                data: parameters,
                contentType: false,
                processData: false,
                success: function(data){
                    // console.log(data);
                    $('#links').empty();
                    if(data == 1)
                    {
                        $('#links').append('<script type="text/javascript">alert("Se agregó el empleado a la fabrica con éxito.");</script>');
                        $('#links').append('<a href="../Backend/Mostrar.php">Mostrar empleados</a>');
                    }
                    else if(data == 0)
                    {
                        $('#links').append('<script type="text/javascript">alert("No se ha podido agregar el empleado a la fabrica.");</script>');
                        $('#links').append('<a href="../Views/Index.php">Volver al formulario</a>');
                    }
                    else if(data == 2)
                    {
                        $('#links').append('<script type="text/javascript">alert("La imagen seleccionada es muy grande, no se agregó el empleado a la fabrica.");</script>');
                        $('#links').append('<a href="../Views/Index.php">Volver al formulario</a>');
                    }
                }
            });
        }
    }
    else
    {
        //COMENTADO POR LA PARTE 4 DEL TP
        // let errorMessage = "Los siguientes campos están vacíos o los valores ingresados no son válidos:"
        
        // errorArray.forEach(element => {
        //     errorMessage = errorMessage.concat('\n', '- ', element);
        // });

        // alert(errorMessage);
    }
}