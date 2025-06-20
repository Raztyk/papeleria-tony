// Funciones específicas para la página de Regalos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar pestañas de precio
    initPriceTabs();
    
    // Inicializar slider de productos populares
    initPopularSlider();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Configurar botones de servicio de regalo
    setupGiftServices();
    
    // Mostrar mensaje de bienvenida específico
    console.log('Página de Regalos cargada');
});

// Función para inicializar las pestañas de precio
function initPriceTabs() {
    const priceTabs = document.querySelectorAll('.price-tab');
    
    priceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todos los botones y contenidos
            document.querySelectorAll('.price-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.price-content').forEach(c => c.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const priceRange = this.dataset.price;
            document.getElementById(priceRange).classList.add('active');
        });
    });
}

// Función para inicializar el slider de productos populares
function initPopularSlider() {
    const track = document.querySelector('.popular-track');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const slideWidth = 280 + 30; // Ancho del slide + gap
    
    prevBtn.addEventListener('click', function() {
        track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', function() {
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });
}

// Función para configurar los servicios de regalo
function setupGiftServices() {
    document.querySelectorAll('.gift-service .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('h3').textContent;
            showNotification(`Servicio "${serviceTitle}" agregado a tu compra`);
        });
    });
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Función para agregar al carrito (consistente con main.js)
function agregarAlCarrito(id, nombre, precio, imagen) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, nombre, precio, imagen });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Mostrar notificación
    showNotification(`${nombre} añadido al carrito`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}