<!DOCTYPE html>
<html>
    <style>
        .Empleados
        {
            display: flex;
            flex-direction: column;
            margin: 1rem 5rem;
            width: 35%;
            padding: 0.5rem 1.5rem;
            /* background: lightblue; */
            /* border-radius: 15px; */
        }
        span
        {
            margin: 2px 0;
        }
        hr
        {
            flex-grow: 1;
            width: 100%;
        }
        .eliminar
        {
            margin-left:15px;
        }
        .modificar
        {
            margin-left:15px;
        }
    </style>
    <head>
        <meta charset="UTF-8" />
        <title>HTML 5 - Mostrar Empleados</title>
    </head>
    <body>
        <h2>Listado de Empleados</h2>

        
        <div class="Empleados">
            
        <h4>Info</h2>
        
        <hr>
            
            <?php
                include_once "../Model/Fabrica.php";
                include_once "ValidarSesion.php";
                
                if(file_exists('../Empleados.txt'))
                {
                    echo '<div id="listaEmpleados">';

                    $Fabrica = new Fabrica("Sociedad Anonima", 100);

                    $Fabrica->TraerDeArchivo("../Empleados.txt");

                    foreach ($Fabrica->GetEmpleados() as $Empleado)
                    {
                        echo '<span style="display:flex;justify-content:space-between;align-items:center;">';
                        echo $Empleado->ToString();
                        echo '<img src=../' . $Empleado->GetPathFoto() . ' width="90px" height="90px">';
                        echo '<a href="../Eliminar.php?legajo=' . $Empleado->GetLegajo() . '" class="eliminar">Eliminar</a>';
                        echo '<input type="button" value="Modificar" class="modificar" onclick="AdministrarModificar(' . $Empleado->GetDni() . ')">';
                        echo '</span>';
                    }

                    echo '</div>';
                }
            ?>

        <hr>

        <form method="POST" action="../Views/index.php" name="frmModificar" id="frmModificar">
            <input type="hidden" name="modificar" id="modificar">
        </form>

        </div>

        <a href="/Views/Index.php">Volver al formulario</a>
        <br>
        <a href="CerrarSesion.php">Cerrar sesión</a>
        <br>
        <a href="../Views/Ajax.php">Parte 6 - Ajax</a>

        <script src="../Javascript/Funciones.js"></script>
    </body>
</html>