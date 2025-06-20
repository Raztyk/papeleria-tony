// Funciones específicas para la página del Carrito
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el carrito desde localStorage
    loadCart();
    
    // Configurar eventos
    setupEvents();
    
    // Mostrar mensaje de bienvenida específico
    console.log('Página del Carrito cargada');
});

// Función para cargar el carrito
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartProducts = document.getElementById('cart-products');
    const itemsCount = document.getElementById('items-count');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    // Actualizar contador
    itemsCount.textContent = cart.length;
    cartCount.textContent = cart.length;
    
    // Mostrar carrito vacío si no hay productos
    if (cart.length === 0) {
        cartProducts.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <a href="index.html" class="btn">Ir a comprar</a>
            </div>
        `;
        updateTotals(0, 0);
        return;
    }
    
    // Generar HTML para cada producto
    let productsHTML = '';
    let subtotal = 0;
    
    cart.forEach((product, index) => {
        subtotal += product.precio;
        
        productsHTML += `
            <div class="cart-product" data-index="${index}">
                <div class="cart-product-image">
                    <img src="${product.imagen}" alt="${product.nombre}">
                </div>
                <div class="cart-product-info">
                    <h3 class="cart-product-title">${product.nombre}</h3>
                    <div class="cart-product-actions">
                        <a href="#" class="remove-product" data-index="${index}">Eliminar</a>
                    </div>
                </div>
                <div class="cart-product-price">
                    <span class="price">$${product.precio.toFixed(2)}</span>
                    <div class="quantity-selector">
                        <button class="decrease-qty">-</button>
                        <input type="number" value="1" min="1" class="product-qty">
                        <button class="increase-qty">+</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartProducts.innerHTML = productsHTML;
    updateTotals(subtotal, 0);
}

// Función para configurar eventos
function setupEvents() {
    // Vaciar carrito
    document.getElementById('clear-cart').addEventListener('click', function(e) {
        e.preventDefault();
        clearCart();
    });
    
    // Aplicar cupón
    document.getElementById('apply-coupon').addEventListener('click', applyCoupon);
    
    // Proceder al pago
    document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
    
    // Regresar al carrito
    document.getElementById('back-to-cart').addEventListener('click', backToCart);
    
    // Enviar formulario de envío
    document.getElementById('shipping-form').addEventListener('submit', processShipping);
}

// Función para eliminar producto del carrito
function removeProduct(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para vaciar el carrito
function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
        localStorage.removeItem('cart');
        loadCart();
    }
}

// Función para aplicar cupón de descuento
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();
    const discountRow = document.getElementById('discount-row');
    const discountElement = document.getElementById('discount');
    
    // Cupones válidos (en una aplicación real, esto vendría de una API)
    const validCoupons = {
        'TONY10': 0.1,   // 10% de descuento
        'TONY20': 0.2,   // 20% de descuento
        'ENVIOGRATIS': 'free-shipping' // Envío gratis
    };
    
    if (!couponCode) {
        alert('Por favor ingresa un código de descuento');
        return;
    }
    
    if (validCoupons[couponCode]) {
        const discount = validCoupons[couponCode];
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = cart.reduce((sum, product) => sum + product.precio, 0);
        
        if (typeof discount === 'number') {
            const discountAmount = subtotal * discount;
            discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
            discountRow.style.display = 'flex';
            
            // Actualizar totales
            const shipping = parseFloat(document.getElementById('shipping').textContent.replace('$', ''));
            updateTotals(subtotal, shipping, discountAmount);
            
            showNotification(`Cupón aplicado: ${discount * 100}% de descuento`);
        } else if (discount === 'free-shipping') {
            document.getElementById('shipping').textContent = '$0.00';
            discountRow.style.display = 'none';
            
            // Actualizar totales
            updateTotals(subtotal, 0);
            
            showNotification('¡Envío gratis aplicado!');
        }
    } else {
        alert('Código de descuento no válido');
    }
}

// Función para actualizar totales
function updateTotals(subtotal, shipping, discount = 0) {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    
    // Solo actualizar envío si no es un descuento de envío gratis
    if (shipping !== null) {
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
    }
    
    const total = subtotal + shipping - discount;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Función para proceder al checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Ocultar carrito y mostrar formulario de envío
    document.querySelector('.cart-container').style.display = 'none';
    document.getElementById('shipping-section').style.display = 'block';
    
    // Actualizar progreso
    document.querySelectorAll('.progress-steps .step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('.progress-steps .step')[1].classList.add('active');
}

// Función para regresar al carrito
function backToCart() {
    document.querySelector('.cart-container').style.display = 'block';
    document.getElementById('shipping-section').style.display = 'none';
    
    // Actualizar progreso
    document.querySelectorAll('.progress-steps .step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector('.progress-steps .step:first-child').classList.add('active');
}

// Función para procesar el formulario de envío
function processShipping(e) {
    e.preventDefault();
    
    // Validar formulario
    const form = e.target;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Aquí normalmente se enviarían los datos a un servidor
    // Por ahora solo mostramos un mensaje
    alert('Formulario enviado correctamente. Redirigiendo a pasarela de pago...');
    
    // Redirigir a página de pago (simulado)
    setTimeout(() => {
        window.location.href = 'pago.html'; // Esta página no existe en nuestro proyecto
    }, 1000);
}

// Función para mostrar notificación
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

// Delegación de eventos para productos dinámicos
document.addEventListener('click', function(e) {
    // Eliminar producto
    if (e.target.classList.contains('remove-product')) {
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
        removeProduct(index);
    }
    
    // Aumentar cantidad
    if (e.target.classList.contains('increase-qty')) {
        const input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateProductPrice(e.target.closest('.cart-product'));
    }
    
    // Disminuir cantidad
    if (e.target.classList.contains('decrease-qty')) {
        const input = e.target.nextElementSibling;
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            updateProductPrice(e.target.closest('.cart-product'));
        }
    }
});

// Función para actualizar precio cuando cambia la cantidad
function updateProductPrice(productElement) {
    const index = productElement.getAttribute('data-index');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = parseInt(productElement.querySelector('.product-qty').value);
    const priceElement = productElement.querySelector('.price');
    
    // En un caso real, podríamos tener precios diferentes por cantidad
    // Aquí simplemente multiplicamos por la cantidad
    const newPrice = cart[index].precio * quantity;
    priceElement.textContent = `$${newPrice.toFixed(2)}`;
    
    // Actualizar subtotal
    let subtotal = 0;
    document.querySelectorAll('.cart-product').forEach(product => {
        const priceText = product.querySelector('.price').textContent.replace('$', '');
        subtotal += parseFloat(priceText);
    });
    
    const shipping = parseFloat(document.getElementById('shipping').textContent.replace('$', ''));
    updateTotals(subtotal, shipping);
}