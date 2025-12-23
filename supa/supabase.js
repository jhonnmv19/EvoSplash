// =================================================
// Configuración de Supabase para EvoSplash
// =================================================

const SUPABASE_URL = 'https://ujvcuuodacbtlvdnwafj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqdmN1dW9kYWNidGx2ZG53YWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMTQ4MDYsImV4cCI6MjA3MzY5MDgwNn0.voYziriyh2ROHnekjhCnen0R6b3AGKdtNzqCa4llfBk';

// =================================================
// Funciones para Parques
// =================================================

async function getParques() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/parques?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener parques:', error);
    return [];
  }
}

async function getParqueById(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/parques?id=eq.${id}&select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error('Error al obtener parque:', error);
    return null;
  }
}

async function createParque(parque) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/parques`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(parque)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear parque:', error);
    return null;
  }
}

async function updateParque(id, parque) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/parques?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parque)
    });
    return res.ok;
  } catch (error) {
    console.error('Error al actualizar parque:', error);
    return false;
  }
}

async function deleteParque(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/parques?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    return res.ok;
  } catch (error) {
    console.error('Error al eliminar parque:', error);
    return false;
  }
}

// =================================================
// Funciones para Promociones
// =================================================

async function getPromociones() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/promociones?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    return [];
  }
}

async function createPromocion(promocion) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/promociones`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(promocion)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear promoción:', error);
    return null;
  }
}

async function updatePromocion(id, promocion) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/promociones?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(promocion)
    });
    return res.ok;
  } catch (error) {
    console.error('Error al actualizar promoción:', error);
    return false;
  }
}

async function deletePromocion(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/promociones?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    return res.ok;
  } catch (error) {
    console.error('Error al eliminar promoción:', error);
    return false;
  }
}

// =================================================
// Funciones para Galería
// =================================================

async function getGaleria() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/galeria?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener galería:', error);
    return [];
  }
}

async function createGaleria(imagen) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/galeria`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(imagen)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al crear imagen:', error);
    return null;
  }
}

async function updateGaleria(id, imagen) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/galeria?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imagen)
    });
    return res.ok;
  } catch (error) {
    console.error('Error al actualizar imagen:', error);
    return false;
  }
}

async function deleteGaleria(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/galeria?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    return res.ok;
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return false;
  }
}
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

