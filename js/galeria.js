// =================================================
// Script para página de Galería
// =================================================

let todasLasImagenes = [];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  cargarGaleria();
  initFiltros();
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
// Cargar Todas las Imágenes
// =================================================

async function cargarGaleria() {
  const container = document.getElementById('galeriaContainer');
  
  try {
    todasLasImagenes = await getGaleria();
    
    if (todasLasImagenes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay imágenes disponibles</h3>
          <p>Pronto agregaremos más contenido</p>
        </div>
      `;
      return;
    }

    mostrarGaleria(todasLasImagenes);

  } catch (error) {
    console.error('Error al cargar galería:', error);
    container.innerHTML = `
      <div class="empty-state">
        <h3>Error al cargar galería</h3>
        <p>Por favor, intenta más tarde</p>
      </div>
    `;
  }
}

// =================================================
// Mostrar Galería en el DOM
// =================================================

function mostrarGaleria(imagenes) {
  const container = document.getElementById('galeriaContainer');
  
  if (imagenes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No se encontraron imágenes</h3>
        <p>Intenta con otros filtros de búsqueda</p>
      </div>
    `;
    return;
  }

  container.innerHTML = imagenes.map(imagen => `
    <div class="gallery-item" onclick="abrirImagen(${imagen.id})">
      <img src="${imagen.url}" alt="${imagen.titulo}" class="gallery-image">
      <div class="gallery-overlay">
        <h3 class="gallery-title">${imagen.titulo}</h3>
        <p class="gallery-location">📍 ${imagen.departamento}</p>
      </div>
    </div>
  `).join('');
}

// =================================================
// Filtros
// =================================================

function initFiltros() {
  const departamentoFilter = document.getElementById('departamentoFilter');
  departamentoFilter.addEventListener('change', filtrarGaleria);
}

function filtrarGaleria() {
  const departamento = document.getElementById('departamentoFilter').value;
  
  let imagenesFiltradas = todasLasImagenes;

  // Filtrar por departamento
  if (departamento) {
    imagenesFiltradas = imagenesFiltradas.filter(imagen => 
      imagen.departamento === departamento
    );
  }

  mostrarGaleria(imagenesFiltradas);
}

// =================================================
// Modal de Imagen
// =================================================

function initModal() {
  const modal = document.getElementById('imagenModal');
  const closeBtn = document.getElementById('closeModal');

  closeBtn.addEventListener('click', cerrarModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });
}

function abrirImagen(id) {
  const imagen = todasLasImagenes.find(img => img.id === id);
  
  if (!imagen) return;

  // Llenar el modal con los datos
  document.getElementById('modalImagen').src = imagen.url;
  document.getElementById('modalImagen').alt = imagen.titulo;
  document.getElementById('modalTitulo').textContent = imagen.titulo;
  document.getElementById('modalUbicacion').textContent = `📍 Ubicación: ${imagen.departamento}`;
  document.getElementById('modalDescripcion').textContent = imagen.descripcion || '';

  // Mostrar el modal
  document.getElementById('imagenModal').classList.add('active');
}

function cerrarModal() {
  document.getElementById('imagenModal').classList.remove('active');
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});
