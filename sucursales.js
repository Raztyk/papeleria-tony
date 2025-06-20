// Funciones específicas para la página de Sucursales
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    initMap();
    
    // Configurar filtros
    initFilters();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Mostrar mensaje de bienvenida específico
    console.log('Página de Sucursales cargada');
});

// Variables globales para el mapa y marcadores
let map;
let markers = [];

// Función para inicializar el mapa
function initMap() {
    // Coordenadas centrales de México
    map = L.map('map').setView([23.6345, -102.5528], 5);
    
    // Añadir capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Añadir marcadores de sucursales
    addMarkers();
}

// Función para añadir marcadores al mapa
function addMarkers() {
    // Datos de las sucursales (podrían venir de una API en un caso real)
    const branches = [
        {
            name: "Papelería Tony Centro",
            lat: 19.4326,
            lng: -99.1332,
            city: "cdmx",
            services: ["impresiones", "fotocopias", "encuadernacion"],
            phone: "55 1234 5678"
        },
        {
            name: "Papelería Tony Polanco",
            lat: 19.4336,
            lng: -99.1916,
            city: "cdmx",
            services: ["impresiones", "entrega"],
            phone: "55 2345 6789"
        },
        {
            name: "Papelería Tony Monterrey",
            lat: 25.6714,
            lng: -100.3095,
            city: "monterrey",
            services: ["fotocopias", "entrega"],
            phone: "81 3456 7890"
        }
        // Más sucursales...
    ];
    
    // Limpiar marcadores existentes
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Añadir cada sucursal como marcador
    branches.forEach(branch => {
        const marker = L.marker([branch.lat, branch.lng]).addTo(map)
            .bindPopup(`
                <h3>${branch.name}</h3>
                <p><i class="fas fa-phone"></i> ${branch.phone}</p>
                <div class="branch-services">
                    ${branch.services.map(service => `<span class="service-tag">${formatService(service)}</span>`).join('')}
                </div>
            `);
        
        markers.push(marker);
    });
    
    // Ajustar el zoom para mostrar todos los marcadores
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));
    }
}

// Función para formatear nombres de servicios
function formatService(service) {
    const servicesMap = {
        "impresiones": "Impresiones",
        "fotocopias": "Fotocopias",
        "encuadernacion": "Encuadernación",
        "entrega": "Entrega"
    };
    return servicesMap[service] || service;
}

// Función para mostrar una ubicación específica en el mapa
function mostrarEnMapa(lat, lng, title) {
    map.setView([lat, lng], 15);
    
    // Abrir popup del marcador correspondiente
    markers.forEach(marker => {
        const markerLatLng = marker.getLatLng();
        if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
            marker.openPopup();
        }
    });
    
    // Scroll suave al mapa
    document.getElementById('mapa').scrollIntoView({ behavior: 'smooth' });
    
    return false; // Para prevenir el comportamiento default del link
}

// Función para inicializar los filtros
function initFilters() {
    const cityFilter = document.getElementById('city-filter');
    const servicesFilter = document.getElementById('services-filter');
    
    // Aplicar filtros cuando cambian los selectores
    [cityFilter, servicesFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    function applyFilters() {
        const city = cityFilter.value;
        const service = servicesFilter.value;
        
        // Filtrar tarjetas de sucursales
        document.querySelectorAll('.branch-card').forEach(card => {
            const cardCity = card.dataset.city;
            const cardServices = card.dataset.services.split(',');
            
            // Verificar filtros
            const cityMatch = city === 'all' || cardCity === city;
            const serviceMatch = service === 'all' || cardServices.includes(service);
            
            // Mostrar/ocultar según coincidan los filtros
            if (cityMatch && serviceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Filtrar marcadores en el mapa (opcional)
        // Podría implementarse de manera similar
    }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}