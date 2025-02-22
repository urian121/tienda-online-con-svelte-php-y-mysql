<?php
/**
 * Creando una API RESTful con los métodos GET, POST, PUT y DELETE utilizando PHP y MySQL
 */
// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Permitir preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

require('configBD.php');
$tbl_productos = 'tbl_products';
$tbl_carrito = 'tbl_carrito';
$action = isset($_GET['action']) ? $_GET['action'] : '';
$cantidad = 1; // Cantidad predeterminada para agregar o eliminar al carrito
// Leer datos JSON de la solicitud
$data = json_decode(file_get_contents("php://input"), true);


/**
 * Validar si el ID del producto es un número
 * @param $data Datos de la solicitud
 * @param $con Conexión a la base de datos
 * @return string
 */
function validarProductoID($data, $con)
{
    if (!isset($data['id']) || !is_numeric($data['id'])) {
        echo json_encode(['error' => 'ID de producto inválido']);
        exit;
    }
    // Escapar el ID del producto
    return mysqli_real_escape_string($con, $data['id']);
}


/**
 * Obtener todos los productos de la base de datos
 * @return array
 */
if($action == 'getProducts'){
    $query = "SELECT * FROM $tbl_productos";
    $resultado = mysqli_query($con, $query);

    $productos = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $productos[] = $fila;
    }
    echo json_encode($productos);
    exit();
}

/**
 * Agregar un producto al carrito, si ya existe, aumentar la cantidad
 * @param $id ID del producto
 * @param $cantidad Cantidad del producto
 */
if ($action == 'addToCart') {
    // Se valida el ID del producto antes de continuar
    $id = validarProductoID($data, $con);

    // Verificar si el producto ya está en el carrito
    $checkQuery = "SELECT id, cantidad FROM $tbl_carrito WHERE producto_id = '$id'";
    $result = mysqli_query($con, $checkQuery);

    if ($row = mysqli_fetch_assoc($result)) {
        // Si ya existe, actualizar la cantidad
        $newCantidad = $row['cantidad'] + $cantidad;
        $updateQuery = "UPDATE $tbl_carrito SET cantidad = '$newCantidad' WHERE id = '{$row['id']}'";
        $querySuccess = mysqli_query($con, $updateQuery);
    } else {
        // Si no existe, insertarlo
        $insertQuery = "INSERT INTO $tbl_carrito (producto_id, cantidad) VALUES ('$id', '$cantidad')";
        $querySuccess = mysqli_query($con, $insertQuery);
    }

    if ($querySuccess) {
        echo json_encode(['message' => 'Producto agregado correctamente']);
    } else {
        echo json_encode(['error' => 'Error al agregar producto: ' . mysqli_error($con)]);
    }
    exit; // Importante para evitar contenido extra en la respuesta
}


/**
 * Obtener los productos del carrito
 * @return array
 */
if ($action == 'getProductsCart') {
    $query = "SELECT 
            c.id, c.producto_id, c.cantidad, c.agregado_en,
            p.name, p.price, p.image, p.category
              FROM tbl_carrito c
              JOIN tbl_products p ON c.producto_id = p.id";
    $resultado = mysqli_query($con, $query);

    $carrito = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $carrito[] = $fila;
    }
    // Enviar la respuesta en formato JSON
    echo json_encode($carrito);
    exit(); // Finaliza el script después de enviar la respuesta
}


/**
 * Eliminar un producto del carrito por su ID
 * @param $id ID del producto
 */
if ($action == 'removeProductCart') {
    $id = validarProductoID($data, $con); // Se pasa la conexión como parámetro

    // Verificar si el producto está en el carrito
    $queryCheck = "SELECT cantidad FROM $tbl_carrito WHERE id = $id";
    $resultCheck = mysqli_query($con, $queryCheck);
    $row = mysqli_fetch_assoc($resultCheck);

    if ($row) {
        if ($row['cantidad'] > 1) {
            // Reducir cantidad
            $queryUpdate = "UPDATE $tbl_carrito SET cantidad = cantidad - $cantidad WHERE id = $id";
            mysqli_query($con, $queryUpdate);
        } else {
            // Eliminar producto
            $queryDelete = "DELETE FROM $tbl_carrito WHERE id = $id";
            mysqli_query($con, $queryDelete);
        }
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Producto no encontrado"]);
    }
    exit();
}

// Cerrar la conexión
mysqli_close($con);
