<?php
session_start();
require_once '../includes/db.php';
require_once '../includes/auth_functions.php';

if (!usuarioEstaAutenticado()) {
    header('Location: login.php');
    exit;
}

$usuario = obtenerUsuario($conn, $_SESSION['usuario_id']);
?>

<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Cuenta | Papelería Tony</title>
    <link rel="stylesheet" href="../estilos.css">
    <link rel="stylesheet" href="../css/auth.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Barra de navegación igual que en index.html -->
    <header class="header">
        <div class="logo">
            <a href="../index.html"><img src="../img/logo.png" alt="Papelería Tony"></a>
        </div>
        <nav class="navbar">
            <ul>
                <li onmouseover="mostrarSubmenu(1)" onmouseout="ocultarSubmenu(1)">
                    <a href="../index.html">Inicio</a>
                    <div id="subseccion1" class="submenu">
                        <a href="../index.html#destacados">Productos destacados</a>
                        <a href="../index.html#nuevos">Nuevos productos</a>
                        <a href="../index.html#ofertas">Ofertas especiales</a>
                    </div>
                </li>
                <li onmouseover="mostrarSubmenu(2)" onmouseout="ocultarSubmenu(2)">
                    <a href="../regreso-clases.html">Regreso a Clases</a>
                    <div id="subseccion2" class="submenu">
                        <a href="../regreso-clases.html#cuadernos">Cuadernos</a>
                        <a href="../regreso-clases.html#utiles">Útiles</a>
                        <a href="../regreso-clases.html#mochilas">Mochilas</a>
                        <a href="../regreso-clases.html#paquetes">Paquetes escolares</a>
                    </div>
                </li>
                <li onmouseover="mostrarSubmenu(3)" onmouseout="ocultarSubmenu(3)">
                    <a href="../tecnologia.html">Tecnología</a>
                    <div id="subseccion3" class="submenu">
                        <a href="../tecnologia.html#computo">Cómputo</a>
                        <a href="../tecnologia.html#tablets">Tablets</a>
                        <a href="../tecnologia.html#accesorios">Accesorios</a>
                    </div>
                </li>
                <li><a href="../regalos.html">Regalos</a></li>
                <li><a href="../remates.html">Remates</a></li>
                <li><a href="../sucursales.html">Sucursales</a></li>
            </ul>
        </nav>
        <div class="header-icons">
            <a href="#" id="search-btn"><i class="fas fa-search"></i></a>
            <a href="configuracion.php" id="user-btn" title="<?= htmlspecialchars($usuario['nombre']) ?>"><i class="fas fa-user"></i></a>
            <a href="../carrito.html" id="cart-btn">
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-count">0</span>
            </a>
        </div>
        <!-- Barra de búsqueda -->
        <div id="search-bar" class="search-bar">
            <input type="text" placeholder="Buscar productos...">
            <button><i class="fas fa-search"></i></button>
        </div>
    </header>

    <div class="dashboard-container" style="margin-top: 40px;">
        <div class="dashboard-content">
            <div class="sidebar">
                <div class="user-profile">
                    <div class="avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h3><?= htmlspecialchars($usuario['nombre']) ?></h3>
                    <p><?= htmlspecialchars($usuario['email']) ?></p>
                </div>
                
                <nav class="dashboard-nav">
                    <a href="dashboard.php" class="active"><i class="fas fa-home"></i> Resumen</a>
                    <a href="pedidos.php"><i class="fas fa-shopping-bag"></i> Mis Pedidos</a>
                    <a href="direcciones.php"><i class="fas fa-map-marker-alt"></i> Direcciones</a>
                    <a href="configuracion.php"><i class="fas fa-cog"></i> Configuración</a>
                    <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
                </nav>
            </div>
            
            <div class="main-content">
                <h2>Bienvenido, <?= htmlspecialchars($usuario['nombre']) ?></h2>
                <p>Aquí puedes gestionar tu cuenta y ver tus pedidos recientes.</p>
                
                <div class="dashboard-cards">
                    <div class="card">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Mis Pedidos</h3>
                        <p>Revisa el estado de tus pedidos</p>
                        <a href="pedidos.php" class="btn btn-small">Ver Pedidos</a>
                    </div>
                    
                    <div class="card">
                        <i class="fas fa-user"></i>
                        <h3>Mi Perfil</h3>
                        <p>Actualiza tu información personal</p>
                        <a href="configuracion.php" class="btn btn-small">Editar Perfil</a>
                    </div>
                    
                    <div class="card">
                        <i class="fas fa-map-marker-alt"></i>
                        <h3>Direcciones</h3>
                        <p>Gestiona tus direcciones de envío</p>
                        <a href="direcciones.php" class="btn btn-small">Administrar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../main.js"></script>
</body>
</html>