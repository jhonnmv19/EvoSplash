// =================================================
// Script de Login para Panel Administrativo
// =================================================

document.addEventListener('DOMContentLoaded', () => {
  // Verificar si ya está logueado
  if (sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = 'panel.html';
  }

  initLoginForm();
});

// =================================================
// Formulario de Login
// =================================================

function initLoginForm() {
  const form = document.getElementById('loginForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación simple (en producción usar autenticación real con Supabase Auth)
    if (email === 'admin@evosplash.bo' && password === 'admin123') {
      // Guardar sesión
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('adminEmail', email);
      
      showAlert('Inicio de sesión exitoso. Redirigiendo...', 'success');
      
      setTimeout(() => {
        window.location.href = 'panel.html';
      }, 1000);
      
    } else {
      showAlert('Email o contraseña incorrectos', 'error');
    }
  });
}

// =================================================
// Mostrar Alertas
// =================================================

function showAlert(message, type) {
  const container = document.getElementById('alertContainer');
  const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
  
  container.innerHTML = `
    <div class="alert ${alertClass}">
      ${message}
    </div>
  `;

  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}
