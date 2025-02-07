<?php

/**
 * Creando una API RESTful con los métodos GET, POST, PUT y DELETE utilizando PHP y MySQLi
 */
// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require('configBD.php');
$METHOD = $_SERVER['REQUEST_METHOD'];
$tbl_productos = 'tbl_products';
$tbl_carrito='tbl_carrito';
$action = isset($_GET['action']) ? $_GET['action'] : '';


if($action == 'getProducts'){
    $query = "SELECT * FROM $tbl_productos";
    $resultado = mysqli_query($con, $query);

    $usuarios = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $usuarios[] = $fila;
    }
    echo json_encode($usuarios);
    exit();
}

/**
 * Agregar un producto al carrito, si ya existe, aumentar la cantidad
 * @param $id ID del producto
 * @param $cantidad Cantidad del producto
 */
if ($action == 'addToCart') {
    // Obtener los datos enviados en la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Validar que los datos sean correctos
    if (!isset($data['id']) || !is_numeric($data['id'])) {
        echo json_encode(['error' => 'ID de producto inválido']);
        exit;
    }

    // Escapar el ID del producto
    $id = mysqli_real_escape_string($con, $data['id']);
    $cantidad = 1;

    // Verificar si el producto ya está en el carrito
    $checkQuery = "SELECT id, cantidad FROM $tbl_carrito WHERE producto_id = '$id'";
    $result = mysqli_query($con, $checkQuery);

    if ($row = mysqli_fetch_assoc($result)) {
        // Si ya existe, actualizar la cantidad
        $newCantidad = $row['cantidad'] + 1;
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
    exit; // 🔹 Importante para evitar contenido extra en la respuesta
}


/**
 * Obtener los productos del carrito
 */
if ($action == 'getCart') {
    $query = "SELECT c.id, c.producto_id, p.name, p.price, p.image, c.cantidad, c.agregado_en 
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



if ($action == 'removeFromCart') {
    require_once 'conexion.php';

    // Leer datos JSON del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
        echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
        exit();
    }

    $id = intval($data['id']);

    // Verificar si el producto tiene más de 1 unidad en el carrito
    $queryCheck = "SELECT cantidad FROM carrito WHERE id = $id";
    $resultCheck = mysqli_query($con, $queryCheck);
    $row = mysqli_fetch_assoc($resultCheck);

    if ($row) {
        if ($row['cantidad'] > 1) {
            // Reducir cantidad en 1
            $queryUpdate = "UPDATE carrito SET cantidad = cantidad - 1 WHERE id = $id";
            mysqli_query($con, $queryUpdate);
        } else {
            // Eliminar el producto si solo hay 1
            $queryDelete = "DELETE FROM carrito WHERE id = $id";
            mysqli_query($con, $queryDelete);
        }
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Producto no encontrado"]);
    }
    exit();
}


mysqli_close($con);
