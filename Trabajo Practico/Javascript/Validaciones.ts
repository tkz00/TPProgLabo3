// var btnEnviar = document.getElementById("btnEnviar");
// btnEnviar?.addEventListener("click", (e:Event) => AdministrarValidaciones(e));

function AdministrarValidaciones(): boolean
{
    let Valido = true;

    let errorArray = [];

    if(!ValidarCamposVacios("numDni") || !ValidarRangoNumerico("numDni", 1000000, 55000000))
    {
        console.log("Error en el DNI");
        errorArray.push("DNI");
        Valido = false;

        ManageAsteriskBeforeElement("numDni", true);
    }
    else
    {
        ManageAsteriskBeforeElement("numDni", false);
    }

    if(!ValidarCamposVacios("txtApellido"))
    {
        console.log("El apellido está vacío");
        errorArray.push("Apellido");
        Valido = false;

        ManageAsteriskBeforeElement("txtApellido", true);
    }
    else
    {
        ManageAsteriskBeforeElement("txtApellido", false);
    }

    if(!ValidarCamposVacios("txtNombre"))
    {
        console.log("El nombre está vacío");
        errorArray.push("Nombre");
        Valido = false;

        ManageAsteriskBeforeElement("txtNombre", true);
    }
    else
    {
        ManageAsteriskBeforeElement("txtNombre", false);
    }

    if(!ValidarCombo("cboSexo", "--"))
    {
        console.log("No se ha seleccionado sexo");
        errorArray.push("Sexo");
        Valido = false;

        ManageAsteriskBeforeElement("cboSexo", true);
    }
    else
    {
        ManageAsteriskBeforeElement("cboSexo", false);
    }

    if(!ValidarCamposVacios("numLegajo") || !ValidarRangoNumerico("numLegajo", 100, 550))
    {
        console.log("Error en el legajo");
        errorArray.push("Legajo");
        Valido = false;

        ManageAsteriskBeforeElement("numLegajo", true);
    }
    else
    {
        ManageAsteriskBeforeElement("numLegajo", false);
    }

    if(!ValidarCamposVacios("numSueldo") || !ValidarRangoNumerico("numSueldo", 800, ObtenerSueldoMaximo(ObtenerRbSeleccionado("Turno"))))
    {
        console.log("Error en el sueldo");
        errorArray.push("Sueldo");
        Valido = false;

        ManageAsteriskBeforeElement("numSueldo", true);
    }
    else
    {
        ManageAsteriskBeforeElement("numSueldo", false);
    }

    if(!ValidarCamposVacios("Foto"))
    {
        console.log("Error en la foto");
        errorArray.push("Foto");
        Valido = false;

        ManageAsteriskBeforeElement("Foto", true);
    }
    else
    {
        ManageAsteriskBeforeElement("Foto", false);
    }

    if(ObtenerRbSeleccionado("Turno") == "")
    {
        console.log("Error en el turno");
        errorArray.push("Turno");
        Valido = false;

        if((<HTMLFormElement>document.getElementsByClassName("turnos")[0]?.previousSibling).tagName != 'SPAN')
        {
            let newNode = document.createElement("span");
            newNode.style.color = "brown";
            newNode.appendChild(document.createTextNode("*"));
            (<HTMLFormElement>document.getElementsByClassName("turnos")[0]).parentElement?.insertBefore(newNode, (<HTMLFormElement>document.getElementsByClassName("turnos")[0]));
        }
    }
    else
    {
        if((<HTMLFormElement>document.getElementsByClassName("turnos")[0]?.previousSibling).tagName == 'SPAN')
        {
            (<HTMLFormElement>document.getElementsByClassName("turnos")[0]?.previousSibling).remove();
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

function ValidarCamposVacios(id : string) : boolean
{
    if((<HTMLInputElement>document.getElementById(id)).value == null)
    {
        return false;
    }
    else
    {
        if((<HTMLInputElement>document.getElementById(id)).value == "")
        {
            return false;
        }
    }

    return true;
}

//Si max o min son -1 significa que no tiene limite maximo o minimo
function ValidarRangoNumerico(id : string, min : number = -1, max : number = -1) : boolean
{
    let value = parseInt((<HTMLInputElement>document.getElementById(id)).value);

    if((max != -1 ? max > value : true) && (min != -1 ? value > min : true))
    {
        return true;
    }
    
    return false;
}

function ValidarCombo(id : string, valor : string) : boolean
{
    if((<HTMLInputElement>document.getElementById(id)).value == valor)
    {
        return false;
    }

    return true;
}

function ObtenerRbSeleccionado(name : string) : string
{
    let radios = document.getElementsByName(name);
    let aux = "";

    radios.forEach(element => {
        if((<HTMLInputElement>element).checked)
        {
            aux = (<HTMLInputElement>element).value;
        }
    });

    return aux;
}

function ObtenerSueldoMaximo(turno : string) : number
{
    switch(turno)
    {
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

function setMaxSueldo(max : number)
{
    (<HTMLFormElement>document.getElementById("numSueldo")).setAttribute("max", max.toString());

    if((<HTMLFormElement>document.getElementById("numSueldo")).value > max)
    {
        (<HTMLFormElement>document.getElementById("numSueldo")).value = max;
    }
}

function AdministrarSpanError(id : string, show : boolean)
{
    if(show)
    {
        (<HTMLFormElement>document.getElementById(id)!.parentElement!.getElementsByTagName("Span")[0]).style.display = "block";
    }
    else
    {
        (<HTMLFormElement>document.getElementById(id)!.parentElement!.getElementsByTagName("Span")[0]).style.display = "none";
    }
}

//Esta función y la de arriba son muy similares, podrían hacerse en una sola.
function ManageAsteriskBeforeElement(id : string, show : boolean)
{
    if(show)
    {
        if((<HTMLFormElement>document.getElementById(id)?.previousSibling).tagName == undefined)
        {
            let newNode = document.createElement("span");
            newNode.style.color = "brown";
            newNode.appendChild(document.createTextNode("*"));
            (<HTMLFormElement>document.getElementById(id)).parentElement?.insertBefore(newNode, (<HTMLFormElement>document.getElementById(id)));
        }
    }
    else
    {
        if((<HTMLFormElement>document.getElementById(id)?.previousSibling).tagName == 'SPAN')
        {
            (<HTMLFormElement>document.getElementById(id)?.previousSibling).remove();
        }
    }
}

function VerificarValidacionesLogin()
{
    let inputs = document.getElementsByTagName("input");

    for(let i = 0; i < inputs.length; i++)
    {
        if(inputs[i].parentElement?.tagName != 'FORM')
        {
            if((<HTMLFormElement>inputs[i].parentElement?.getElementsByTagName("Span")[0]).style.display == "block")
            {
                return false;
            }
        }
    }
    return true;
}

function AdministrarValidacionesLogin() : void
{
    if(!ValidarCamposVacios("numDni") || !ValidarRangoNumerico("numDni", 1000000, 55000000))
    {
        AdministrarSpanError("numDni", true);
    }
    else
    {
        AdministrarSpanError("numDni", false);
    }

    if(!ValidarCamposVacios("txtApellido"))
    {
        AdministrarSpanError("txtApellido", true);
    }
    else
    {
        AdministrarSpanError("txtApellido", false);
    }

    if(VerificarValidacionesLogin())
    {
        (<HTMLFormElement>document.getElementById("frmLogin")).submit();
    }
}
