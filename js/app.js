// =================================================
// Script principal para index.html
// =================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  cargarParquesDestacados();
  cargarPromocionesActivas();
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
// Cargar Parques Destacados (Primeros 3)
// =================================================

async function cargarParquesDestacados() {
  const container = document.getElementById('parquesDestacados');
  
  try {
    const parques = await getParques();
    
    if (parques.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay parques disponibles</h3>
          <p>Pronto agregaremos más parques acuáticos</p>
        </div>
      `;
      return;
    }

    // Mostrar solo los primeros 3 parques
    const parquesDestacados = parques.slice(0, 3);
    
    container.innerHTML = parquesDestacados.map(parque => `
      <div class="card">
        <img src="${parque.imagen_principal}" alt="${parque.nombre}" class="card-image">
        <div class="card-content">
          <h3 class="card-title">${parque.nombre}</h3>
          <p class="card-subtitle">📍 ${parque.departamento}</p>
          <p class="card-description">${parque.descripcion}</p>
          <div class="card-info">
            <span class="card-price">Bs. ${parque.costo_entrada}</span>
            <a href="paginas/parques.html" class="btn btn-secondary btn-sm">Ver Detalles</a>
          </div>
        </div>
      </div>
    `).join('');

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
// Cargar Promociones Activas
// =================================================

async function cargarPromocionesActivas() {
  const container = document.getElementById('promocionesActivas');
  
  try {
    const promociones = await getPromociones();
    
    // Filtrar solo promociones activas y vigentes
    const promocionesActivas = promociones.filter(promo => {
      const hoy = new Date();
      const fechaInicio = new Date(promo.fecha_inicio);
      const fechaFin = new Date(promo.fecha_fin);
      return promo.estado === 'Activa' && hoy >= fechaInicio && hoy <= fechaFin;
    });

    if (promocionesActivas.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay promociones activas</h3>
          <p>Pronto tendremos nuevas promociones para ti</p>
        </div>
      `;
      return;
    }

    // Mostrar solo las primeras 3 promociones
    const promosMostrar = promocionesActivas.slice(0, 3);

    container.innerHTML = promosMostrar.map(promo => `
      <div class="card">
        <img src="${promo.imagen}" alt="${promo.titulo}" class="card-image">
        <div class="card-content">
          <h3 class="card-title">${promo.titulo}</h3>
          <p class="card-subtitle">
            📍 ${promo.departamento} • ${promo.parque_nombre}
          </p>
          <p class="card-description">${promo.descripcion.substring(0, 100)}...</p>
          <div class="card-info">
            <span class="card-price">${promo.porcentaje_descuento}% OFF</span>
            <span class="card-badge badge-activa">Activa</span>
          </div>
          <a href="paginas/promociones.html" class="btn btn-secondary btn-sm mt-2" style="width: 100%;">
            Obtener Promoción
          </a>
        </div>
      </div>
    `).join('');

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
