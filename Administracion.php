<?php
    include_once "Model/Persona.php";
    include_once "Model/Empleado.php";
    include_once "Model/Fabrica.php";

    //Estado 0 = error, 1 = OK, 2 = archivo muy grande
    $Estado = 0;

    //Validación imagen
    if(substr($_FILES['Foto']['type'], 0, strpos($_FILES['Foto']['type'], "/")) == "image")
    {
        $imgTypes = array(IMAGETYPE_BMP, IMAGETYPE_GIF, IMAGETYPE_PNG, IMAGETYPE_JPEG);
        $detectedType = exif_imagetype($_FILES['Foto']['tmp_name']);
        if(in_array($detectedType, $imgTypes))
        {
            if(($_FILES['Foto']['size'] / 1024 / 1024) <= 1)
            {
                if(!file_exists('Fotos'))
                {
                    mkdir('Fotos', 0777, true);
                }
                
                if(!file_exists('Fotos/' . $_FILES['Foto']['name']))
                {
                    $apellidoFormateado = preg_replace('/\s+/', '_', $_POST['Apellido']);
                    $destino = 'Fotos/' . $_POST['dni'] . '-' . $apellidoFormateado . '.' . pathinfo($_FILES['Foto']['name'], PATHINFO_EXTENSION);
                    
                    $Empleado = new Empleado($_POST['Nombre'], $_POST['Apellido'], $_POST['dni'], $_POST['Sexo'], $_POST['Legajo'], $_POST['Sueldo'], $_POST['Turno'], $destino);
                    
                    $Fabrica = new Fabrica("Sociedad Anónima", 100);

                    $Fabrica->TraerDeArchivo("Empleados.txt");

                    if($_POST['hdnModificar'] === true || $_POST['hdnModificar'] === 'true' || $_POST['hdnModificar'] === '1')
                    {
                        foreach ($Fabrica->GetEmpleados() as $auxEmpleado)
                        {
                            if($auxEmpleado->GetDni() == $_POST['dni'])
                            {
                                $EmpleadoAEliminar = $auxEmpleado;
                                break;
                            }
                        }

                        if(isset($EmpleadoAEliminar))
                        {
                            $Fabrica->EliminarEmpleado($EmpleadoAEliminar);
                        }
                    }
                
                    if($Fabrica->AgregarEmpleado($Empleado))
                    {
                        $Estado = 1;
                    }

                    move_uploaded_file($_FILES['Foto']['tmp_name'], $destino);
                }
            }
            else
            {
                $Estado = 2;
            }
        }
    }


    if($Estado == 1)
    {
        $Fabrica->GuardarEnArchivo("Empleados.txt");
        // echo '<a href="./Backend/Mostrar.php">Mostrar empleados</a>';
    }
    else
    {
        // echo "<script type='text/javascript'>alert('No se ha podido agregar el empleado a la fabrica.');</script>";
        // echo '<a href="./Views/Index.php">Volver al formulario</a>';
    }

    echo json_encode($Estado);

?>