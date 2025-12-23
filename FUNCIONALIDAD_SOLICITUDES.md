# 📋 Habilitar Funcionalidad de Solicitudes

Guía para implementar completamente el sistema de solicitudes de promociones.

---

## 🎯 ¿Qué es esta funcionalidad?

Permite que los usuarios soliciten una promoción completando un formulario. Las solicitudes se guardan en Supabase y el administrador puede verlas en el panel de administración para contactar a los clientes.

---

## ⚙️ Paso 1: Crear la Tabla en Supabase

### Opción A: Usar el Script SQL (Recomendado)

El archivo `DATABASE.sql` ya incluye la tabla. Si no la creaste al inicio:

1. Ve a Supabase → **SQL Editor**
2. Copia y pega este código:

```sql
CREATE TABLE solicitudes (
  id BIGSERIAL PRIMARY KEY,
  promocion_id BIGINT REFERENCES promociones(id),
  promocion_titulo TEXT NOT NULL,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  mensaje TEXT,
  fecha_solicitud TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado TEXT DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Contactado', 'Completado'))
);

-- Habilitar RLS
ALTER TABLE solicitudes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Admin puede ver solicitudes"
  ON solicitudes FOR SELECT
  USING (true);

CREATE POLICY "Usuarios pueden crear solicitudes"
  ON solicitudes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin puede actualizar solicitudes"
  ON solicitudes FOR UPDATE
  USING (true);
```

3. Haz clic en **"Run"**
4. ✅ Verás "Success. No rows returned"

---

## 📝 Paso 2: Actualizar supabase.js

Agrega estas funciones al archivo `/supa/supabase.js`:

```javascript
// =================================================
// Funciones para Solicitudes
// =================================================

async function getSolicitudes() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes?select=*&order=fecha_solicitud.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    return [];
  }
}

async function createSolicitud(solicitud) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(solicitud)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    return null;
  }
}

async function updateSolicitud(id, solicitud) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/solicitudes?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(solicitud)
    });
    return res.ok;
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    return false;
  }
}
```

---

## 🔄 Paso 3: Actualizar promociones.js

Reemplaza la función `initFormulario()` en `/js/promociones.js`:

```javascript
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
```

---

## 👨‍💼 Paso 4: Actualizar panel.js

Reemplaza la función `cargarSolicitudes()` en `/js/admin/panel.js`:

```javascript
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
```

---

## ✅ Paso 5: Verificar que Funciona

### Probar el Formulario:

1. Ve a **Promociones** en el sitio
2. Haz clic en **"Obtener Promoción"** en una promoción activa
3. Completa el formulario:
   - Nombre: `Juan Pérez`
   - Email: `juan@email.com`
   - Teléfono: `+591 7XXXXXXX`
   - Mensaje: `Quisiera más información`
4. Haz clic en **"Enviar Solicitud"**
5. ✅ Deberías ver: "¡Solicitud enviada con éxito!"

### Verificar en el Panel Admin:

1. Inicia sesión en el panel de administración
2. Haz clic en la pestaña **"📋 Solicitudes"**
3. ✅ Deberías ver:
   - La solicitud que acabas de crear
   - Nombre, email, teléfono del cliente
   - Promoción solicitada
   - Fecha y hora
   - Selector de estado (Pendiente/Contactado/Completado)

### Cambiar Estado:

1. Cambia el estado de una solicitud usando el dropdown
2. ✅ Deberías ver: "Estado actualizado con éxito"
3. Recarga la página y verifica que el cambio se guardó

---

## 📊 Verificar en Supabase

1. Ve a Supabase → **Table Editor**
2. Selecciona la tabla **`solicitudes`**
3. ✅ Deberías ver todas las solicitudes guardadas

---

## 🎨 Personalizar Estados

Puedes agregar más estados según tus necesidades. Por ejemplo:

```sql
-- Agregar más estados
ALTER TABLE solicitudes 
DROP CONSTRAINT solicitudes_estado_check;

ALTER TABLE solicitudes 
ADD CONSTRAINT solicitudes_estado_check 
CHECK (estado IN ('Pendiente', 'En Proceso', 'Contactado', 'Completado', 'Cancelado'));
```

Luego actualiza el select en `panel.js` para incluir los nuevos estados.

---

## 📧 Notificaciones por Email (Opcional)

Para recibir emails cuando llegue una solicitud:

### Opción 1: Trigger de PostgreSQL + Supabase Edge Functions

1. Crea una función Edge Function en Supabase que envíe emails
2. Configura un trigger en PostgreSQL que llame a la función cuando se inserte una solicitud

### Opción 2: Servicios Externos

Integra con servicios como:
- **SendGrid**
- **Mailgun**
- **Resend**
- **Postmark**

---

## 🔔 Notificaciones en el Panel (Opcional)

Agrega un badge con el número de solicitudes pendientes:

```javascript
// En panel.js
async function actualizarContadorSolicitudes() {
  const solicitudes = await getSolicitudes();
  const pendientes = solicitudes.filter(s => s.estado === 'Pendiente').length;
  
  if (pendientes > 0) {
    const tab = document.querySelector('.tab-btn:nth-child(4)');
    tab.innerHTML = `📋 Solicitudes <span class="badge-activa">${pendientes}</span>`;
  }
}

// Llamar cada vez que se carga el panel
document.addEventListener('DOMContentLoaded', () => {
  // ... código existente
  actualizarContadorSolicitudes();
});
```

---

## ✅ Checklist de Implementación

```
✅ Tabla solicitudes creada en Supabase
✅ Políticas RLS configuradas
✅ Funciones agregadas a supabase.js
✅ Formulario en promociones.html actualizado
✅ Panel admin actualizado para mostrar solicitudes
✅ Probado: enviar solicitud desde el sitio
✅ Probado: ver solicitud en panel admin
✅ Probado: cambiar estado de solicitud
```

---

## 🎉 ¡Listo!

Ahora tienes un sistema completo de gestión de solicitudes que permite:

✅ Usuarios envían solicitudes de promociones  
✅ Solicitudes se guardan en la base de datos  
✅ Administrador ve todas las solicitudes  
✅ Administrador puede cambiar estados  
✅ Sistema de seguimiento completo  

---

**EvoSplash** 🌊  
*Tu guía confiable de parques acuáticos en Bolivia*
