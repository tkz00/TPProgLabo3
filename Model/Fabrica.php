<?php

    include_once "Interfaces.php";
    include_once "Persona.php";
    include_once "Empleado.php";

    class Fabrica implements IArchivo
    {
        private $_cantidadMaxima;
        private $_empleados;
        private $_razonSocial;

        public function __construct($razonSocial, $cantidadMaxima)
        {
            $this->_cantidadMaxima = $cantidadMaxima;
            $this->_razonSocial = $razonSocial;
            $this->_empleados = array();

            

            // $empleadosArray = array(new Empleado("Theo", "Katz", 42648691, 'M', 9966, 1500.69, "Tarde"), new Empleado("Jonas", "Obarrio", 43565698, 'M', 1544, 38095.15, "Mañana"), new Empleado("Jade", "Obarrio", 39886767, 'F', 2801, 2000.00, "Noche"),);
            // $this->_empleados = $empleadosArray;
        }

        public function GetEmpleados()
        {
            return $this->_empleados;
        }

        public function AgregarEmpleado($empleado)
        {
            if(count($this->_empleados) < $this->_cantidadMaxima)
            {
                array_push($this->_empleados, $empleado);

                $this->EliminarEmpleadosRepetidos();

                return true;
            }
            return false;
        }

        public function CalcularSueldos()
        {
            $aux = 0.00;

            foreach ($this->_empleados as $empleado) {
                $aux += $empleado->GetSueldo();
            }

            return $aux;
        }

        public function EliminarEmpleado($empleado)
        {
            for ($i=0; $i < count($this->_empleados); $i++)
            {
                if($this->_empleados[$i]->GetLegajo() == $empleado->GetLegajo())
                {
                    unlink($this->_empleados[$i]->GetPathFoto());
                    unset($this->_empleados[$i]);
                    return true;
                }
            }

            return false;
        }

        private function EliminarEmpleadosRepetidos()
        {
            $this->_empleados = array_unique($this->_empleados, SORT_REGULAR);
            return true;
        }

        public function ToString()
        {
            $string = "La fabrica tiene una razón social: " . $this->_razonSocial . ", la cantidad máxima de empleados es: " . $this->_cantidadMaxima . ", el sueldo total de la fabrica es: " . $this->CalcularSueldos() . "<br>";

            foreach ($this->_empleados as $empleado) {
                $string .= $empleado->ToString();
            }

            return $string;
        }

        public function TraerDeArchivo($nombreArchivo)
        {
            $file = fopen($nombreArchivo, "r");

            while(!feof($file))
            {
                $line = fgets($file);
                $line = rtrim($line, "\r\n");

                if(!empty(trim($line)))
                {
                    $EmpleadoInfo = explode(" - ", $line);

                    $Sueldo = (float)substr($EmpleadoInfo[5], 1);
                    $Turno = substr($EmpleadoInfo[6], strlen('Turno '));

                    $Empleado = new Empleado($EmpleadoInfo[1], $EmpleadoInfo[2], $EmpleadoInfo[0], $EmpleadoInfo[3], $EmpleadoInfo[4], $Sueldo, $Turno, $EmpleadoInfo[7]);

                    $this->AgregarEmpleado($Empleado);
                    $this->EliminarEmpleadosRepetidos();
                }
            }
        
            fclose($file);
        }

        public function GuardarEnArchivo($nombreArchivo)
        {
            $txt = "";
            
            foreach($this->_empleados as $Empleado)
            {
                // $txt .= $Empleado->ToString();
                $txt .= $Empleado->ToString() . "\r\n";
            }

            $myFile = fopen($nombreArchivo, "w");
            fwrite($myFile, $txt);
            $success = fclose($myFile);

            //TEST JSON
            // $test = $this->_empleados;
            // $jsonData = json_encode($test);
            // $status = file_put_contents('Usuarios.json', $jsonData);

            return $success;
        }
    }

?>