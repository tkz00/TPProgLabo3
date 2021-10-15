<?php

    session_start();

    unset($_SESSION['DNIEmpleado']);

    header('Location: ../Views/Login.html');

?>