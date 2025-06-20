// Función para mostrar/ocultar submenús
function mostrarSubmenu(num) {
    document.getElementById(`subseccion${num}`).style.display = 'block';
}

function ocultarSubmenu(num) {
    document.getElementById(`subseccion${num}`).style.display = 'none';
}

// Función para el carrusel hero
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicators span');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    function prevSlide() {
        let newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    // Configurar botones
    document.querySelector('.next-slide').addEventListener('click', nextSlide);
    document.querySelector('.prev-slide').addEventListener('click', prevSlide);
    
    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto avanzar
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar al pasar el mouse
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
    hero.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Función para la barra de búsqueda
function initSearchBar() {
    const searchBtn = document.getElementById('search-btn');
    const searchBar = document.getElementById('search-bar');
    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
    });
}

// Función para el carrito
function initCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart.length);
}

function updateCartCount(count) {
    document.getElementById('cart-count').textContent = count;
}

// Función para agregar al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, nombre, precio, imagen });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart.length);
    
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

// Función para el carrusel de productos
function initProductsCarousel() {
    const container = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    // Datos de ejemplo para nuevos productos
    const newProducts = [
        { id: 10, nombre: 'Calculadora científica', precio: 399, imagen: 'img/producto3.jpg' },
        { id: 11, nombre: 'Estuche de geometría', precio: 199, imagen: 'img/producto4.jpg' },
        { id: 12, nombre: 'Plumones colores pastel', precio: 249, imagen: 'img/producto5.jpg' },
        { id: 13, nombre: 'Libreta profesional', precio: 179, imagen: 'img/producto6.jpg' },
        { id: 14, nombre: 'Tijeras ergonómicas', precio: 129, imagen: 'img/producto7.jpg' },
    ];
    
    // Generar HTML para productos
    newProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.minWidth = '280px';
        productCard.style.scrollSnapAlign = 'start';
        
        productCard.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <div class="product-price">$${product.precio.toFixed(2)}</div>
                <button class="add-to-cart" onclick="agregarAlCarrito(${product.id}, '${product.nombre}', ${product.precio}, '${product.imagen}')">
                    <i class="fas fa-cart-plus"></i> Añadir al carrito
                </button>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    
    // Configurar navegación del carrusel
    prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initSearchBar();
    initCart();
    initProductsCarousel();
    
    // Mostrar mensaje de carga
    console.log('Sitio de Papelería Tony cargado correctamente');
    
    // Ejemplo de evento onload (de ejerc_script-parte3-eventos.pptx)
    alert('¡Bienvenido a Papelería Tony! Encuentra todo lo que necesitas para el regreso a clases.');
});