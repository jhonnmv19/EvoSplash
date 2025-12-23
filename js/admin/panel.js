// =================================================
// Script del Panel de Administración
// =================================================

let modoEdicion = false;
let itemEditando = null;

document.addEventListener('DOMContentLoaded', () => {
  // Verificar autenticación
  if (!sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
    return;
  }

  // Mostrar email del admin
  document.getElementById('adminEmail').textContent = sessionStorage.getItem('adminEmail');

  // Cargar datos iniciales
  cargarParques();
  initFormularios();
});

// =================================================
// Cerrar Sesión
// =================================================

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}

// =================================================
// Cambiar Tabs
// =================================================

function cambiarTab(tab) {
  // Remover clase active de todos los tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  // Activar tab seleccionado
  event.target.classList.add('active');
  document.getElementById(`tab-${tab}`).classList.add('active');

  // Cargar datos según el tab
  switch(tab) {
    case 'parques':
      cargarParques();
      break;
    case 'promociones':
      cargarPromociones();
      break;
    case 'galeria':
      cargarGaleria();
      break;
    case 'solicitudes':
      cargarSolicitudes();
      break;
  }
}

// =================================================
// GESTIÓN DE PARQUES
// =================================================

async function cargarParques() {
  const container = document.getElementById('parquesTable');
  
  try {
    const parques = await getParques();
    
    if (parques.length === 0) {
      container.innerHTML = '<div class="empty-state"><h3>No hay parques registrados</h3></div>';
      return;
    }

    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Costo</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${parques.map(parque => `
            <tr>
              <td><img src="${parque.imagen_principal}" alt="${parque.nombre}"></td>
              <td><strong>${parque.nombre}</strong></td>
              <td>${parque.departamento}</td>
              <td>Bs. ${parque.costo_entrada}</td>
              <td>${parque.horario_entrada} - ${parque.horario_salida}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-sm btn-edit" onclick="editarParque(${parque.id})">
                    Editar
                  </button>
                  <button class="btn btn-sm btn-delete" onclick="eliminarParque(${parque.id})">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

  } catch (error) {
    console.error('Error al cargar parques:', error);
    container.innerHTML = '<div class="empty-state"><h3>Error al cargar datos</h3></div>';
  }
}

function abrirFormParque(id = null) {
  modoEdicion = !!id;
  document.getElementById('tituloFormParque').textContent = modoEdicion ? 'Editar Parque' : 'Nuevo Parque';
  
  if (modoEdicion) {
    cargarDatosParque(id);
  } else {
    document.getElementById('formParque').reset();
  }
  
  document.getElementById('modalParque').classList.add('active');
}

async function cargarDatosParque(id) {
  try {
    const parque = await getParqueById(id);
    
    document.getElementById('parque_id').value = parque.id;
    document.getElementById('parque_nombre').value = parque.nombre;
    document.getElementById('parque_departamento').value = parque.departamento;
    document.getElementById('parque_costo').value = parque.costo_entrada;
    document.getElementById('parque_descripcion').value = parque.descripcion;
    document.getElementById('parque_descripcion_completa').value = parque.descripcion_completa || '';
    document.getElementById('parque_horario_entrada').value = parque.horario_entrada;
    document.getElementById('parque_horario_salida').value = parque.horario_salida;
    document.getElementById('parque_ubicacion').value = parque.ubicacion || '';
    document.getElementById('parque_imagen').value = parque.imagen_principal;
    document.getElementById('parque_atracciones').value = parque.atracciones ? parque.atracciones.join(', ') : '';
    
  } catch (error) {
    console.error('Error al cargar parque:', error);
    alert('Error al cargar los datos del parque');
  }
}

async function editarParque(id) {
  abrirFormParque(id);
}

async function eliminarParque(id) {
  if (!confirm('¿Estás seguro de eliminar este parque?')) return;
  
  try {
    const success = await deleteParque(id);
    
    if (success) {
      alert('Parque eliminado con éxito');
      cargarParques();
    } else {
      alert('Error al eliminar el parque');
    }
  } catch (error) {
    console.error('Error al eliminar:', error);
    alert('Error al eliminar el parque');
  }
}

// =================================================
// GESTIÓN DE PROMOCIONES
// =================================================

async function cargarPromociones() {
  const container = document.getElementById('promocionesTable');
  
  try {
    const promociones = await getPromociones();
    
    if (promociones.length === 0) {
      container.innerHTML = '<div class="empty-state"><h3>No hay promociones registradas</h3></div>';
      return;
    }

    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Parque</th>
            <th>Descuento</th>
            <th>Vigencia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${promociones.map(promo => `
            <tr>
              <td><img src="${promo.imagen}" alt="${promo.titulo}"></td>
              <td><strong>${promo.titulo}</strong></td>
              <td>${promo.parque_nombre}<br><small>${promo.departamento}</small></td>
              <td>${promo.porcentaje_descuento}%</td>
              <td><small>${formatearFecha(promo.fecha_inicio)} - ${formatearFecha(promo.fecha_fin)}</small></td>
              <td>
                <span class="card-badge ${promo.estado === 'Activa' ? 'badge-activa' : 'badge-inactiva'}">
                  ${promo.estado}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-sm btn-edit" onclick="editarPromocion(${promo.id})">
                    Editar
                  </button>
                  <button class="btn btn-sm btn-delete" onclick="eliminarPromocion(${promo.id})">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

  } catch (error) {
    console.error('Error al cargar promociones:', error);
    container.innerHTML = '<div class="empty-state"><h3>Error al cargar datos</h3></div>';
  }
}

function abrirFormPromocion(id = null) {
  modoEdicion = !!id;
  document.getElementById('tituloFormPromocion').textContent = modoEdicion ? 'Editar Promoción' : 'Nueva Promoción';
  
  if (modoEdicion) {
    cargarDatosPromocion(id);
  } else {
    document.getElementById('formPromocion').reset();
  }
  
  document.getElementById('modalPromocion').classList.add('active');
}

async function cargarDatosPromocion(id) {
  try {
    const promociones = await getPromociones();
    const promo = promociones.find(p => p.id === id);
    
    document.getElementById('promo_id').value = promo.id;
    document.getElementById('promo_titulo').value = promo.titulo;
    document.getElementById('promo_descripcion').value = promo.descripcion;
    document.getElementById('promo_parque').value = promo.parque_nombre;
    document.getElementById('promo_departamento').value = promo.departamento;
    document.getElementById('promo_descuento').value = promo.porcentaje_descuento;
    document.getElementById('promo_estado').value = promo.estado;
    document.getElementById('promo_fecha_inicio').value = promo.fecha_inicio;
    document.getElementById('promo_fecha_fin').value = promo.fecha_fin;
    document.getElementById('promo_imagen').value = promo.imagen;
    
  } catch (error) {
    console.error('Error al cargar promoción:', error);
    alert('Error al cargar los datos de la promoción');
  }
}

async function editarPromocion(id) {
  abrirFormPromocion(id);
}

async function eliminarPromocion(id) {
  if (!confirm('¿Estás seguro de eliminar esta promoción?')) return;
  
  try {
    const success = await deletePromocion(id);
    
    if (success) {
      alert('Promoción eliminada con éxito');
      cargarPromociones();
    } else {
      alert('Error al eliminar la promoción');
    }
  } catch (error) {
    console.error('Error al eliminar:', error);
    alert('Error al eliminar la promoción');
  }
}

// =================================================
// GESTIÓN DE GALERÍA
// =================================================

async function cargarGaleria() {
  const container = document.getElementById('galeriaTable');
  
  try {
    const imagenes = await getGaleria();
    
    if (imagenes.length === 0) {
      container.innerHTML = '<div class="empty-state"><h3>No hay imágenes registradas</h3></div>';
      return;
    }

    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Departamento</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${imagenes.map(img => `
            <tr>
              <td><img src="${img.url}" alt="${img.titulo}"></td>
              <td><strong>${img.titulo}</strong></td>
              <td>${img.departamento}</td>
              <td>${img.descripcion || '-'}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-sm btn-edit" onclick="editarGaleria(${img.id})">
                    Editar
                  </button>
                  <button class="btn btn-sm btn-delete" onclick="eliminarGaleria(${img.id})">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

  } catch (error) {
    console.error('Error al cargar galería:', error);
    container.innerHTML = '<div class="empty-state"><h3>Error al cargar datos</h3></div>';
  }
}

function abrirFormGaleria(id = null) {
  modoEdicion = !!id;
  document.getElementById('tituloFormGaleria').textContent = modoEdicion ? 'Editar Imagen' : 'Nueva Imagen';
  
  if (modoEdicion) {
    cargarDatosGaleria(id);
  } else {
    document.getElementById('formGaleria').reset();
  }
  
  document.getElementById('modalGaleria').classList.add('active');
}

async function cargarDatosGaleria(id) {
  try {
    const imagenes = await getGaleria();
    const img = imagenes.find(i => i.id === id);
    
    document.getElementById('galeria_id').value = img.id;
    document.getElementById('galeria_titulo').value = img.titulo;
    document.getElementById('galeria_departamento').value = img.departamento;
    document.getElementById('galeria_descripcion').value = img.descripcion || '';
    document.getElementById('galeria_url').value = img.url;
    
  } catch (error) {
    console.error('Error al cargar imagen:', error);
    alert('Error al cargar los datos de la imagen');
  }
}

async function editarGaleria(id) {
  abrirFormGaleria(id);
}

async function eliminarGaleria(id) {
  if (!confirm('¿Estás seguro de eliminar esta imagen?')) return;
  
  try {
    const success = await deleteGaleria(id);
    
    if (success) {
      alert('Imagen eliminada con éxito');
      cargarGaleria();
    } else {
      alert('Error al eliminar la imagen');
    }
  } catch (error) {
    console.error('Error al eliminar:', error);
    alert('Error al eliminar la imagen');
  }
}

// =================================================
// SOLICITUDES
// =================================================

async function cargarSolicitudes() {
  const container = document.getElementById('solicitudesContainer');
  
  try {
    const solicitudes = await getSolicitudes();
    
    if (solicitudes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay solicitudes</h3>
          <p>Las solicitudes aparecerán aquí cuando los clientes las envíen</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="solicitudes-list">
        ${solicitudes.map(sol => `
          <div class="solicitud-item">
            <div class="solicitud-header">
              <div class="solicitud-info">
                <h4>${sol.nombre}</h4>
                <p>📧 ${sol.email}</p>
                <p>📱 ${sol.telefono}</p>
                <p style="font-size: 0.85rem; color: var(--gris-medio);">
                  📅 ${formatearFechaHora(sol.fecha_solicitud)}
                </p>
              </div>
              <div class="solicitud-promo">
                <strong>Promoción:</strong><br>
                ${sol.promocion_titulo}
                <br><br>
                <select 
                  onchange="cambiarEstadoSolicitud(${sol.id}, this.value)"
                  style="padding: 0.5rem; border-radius: 5px; border: 1px solid var(--bg-secundario);"
                >
                  <option value="Pendiente" ${sol.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                  <option value="Contactado" ${sol.estado === 'Contactado' ? 'selected' : ''}>Contactado</option>
                  <option value="Completado" ${sol.estado === 'Completado' ? 'selected' : ''}>Completado</option>
                </select>
              </div>
            </div>
            ${sol.mensaje ? `
              <div class="solicitud-mensaje">
                <strong>Mensaje:</strong><br>
                ${sol.mensaje}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

  } catch (error) {
    console.error('Error al cargar solicitudes:', error);
    container.innerHTML = '<div class="empty-state"><h3>Error al cargar solicitudes</h3></div>';
  }
}

async function cambiarEstadoSolicitud(id, nuevoEstado) {
  try {
    const success = await updateSolicitud(id, { estado: nuevoEstado });
    
    if (success) {
      alert('Estado actualizado con éxito');
    } else {
      alert('Error al actualizar el estado');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al actualizar el estado');
  }
}

function formatearFechaHora(fecha) {
  const date = new Date(fecha);
  const opciones = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleString('es-BO', opciones);
}

// =================================================
// FORMULARIOS
// =================================================

function initFormularios() {
  // Formulario Parque
  document.getElementById('formParque').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
      nombre: document.getElementById('parque_nombre').value,
      departamento: document.getElementById('parque_departamento').value,
      descripcion: document.getElementById('parque_descripcion').value,
      descripcion_completa: document.getElementById('parque_descripcion_completa').value,
      horario_entrada: document.getElementById('parque_horario_entrada').value,
      horario_salida: document.getElementById('parque_horario_salida').value,
      costo_entrada: parseFloat(document.getElementById('parque_costo').value),
      imagen_principal: document.getElementById('parque_imagen').value,
      ubicacion: document.getElementById('parque_ubicacion').value,
      atracciones: document.getElementById('parque_atracciones').value.split(',').map(a => a.trim())
    };

    try {
      const id = document.getElementById('parque_id').value;
      
      if (id) {
        // Actualizar
        const success = await updateParque(id, data);
        if (success) {
          alert('Parque actualizado con éxito');
          cerrarModales();
          cargarParques();
        }
      } else {
        // Crear
        const result = await createParque(data);
        if (result) {
          alert('Parque creado con éxito');
          cerrarModales();
          cargarParques();
        }
      }
    } catch (error) {
      console.error('Error al guardar parque:', error);
      alert('Error al guardar el parque');
    }
  });

  // Formulario Promoción
  document.getElementById('formPromocion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
      titulo: document.getElementById('promo_titulo').value,
      descripcion: document.getElementById('promo_descripcion').value,
      parque_nombre: document.getElementById('promo_parque').value,
      departamento: document.getElementById('promo_departamento').value,
      porcentaje_descuento: parseInt(document.getElementById('promo_descuento').value),
      estado: document.getElementById('promo_estado').value,
      fecha_inicio: document.getElementById('promo_fecha_inicio').value,
      fecha_fin: document.getElementById('promo_fecha_fin').value,
      imagen: document.getElementById('promo_imagen').value
    };

    try {
      const id = document.getElementById('promo_id').value;
      
      if (id) {
        const success = await updatePromocion(id, data);
        if (success) {
          alert('Promoción actualizada con éxito');
          cerrarModales();
          cargarPromociones();
        }
      } else {
        const result = await createPromocion(data);
        if (result) {
          alert('Promoción creada con éxito');
          cerrarModales();
          cargarPromociones();
        }
      }
    } catch (error) {
      console.error('Error al guardar promoción:', error);
      alert('Error al guardar la promoción');
    }
  });

  // Formulario Galería
  document.getElementById('formGaleria').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
      titulo: document.getElementById('galeria_titulo').value,
      departamento: document.getElementById('galeria_departamento').value,
      descripcion: document.getElementById('galeria_descripcion').value,
      url: document.getElementById('galeria_url').value
    };

    try {
      const id = document.getElementById('galeria_id').value;
      
      if (id) {
        const success = await updateGaleria(id, data);
        if (success) {
          alert('Imagen actualizada con éxito');
          cerrarModales();
          cargarGaleria();
        }
      } else {
        const result = await createGaleria(data);
        if (result) {
          alert('Imagen creada con éxito');
          cerrarModales();
          cargarGaleria();
        }
      }
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      alert('Error al guardar la imagen');
    }
  });
}

// =================================================
// UTILIDADES
// =================================================

function cerrarModales() {
  document.querySelectorAll('.form-modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

function formatearFecha(fecha) {
  const date = new Date(fecha);
  const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('es-BO', opciones);
}

// Cerrar modales con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModales();
  }
});
