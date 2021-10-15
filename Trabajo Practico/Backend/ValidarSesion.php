<?php

    session_start();

    if(!isset($_SESSION['DNIEmpleado']))
    {
        header("Location: ../Views/Login.html");
    }

?>