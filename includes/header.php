<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_functions.php';

$carritoCount = 0;
if (usuarioEstaAutenticado()) {
    $carrito = obtenerCarritoUsuario($conn, $_SESSION['usuario_id']);
    $carritoCount = count($carrito);
} elseif (isset($_SESSION['carrito'])) {
    $carritoCount = count($_SESSION['carrito']);
}
?>
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Papelería Tony</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <a href="index.php"><img src="img/logo.png" alt="Papelería Tony"></a>
        </div>
        <nav class="navbar">
            <ul>
                <li><a href="index.php">Inicio</a></li>
                <li><a href="regreso-clases.php">Regreso a Clases</a></li>
                <li><a href="tecnologia.php">Tecnología</a></li>
                <li><a href="regalos.php">Regalos</a></li>
                <li><a href="remates.php">Remates</a></li>
                <li><a href="sucursales.php">Sucursales</a></li>
            </ul>
        </nav>
        <div class="header-icons">
            <a href="#" id="search-btn"><i class="fas fa-search"></i></a>
            
            <?php if (usuarioEstaAutenticado()): ?>
                <a href="auth/dashboard.php" id="user-btn"><i class="fas fa-user"></i> Mi Cuenta</a>
                <a href="auth/logout.php" id="logout-btn"><i class="fas fa-sign-out-alt"></i></a>
            <?php else: ?>
                <a href="auth/login.php" id="user-btn"><i class="fas fa-user"></i> Iniciar Sesión</a>
            <?php endif; ?>
            
            <a href="carrito.php" id="cart-btn">
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-count"><?= $carritoCount ?></span>
            </a>
        </div>
        
        <div id="search-bar" class="search-bar">
            <input type="text" placeholder="Buscar productos...">
            <button><i class="fas fa-search"></i></button>
        </div>
    </header>