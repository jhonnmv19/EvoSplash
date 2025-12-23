// =================================================
// Script para página de Contacto
// =================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
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
// Formulario de Contacto
// =================================================

function initFormulario() {
  const form = document.getElementById('contactoForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      asunto: document.getElementById('asunto').value,
      mensaje: document.getElementById('mensaje').value,
      fecha: new Date().toISOString()
    };

    try {
      // Aquí guardarías el mensaje en Supabase
      console.log('Mensaje de contacto:', formData);
      
      // Mostrar mensaje de éxito
      alert('¡Mensaje enviado con éxito! Te responderemos pronto.');
      
      // Limpiar formulario
      form.reset();
      
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
  });
}
