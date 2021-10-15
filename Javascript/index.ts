var btnEnviar = document.getElementById("btnEnviar");
btnEnviar?.addEventListener("click", (e:Event) => frmEmpleadoSubmit(e));

function frmEmpleadoSubmit(event : Event)
{
    event.preventDefault();

    let Valido = AdministrarValidaciones();

    if(Valido)
    {
        let form = (<HTMLFormElement>document.getElementById("frmEmpleado"));
        if(form != null)
        {
            form.submit();
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