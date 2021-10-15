<?php

    include_once "Model/Fabrica.php";

    $legajo = $_GET['legajo'];

    $file = fopen("Empleados.txt", "r");

    //0 = No existe el empleado,
    //1 = El empleado existe y se eliminó,
    //2 = El empleado existe pero no se pudo eliminar
    $estado = 0;

    if(file_exists('Empleados.txt'))
    {
        while(!feof($file))
        {
            $line = fgets($file);
            if(!empty(trim($line)))
            {
                $EmpleadoInfo = explode(" - ", $line);

                if($EmpleadoInfo[4] == $legajo)
                {
                    $Sueldo = (float)substr($EmpleadoInfo[5], 1);
                    $Turno = substr($EmpleadoInfo[6], strlen('Turno '));

                    $Empleado = new Empleado($EmpleadoInfo[0], $EmpleadoInfo[1], $EmpleadoInfo[2], $EmpleadoInfo[3], $EmpleadoInfo[4], $Sueldo, $Turno, $EmpleadoInfo[7]);

                    $Fabrica = new Fabrica("Sociedad Anónima", 7);

                    $Fabrica->TraerDeArchivo("Empleados.txt");

                    if($Fabrica->EliminarEmpleado($Empleado))
                    {
                        $estado = 1;
                        echo "<script type='text/javascript'>alert('Se ha eliminado el empleado de la fabrica correctamente.');</script>";
                        $Fabrica->GuardarEnArchivo("Empleados.txt");
                    }
                    else
                    {
                        $estado = 2;
                        echo "<script type='text/javascript'>alert('No se ha podido eliminar el empleado de la fabrica.');</script>";
                    }
                }
            }
        }
    }

    if($estado == 0)
    {
        echo "<script type='text/javascript'>alert('El legajo ingresado no existe en la fabrica.');</script>";
    }

    echo '<a href="./Backend/Mostrar.php">Mostrar empleados</a>' . '</br>';
    echo '<a href="./Views/Index.php">Volver al formulario</a>';

?>