<?php

    include_once "../Backend/ValidarSesion.php";

?>

<!DOCTYPE html>
<html>
    <style>
        .fabrica
        {
            display: flex;
        }
        .formulario
        {
            display: flex;
            flex-direction: column;
            margin: 1rem 5rem;
            width: 15rem;
            padding: 0.5rem 1.5rem;
            background: lightblue;
            border-radius: 15px;
        }
        .formulario>span
        {
            display: flex;
            /* justify-content: space-between; */
        }
        .formulario>span>input, select
        {
            margin-left: auto;
        }
        .formulario>span input, select
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
        #frmLogin
        {
            display: flex;
            flex-direction: column;
            margin: 1rem 5rem;
            width: 15rem;
            padding: 0.5rem 1.5rem;
            background: lightblue;
            border-radius: 15px;
        }
        #frmLogin>span
        {
            display: flex;
        }
        #frmLogin>span>input
        {
            margin-left: auto;
        }
        #frmLogin>span input, select
        {
            width: 60%;
        }
        .turnos
        {
            display: flex;
            flex-direction: column;
            margin: 0rem 2rem;
        }
        .empleados
        {
            display: flex;
            flex-direction: column;
            margin: 1rem 5rem;
            width: 35%;
            padding: 0.5rem 1.5rem;
            background: lightblue;
            border-radius: 15px;
        }
        .empleados > *
        {
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            padding: 6px;
        }
        .eliminar
        {
            margin-left:15px;
        }
        .modificar
        {
            margin-left:15px;
        }
        .links
        {
            display: inline-flex;
            flex-direction: column;
            margin: 0 5rem;
        }
    </style>
    <head>
        <meta charset="UTF-8" />
        <title>Parte 6 - Ajax</title>
    </head>
    <body>
        <h2>Katz Theo</h2>

        <div class="fabrica">
            <div class="formulario">
                <h4>Datos Personales</h4>
                <hr>
                <span>DNI: <input type="number" min="1000000" max="55000000" name="dni" id="numDni" onkeydown="return event.keyCode !== 69"></span>
                <span>Apellido: <input type="text" name="Apellido" id="txtApellido"></span>
                <span>Nombre: <input type="text" name="Nombre" id="txtNombre"></span>
                <span>Sexo:
                    <select id="cboSexo" name="Sexo">
                        <option selected disabled hidden>--</option>
                        <option value='M'>Masculino</option>
                        <option value='F'>Femenino</option>
                    </select>
                </span>

                <h4>Datos Laborales</h4>
                <hr>
                <span>Legajo: <input type="number" min="100" max="550" name="Legajo" id="numLegajo" onkeydown="return event.keyCode !== 69"></span>
                <span>Sueldo: <input type="number" min="8000" name="Sueldo" id="numSueldo" onkeydown="return event.keyCode !== 69"></span>
                <p>Turno: </p>
                <div class="turnos">
                    <span><input type="radio" id="btnMañana" name="Turno" value="Mañana" onclick="setMaxSueldo(20000)">Mañana</span>
                    <span><input type="radio" id="btnTarde" name="Turno" value="Tarde" onclick="setMaxSueldo(18500)">Tarde</span>
                    <span><input type="radio" id="btnNoche" name="Turno" value="Noche" onclick="setMaxSueldo(25000)">Noche</span>
                </div>
                <span>Foto: <input type="file" name="Foto" id="Foto" style="width:auto;"></span>
                <hr>
                <input type="reset" value="Limpiar" id="btnLimpiar" style="margin: 2px;">
                <input type="submit" value="Enviar" id="btnEnviar" style="margin: 2px;">
                <input type="hidden" id="hdnModificar" name="hdnModificar" value="false">
            </div>

            <div class="empleados">
                
            </div>
        </div>

        <div class="links">
            <a href="../Backend/Mostrar.php">Mostrar empleados</a>
            <a href="Index.php">Formulario Carga</a>
            <a href="../Backend/CerrarSesion.php">Cerrar sesión</a>
        </div>

        <script src="../Javascript/Funciones.js"></script>
        <script src="../Javascript/Ajax.js"></script>
    </body>
</html>