<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/auth_functions.php';

// Obtener el carrito del usuario o crear uno nuevo
if (usuarioEstaAutenticado()) {
    // Si el usuario está logueado, obtener el carrito de la base de datos
    $stmt = $conn->prepare("SELECT carrito FROM usuarios WHERE id = ?");
    $stmt->execute([$_SESSION['usuario_id']]);
    $carrito = $stmt->fetchColumn();
    $carrito = $carrito ? json_decode($carrito, true) : [];
} else {
    // Si no está logueado, usar el carrito de la sesión
    $carrito = $_SESSION['carrito'] ?? [];
}

// Procesar acciones del carrito
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $productId = $_POST['product_id'] ?? 0;
    
    switch ($action) {
        case 'add':
            // Añadir producto al carrito
            $producto = [
                'id' => $_POST['product_id'],
                'nombre' => $_POST['product_name'],
                'precio' => $_POST['product_price'],
                'imagen' => $_POST['product_image'],
                'cantidad' => $_POST['quantity'] ?? 1
            ];
            
            // Verificar si el producto ya está en el carrito
            $index = array_search($productId, array_column($carrito, 'id'));
            
            if ($index !== false) {
                // Actualizar cantidad
                $carrito[$index]['cantidad'] += $producto['cantidad'];
            } else {
                // Añadir nuevo producto
                $carrito[] = $producto;
            }
            break;
            
        case 'remove':
            // Eliminar producto del carrito
            $carrito = array_filter($carrito, function($item) use ($productId) {
                return $item['id'] != $productId;
            });
            break;
            
        case 'update':
            // Actualizar cantidad
            $quantity = $_POST['quantity'] ?? 1;
            $index = array_search($productId, array_column($carrito, 'id'));
            
            if ($index !== false) {
                $carrito[$index]['cantidad'] = $quantity;
            }
            break;
            
        case 'clear':
            // Vaciar carrito
            $carrito = [];
            break;
    }
    
    // Guardar carrito actualizado
    if (usuarioEstaAutenticado()) {
        // Guardar en base de datos
        $stmt = $conn->prepare("UPDATE usuarios SET carrito = ? WHERE id = ?");
        $stmt->execute([json_encode($carrito), $_SESSION['usuario_id']]);
    } else {
        // Guardar en sesión
        $_SESSION['carrito'] = $carrito;
    }
    
    // Redirigir para evitar reenvío del formulario
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit;
}

// Mostrar el carrito
// ... (tu código existente para mostrar el carrito)
?>