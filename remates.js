// Funciones específicas para la página de Remates
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar contador de ofertas
    initCountdown();
    
    // Inicializar contador de ofertas flash
    initFlashCountdown();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Mostrar mensaje de bienvenida específico
    console.log('Página de Remates cargada');
});

// Función para el contador de ofertas principales
function initCountdown() {
    // Configurar fecha de finalización (3 días desde ahora)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar resultados
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Si el contador termina
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-box h2').textContent = '¡Las ofertas han terminado!';
            document.querySelector('.countdown-box p').style.display = 'none';
            document.querySelector('.countdown-timer').style.display = 'none';
        }
    }
    
    // Ejecutar inmediatamente y luego cada segundo
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
}

// Función para el contador de ofertas flash (12 horas)
function initFlashCountdown() {
    let hours = 12;
    let minutes = 0;
    let seconds = 0;
    
    function updateFlashCountdown() {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
                
                if (hours < 0) {
                    clearInterval(flashTimer);
                    document.querySelector('.section-header h2').textContent = 'Ofertas Flash terminadas';
                    document.querySelector('.flash-countdown').style.display = 'none';
                    return;
                }
            }
        }
        
        // Actualizar display
        document.getElementById('flash-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('flash-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('flash-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Ejecutar cada segundo
    const flashTimer = setInterval(updateFlashCountdown, 1000);
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