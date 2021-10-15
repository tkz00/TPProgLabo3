<?php

    include_once "../Backend/ValidarSesion.php";
    include_once "../Model/Fabrica.php";

    $Modificar = false;
    $dni = null;
    $apellido = null;
    $nombre = null;
    $sexo = null;
    $legajo = null;
    $sueldo = null;
    $turno = null;
    $pathFoto = null;

    if(isset($_POST['modificar']))
    {
        $Fabrica = new Fabrica("Sociedad Anonima", 100);
        $Fabrica->TraerDeArchivo("../Empleados.txt");
        
        foreach ($Fabrica->GetEmpleados() as $Empleado)
        {
            if($Empleado->GetDni() == $_POST['modificar'])
            {
                $EmpleadoAModificar = $Empleado;
            }
        }
        
        $Modificar = true;
        $dni = $EmpleadoAModificar->GetDni();
        $apellido = $EmpleadoAModificar->GetApellido();
        $nombre = $EmpleadoAModificar->GetNombre();
        $sexo = $EmpleadoAModificar->GetSexo();
        $legajo = $EmpleadoAModificar->GetLegajo();
        $sueldo = $EmpleadoAModificar->GetSueldo();
        $turno = $EmpleadoAModificar->GetTurno();
        $pathFoto = $EmpleadoAModificar->GetPathFoto();
    }

?>

<!DOCTYPE html>
    <html>
        <style>
            #frmEmpleado
            {
                display: flex;
                flex-direction: column;
                margin: 1rem 5rem;
                width: 15rem;
                padding: 0.5rem 1.5rem;
                background: lightblue;
                border-radius: 15px;
            }
            #frmEmpleado>span
            {
                display: flex;
                /* justify-content: space-between; */
            }
            #frmEmpleado>span>input, select
            {
                margin-left: auto;
            }
            #frmEmpleado>span input, select
            {
                width: 60%;
            }
            .turnos
            {
                display: flex;
                flex-direction: column;
                margin: 0rem 2rem;
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
        </style>
        <head>
            <meta charset="UTF-8" />
            <title><?php if($Modificar){ echo 'HTML 5 - Modificar Empleado'; } else { echo 'HTML 5 - Alta de Empleado'; } ?></title>
        </head>

        <a href="../Backend/CerrarSesion.php">Cerrar sesión</a><br>
        <a href="../Views/Ajax.php">Parte 6 - Ajax</a><br>

        <body>
            <h2><?php if($Modificar){echo 'Modificar Empleado'; } else {echo 'Alta de Empleado'; } ?></h2>

            <form method="POST" action="../Administracion.php" name="frmEmpleado" id="frmEmpleado" enctype="multipart/form-data">
                <h4>Datos Personales</h4>
                <hr>
                <span>DNI: <input type="number" min="1000000" max="55000000" name="dni" id="numDni" onkeydown="return event.keyCode !== 69" value="<?php echo $dni ?>" <?php if($Modificar){echo "readonly";} ?>></span>
                <span>Apellido: <input type="text" name="Apellido" id="txtApellido" value="<?php echo $apellido ?>"></span>
                <span>Nombre: <input type="text" name="Nombre" id="txtNombre" value="<?php echo $nombre ?>"></span>
                <span>Sexo:
                    <select id="cboSexo" name="Sexo">
                        <option <?php if(!$Modificar){echo 'selected';} ?> disabled hidden>--</option>
                        <option value='M' <?php if($sexo == 'M'){echo 'selected';} ?>>Masculino</option>
                        <option value='F' <?php if($sexo == 'F'){echo 'selected';} ?>>Femenino</option>
                    </select>
                </span>

                <h4>Datos Laborales</h4>
                <hr>
                <span>Legajo: <input type="number" min="100" max="550" name="Legajo" id="numLegajo" onkeydown="return event.keyCode !== 69" value="<?php echo $legajo ?>" <?php if($Modificar){echo "readonly";} ?>></span>
                <span>Sueldo: <input type="number" min="8000" name="Sueldo" id="numSueldo" value="<?php echo $sueldo ?>" onkeydown="return event.keyCode !== 69"></span>
                <p>Turno: </p>
                <div class="turnos">
                    <span><input type="radio" id="btnMañana" name="Turno" value="Mañana" onclick="setMaxSueldo(20000)" <?php if($turno == 'Mañana'){echo 'checked';} ?>>Mañana</span>
                    <span><input type="radio" id="btnTarde" name="Turno" value="Tarde" onclick="setMaxSueldo(18500)" <?php if($turno == 'Tarde'){echo 'checked';} ?>>Tarde</span>
                    <span><input type="radio" id="btnNoche" name="Turno" value="Noche" onclick="setMaxSueldo(25000)" <?php if($turno == 'Noche'){echo 'checked';} ?>>Noche</span>
                </div>
                <span>Foto: <input type="file" name="Foto" id="Foto" style="width:auto;"></span>
                <hr>
                <input type="reset" value="Limpiar" id="btnLimpiar" style="margin: 2px;">
                <input type="submit" value="<?php if($Modificar) { echo 'Modificar'; } else { echo 'Enviar'; } ?>" id="btnEnviar" style="margin: 2px;">
                <input type="hidden" id="hdnModificar" name="hdnModificar" value="<?php echo $Modificar ?>">

            </form>

            <script src="../Javascript/Funciones.js"></script>
            <script src="../Javascript/index.js"></script>
        </body>
    </html>
</html>