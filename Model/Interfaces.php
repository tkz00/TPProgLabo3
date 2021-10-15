<?php

    interface IArchivo
    {
        function TraerDeArchivo($nombreArchivo);

        function GuardarEnArchivo($nombreArchivo);
    }

?>