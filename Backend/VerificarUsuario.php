<?php

    include_once "../Model/Fabrica.php";

    $Fabrica = new Fabrica("Sociedad Anónima", 7);

    $Fabrica->TraerDeArchivo("../Empleados.txt");

    $Empleados = $Fabrica->GetEmpleados();

    for($i=0; $i < count($Empleados); $i++)
    {
        if($Empleados[$i]->GetDni() == $_POST['dni'] && $Empleados[$i]->GetApellido() == $_POST['Apellido'])
        {
            session_start();
            $_SESSION['DNIEmpleado'] = $Empleados[$i]->GetDni();
            header("Location: ./Mostrar.php");
            break;
        }
        else if($i == count($Empleados) - 1)
        {
            echo 'No existe un empleado con el dni y el apellido ingresados.<br>';
            echo '<a href=../Views/Login.html>Volver al login</a>';
        }
    }

?>