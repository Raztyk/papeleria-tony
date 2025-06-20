<?php
function registrarUsuario($conn, $datos) {
    // Validar datos
    if (empty($datos['nombre']) || empty($datos['email']) || empty($datos['password'])) {
        return ['error' => 'Todos los campos son obligatorios'];
    }

    if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
        return ['error' => 'El email no es válido'];
    }

    // Verificar si el email ya existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$datos['email']]);
    
    if ($stmt->rowCount() > 0) {
        return ['error' => 'El email ya está registrado'];
    }

    // Hash de la contraseña
    $hashedPassword = password_hash($datos['password'], PASSWORD_DEFAULT);

    // Insertar nuevo usuario
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, apellidos, email, telefono, direccion, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $datos['nombre'],
        $datos['apellidos'] ?? '',
        $datos['email'],
        $datos['telefono'] ?? '',
        $datos['direccion'] ?? '',
        $hashedPassword
    ]);

    return ['success' => 'Registro exitoso. Ahora puedes iniciar sesión.'];
}

function iniciarSesion($conn, $email, $password) {
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario || !password_verify($password, $usuario['password'])) {
        return ['error' => 'Email o contraseña incorrectos'];
    }

    // Iniciar sesión
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nombre'] = $usuario['nombre'];
    $_SESSION['usuario_email'] = $usuario['email'];
    
    return ['success' => true];
}

function usuarioEstaAutenticado() {
    return isset($_SESSION['usuario_id']);
}

function obtenerUsuario($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
function obtenerCarritoUsuario($conn, $usuarioId) {
    $stmt = $conn->prepare("SELECT carrito FROM usuarios WHERE id = ?");
    $stmt->execute([$usuarioId]);
    $carrito = $stmt->fetchColumn();
    return $carrito ? json_decode($carrito, true) : [];
}
?>