// =================================================
// Script para página de Promociones
// =================================================

let todasLasPromociones = [];
let promocionSeleccionada = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  cargarPromociones();
  initFiltros();
  initModal();
  initFormulario();
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
// Cargar Todas las Promociones
// =================================================

async function cargarPromociones() {
  const container = document.getElementById('promocionesContainer');
  
  try {
    todasLasPromociones = await getPromociones();
    
    if (todasLasPromociones.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay promociones disponibles</h3>
          <p>Pronto tendremos nuevas ofertas para ti</p>
        </div>
      `;
      return;
    }

    mostrarPromociones(todasLasPromociones);

  } catch (error) {
    console.error('Error al cargar promociones:', error);
    container.innerHTML = `
      <div class="empty-state">
        <h3>Error al cargar promociones</h3>
        <p>Por favor, intenta más tarde</p>
      </div>
    `;
  }
}

// =================================================
// Mostrar Promociones en el DOM
// =================================================

function mostrarPromociones(promociones) {
  const container = document.getElementById('promocionesContainer');
  
  if (promociones.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No se encontraron promociones</h3>
        <p>Intenta con otros filtros de búsqueda</p>
      </div>
    `;
    return;
  }

  container.innerHTML = promociones.map(promo => {
    const hoy = new Date();
    const fechaInicio = new Date(promo.fecha_inicio);
    const fechaFin = new Date(promo.fecha_fin);
    const estaVigente = hoy >= fechaInicio && hoy <= fechaFin;
    const estaActiva = promo.estado === 'Activa' && estaVigente;
    
    return `
      <div class="card">
        <img src="${promo.imagen}" alt="${promo.titulo}" class="card-image">
        <div class="card-content">
          <h3 class="card-title">${promo.titulo}</h3>
          <p class="card-subtitle">
            📍 ${promo.departamento} • ${promo.parque_nombre}
          </p>
          <p class="card-description">${promo.descripcion}</p>
          
          <div class="modal-section mt-2">
            <p style="font-size: 0.9rem; color: var(--gris-medio);">
              📅 Válido del ${formatearFecha(promo.fecha_inicio)} al ${formatearFecha(promo.fecha_fin)}
            </p>
          </div>
          
          <div class="card-info">
            <span class="card-price">${promo.porcentaje_descuento}% OFF</span>
            <span class="card-badge ${estaActiva ? 'badge-activa' : 'badge-inactiva'}">
              ${estaActiva ? 'Activa' : 'Inactiva'}
            </span>
          </div>
          
          <button 
            class="btn btn-secondary mt-2" 
            style="width: 100%;"
            onclick="abrirSolicitud(${promo.id})"
            ${!estaActiva ? 'disabled' : ''}
          >
            ${estaActiva ? 'Obtener Promoción' : 'Promoción Vencida'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// =================================================
// Filtros
// =================================================

function initFiltros() {
  const departamentoFilter = document.getElementById('departamentoFilter');
  const estadoFilter = document.getElementById('estadoFilter');

  departamentoFilter.addEventListener('change', filtrarPromociones);
  estadoFilter.addEventListener('change', filtrarPromociones);
}

function filtrarPromociones() {
  const departamento = document.getElementById('departamentoFilter').value;
  const estado = document.getElementById('estadoFilter').value;

  let promocionesFiltradas = todasLasPromociones;

  // Filtrar por departamento
  if (departamento) {
    promocionesFiltradas = promocionesFiltradas.filter(promo => 
      promo.departamento === departamento
    );
  }

  // Filtrar por estado
  if (estado === 'activas') {
    promocionesFiltradas = promocionesFiltradas.filter(promo => {
      const hoy = new Date();
      const fechaInicio = new Date(promo.fecha_inicio);
      const fechaFin = new Date(promo.fecha_fin);
      return promo.estado === 'Activa' && hoy >= fechaInicio && hoy <= fechaFin;
    });
  } else if (estado === 'inactivas') {
    promocionesFiltradas = promocionesFiltradas.filter(promo => {
      const hoy = new Date();
      const fechaInicio = new Date(promo.fecha_inicio);
      const fechaFin = new Date(promo.fecha_fin);
      return promo.estado === 'Inactiva' || hoy < fechaInicio || hoy > fechaFin;
    });
  }

  mostrarPromociones(promocionesFiltradas);
}

// =================================================
// Modal de Solicitud
// =================================================

function initModal() {
  const modal = document.getElementById('solicitudModal');
  const closeBtn = document.getElementById('closeSolicitudModal');

  closeBtn.addEventListener('click', cerrarModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });
}

function abrirSolicitud(id) {
  promocionSeleccionada = todasLasPromociones.find(p => p.id === id);
  
  if (!promocionSeleccionada) return;

  // Llenar campos ocultos
  document.getElementById('promocionId').value = promocionSeleccionada.id;
  document.getElementById('promocionTitulo').value = promocionSeleccionada.titulo;

  // Mostrar el modal
  document.getElementById('solicitudModal').classList.add('active');
}

function cerrarModal() {
  document.getElementById('solicitudModal').classList.remove('active');
  document.getElementById('solicitudForm').reset();
}

// =================================================
// Formulario de Solicitud
// =================================================

function initFormulario() {
  const form = document.getElementById('solicitudForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      promocion_id: parseInt(document.getElementById('promocionId').value),
      promocion_titulo: document.getElementById('promocionTitulo').value,
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      mensaje: document.getElementById('mensaje').value || null
    };

    try {
      const result = await createSolicitud(formData);
      
      if (result) {
        alert('¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.');
        cerrarModal();
      } else {
        alert('Error al enviar la solicitud. Por favor, intenta nuevamente.');
      }
      
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, intenta nuevamente.');
    }
  });
}

// =================================================
// Utilidades
// =================================================

function formatearFecha(fecha) {
  const date = new Date(fecha);
  const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('es-BO', opciones);
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});
