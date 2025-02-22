<?php
// Habilitar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DB_HOST', 'localhost');
define('DB_NAME', 'tb_tienda_svelte_php');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

// Conexión a la base de datos usando las constantes definidas
$con = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Verificar conexión
if ($con->connect_error) {
    die("Error de conexión: " . $con->connect_error);
}


// Configurar el charset a utf8mb4 o utf8 para aceptar caracteres especiales
if (!$con->set_charset("utf8mb4")) {
    die("Error cargando el conjunto de caracteres utf8mb4: " . $con->error);
} else {
    //echo "Conexión exitosa con charset utf8mb4";
}
