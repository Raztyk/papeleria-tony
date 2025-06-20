// Funciones específicas para la página de Tecnología
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar filtros
    initFilters();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Mostrar mensaje de bienvenida específico
    console.log('Página de Tecnología cargada');
});

// Función para inicializar los filtros
function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const resetBtn = document.getElementById('reset-filters');
    
    // Aplicar filtros cuando cambian los selectores
    [categoryFilter, priceFilter, brandFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Restablecer filtros
    resetBtn.addEventListener('click', function() {
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        brandFilter.value = 'all';
        applyFilters();
    });
    
    function applyFilters() {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const brand = brandFilter.value;
        
        document.querySelectorAll('.product-card').forEach(card => {
            const cardCategory = card.dataset.category;
            const cardPrice = parseFloat(card.dataset.price);
            const cardBrand = card.dataset.brand;
            
            // Verificar filtros
            const categoryMatch = category === 'all' || cardCategory === category;
            const priceMatch = checkPriceMatch(priceRange, cardPrice);
            const brandMatch = brand === 'all' || cardBrand === brand;
            
            // Mostrar/ocultar según coincidan los filtros
            if (categoryMatch && priceMatch && brandMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function checkPriceMatch(range, price) {
        if (range === 'all') return true;
        
        const [min, max] = range.split('-').map(Number);
        
        if (range.endsWith('+')) {
            return price >= min;
        } else {
            return price >= min && price <= max;
        }
    }
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