// =================================================
// Script para página de Parques
// =================================================

let todosLosParques = [];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  cargarParques();
  initBusquedaYFiltros();
  initModal();
});

// =================================================
// Navbar Toggle
// =================================================

function initNavbar() {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  }
}

// =================================================
// Cargar Todos los Parques
// =================================================

async function cargarParques() {
  const container = document.getElementById('parquesContainer');
  
  try {
    todosLosParques = await getParques();
    
    if (todosLosParques.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay parques disponibles</h3>
          <p>Pronto agregaremos más parques acuáticos</p>
        </div>
      `;
      return;
    }

    mostrarParques(todosLosParques);

  } catch (error) {
    console.error('Error al cargar parques:', error);
    container.innerHTML = `
      <div class="empty-state">
        <h3>Error al cargar parques</h3>
        <p>Por favor, intenta más tarde</p>
      </div>
    `;
  }
}

// =================================================
// Mostrar Parques en el DOM
// =================================================

function mostrarParques(parques) {
  const container = document.getElementById('parquesContainer');
  
  if (parques.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No se encontraron parques</h3>
        <p>Intenta con otros filtros de búsqueda</p>
      </div>
    `;
    return;
  }

  container.innerHTML = parques.map(parque => `
    <div class="card" onclick="abrirDetalle(${parque.id})">
      <img src="${parque.imagen_principal}" alt="${parque.nombre}" class="card-image">
      <div class="card-content">
        <h3 class="card-title">${parque.nombre}</h3>
        <p class="card-subtitle">📍 ${parque.departamento}</p>
        <p class="card-description">${parque.descripcion}</p>
        <div class="card-info">
          <span class="card-price">Bs. ${parque.costo_entrada}</span>
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); abrirDetalle(${parque.id})">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// =================================================
// Búsqueda y Filtros
// =================================================

function initBusquedaYFiltros() {
  const searchInput = document.getElementById('searchInput');
  const departamentoFilter = document.getElementById('departamentoFilter');

  searchInput.addEventListener('input', filtrarParques);
  departamentoFilter.addEventListener('change', filtrarParques);
}

function filtrarParques() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const departamento = document.getElementById('departamentoFilter').value;

  let parquesFiltrados = todosLosParques;

  // Filtrar por búsqueda de texto
  if (searchTerm) {
    parquesFiltrados = parquesFiltrados.filter(parque => 
      parque.nombre.toLowerCase().includes(searchTerm) ||
      parque.descripcion.toLowerCase().includes(searchTerm)
    );
  }

  // Filtrar por departamento
  if (departamento) {
    parquesFiltrados = parquesFiltrados.filter(parque => 
      parque.departamento === departamento
    );
  }

  mostrarParques(parquesFiltrados);
}

// =================================================
// Modal de Detalles
// =================================================

function initModal() {
  const modal = document.getElementById('detalleModal');
  const closeBtn = document.getElementById('closeModal');

  closeBtn.addEventListener('click', cerrarModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });
}

async function abrirDetalle(id) {
  const parque = todosLosParques.find(p => p.id === id);
  
  if (!parque) return;

  // Llenar el modal con los datos
  document.getElementById('modalImagen').src = parque.imagen_principal;
  document.getElementById('modalImagen').alt = parque.nombre;
  document.getElementById('modalNombre').textContent = parque.nombre;
  document.getElementById('modalUbicacion').textContent = parque.ubicacion || 'Ubicación no disponible';
  document.getElementById('modalDescripcionCompleta').textContent = parque.descripcion_completa || parque.descripcion;
  document.getElementById('modalHorario').textContent = `${parque.horario_entrada} - ${parque.horario_salida}`;
  document.getElementById('modalPrecio').textContent = `Bs. ${parque.costo_entrada}`;

  // Configurar enlace de Google Maps
  const mapsLink = document.getElementById('modalMapsLink');
  if (parque.ubicacion) {
    const ubicacionEncoded = encodeURIComponent(parque.ubicacion);
    mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${ubicacionEncoded}`;
  } else {
    mapsLink.style.display = 'none';
  }

  // Mostrar atracciones
  const atraccionesContainer = document.getElementById('modalAtracciones');
  const iconos = {
    'Piscinas': '🏊‍♂️',
    'Toboganes': '🎢',
    'Piscinas climatizadas': '🌡️',
    'Restaurantes': '🍽️',
    'Áreas VIP': '⭐',
    'Zonas familiares': '👨‍👩‍👧‍👦',
    'Saunas': '🧖',
    'Juegos infantiles': '🎠'
  };

  if (parque.atracciones && parque.atracciones.length > 0) {
    atraccionesContainer.innerHTML = parque.atracciones.map(atraccion => `
      <div class="atraccion-item">
        ${iconos[atraccion] || '🎯'}
        <br>
        ${atraccion}
      </div>
    `).join('');
  } else {
    atraccionesContainer.innerHTML = '<p>No hay atracciones registradas</p>';
  }

  // Mostrar el modal
  document.getElementById('detalleModal').classList.add('active');
}

function cerrarModal() {
  document.getElementById('detalleModal').classList.remove('active');
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});
