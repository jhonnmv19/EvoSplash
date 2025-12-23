# 🌊 EvoSplash — Portal Web de Parques Acuáticos en Bolivia

Proyecto final desarrollado con **HTML, CSS y JavaScript puro**, conectado a **Supabase** como backend (Base de Datos + API REST), orientado a ofrecer información clara, visual y actualizada sobre parques acuáticos y promociones en Bolivia.

---

## 🎯 Objetivo del Proyecto

EvoSplash tiene como objetivo permitir que cualquier usuario:

* Explore **parques acuáticos disponibles en Bolivia**
* Consulte **promociones activas** en tiempo real
* Visualice galerías de imágenes reales
* Solicite información sobre una promoción mediante un formulario

Y que el **administrador** pueda:

* Gestionar parques, promociones y galería
* Recibir solicitudes de clientes desde el dashboard
* Contactar al cliente para completar el proceso de compra

---

## 🧱 Tecnologías Utilizadas

* **HTML5** — Estructura semántica
* **CSS3** — Diseño, responsividad y estilos
* **JavaScript (Vanilla JS)** — Lógica, eventos y consumo de API
* **Supabase** — Base de datos PostgreSQL + API REST
* **PostgreSQL** — Motor de base de datos

> ❌ No se utiliza React, frameworks ni librerías externas

---

## 🎨 Identidad Visual — Paleta de Colores

La identidad visual está inspirada en agua, frescura y confianza.

:root {
  --bg-principal: #fafbfb;
  --texto-principal: #07506d;
  --color-primario: #2596be;
  --color-acento: #0eb6c2;
  --bg-secundario: #d2f1f0;
  --blanco: #ffffff;
  --nav-azul: #050422;
  --gris-claro: #f5f5f5;
  --gris-medio: #9ca3af;
  --verde-activo: #10b981;
  --rojo-inactivo: #ef4444;
}

---

## 🗂️ Estructura del Proyecto

```
/evo-splash/
│
├── index.html
├── paginas/
│   ├── parques.html
│   ├── promociones.html
│   ├── galeria.html
│   ├── seguridad.html
│   ├── contacto.html
│   └── admin/
│       ├── login.html
│       └── panel.html
│── imagenes/
│   
├── css/
│   ├── styles.css
│   └── admin.css
│── informacion/
│   ├── seguridad.json
│  
├── js/
│   ├── app.js
│   ├── parques.js
│   ├── promociones.js
│   ├── galeria.js
│   ├── contacto.js
│   └── admin/
│       ├── login.js
│       └── panel.js
│
├── supa/
│   └── supabase.js
│
└── README.md
```

---

## 🔌 Configuración de Supabase

### 1. Credenciales

El archivo `/supa/supabase.js` contiene la configuración de conexión:

```javascript
const SUPABASE_URL = 'https://ujvcuuodacbtlvdnwafj.supabase.co';
const SUPABASE_ANON_KEY = 'tu_anon_key_aqui';
```

### 2. Base de Datos

Ejecuta el script SQL proporcionado en Supabase para crear las tablas:

* `parques` - Información de parques acuáticos
* `promociones` - Promociones y ofertas
* `galeria` - Galería de imágenes

El script SQL incluye:
- Definición de tablas con todos los campos necesarios
- Row Level Security (RLS) habilitado
- Políticas de acceso público para lectura
- Políticas de administrador para escritura
- Datos de ejemplo para pruebas

---

## 🚀 Instalación y Uso

### Paso 1: Clonar o Descargar

Descarga todos los archivos manteniendo la estructura de carpetas.

### Paso 2: Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script SQL en el editor SQL de Supabase
3. Copia tu `SUPABASE_URL` y `SUPABASE_ANON_KEY`
4. Actualiza estas credenciales en `/supa/supabase.js`

### Paso 3: Servidor Local

Debido a las políticas CORS, necesitas servir el proyecto desde un servidor local:

```bash
# Opción 1: Python 3
python -m http.server 8000

# Opción 2: Node.js (con http-server)
npx http-server

# Opción 3: PHP
php -S localhost:8000

# Opción 4: Live Server (VS Code Extension)
```

### Paso 4: Abrir en Navegador

Abre tu navegador en:
```
http://localhost:8000/index.html
```

---

## 🏊‍♂️ Funcionalidades Principales

### Para Visitantes

**Página de Inicio (`index.html`)**
- Vista general de parques destacados
- Promociones activas
- Información sobre el portal

**Parques (`paginas/parques.html`)**
- 🔍 Búsqueda por nombre
- 📍 Filtro por departamento
- 📋 Modal con detalles completos:
  - Ubicación con enlace a Google Maps
  - Descripción completa
  - Lista de atracciones con iconos
  - Horarios y precios

**Promociones (`paginas/promociones.html`)**
- Visualización de promociones activas e inactivas
- Verificación automática de vigencia por fechas
- Botón "Obtener Promoción" habilitado solo si está activa
- Formulario de solicitud de promoción

**Galería (`paginas/galeria.html`)**
- Grid de imágenes con filtro por departamento
- Modal al hacer clic mostrando detalles
- Overlay con información al hacer hover

**Seguridad (`paginas/seguridad.html`)**
- Información sobre medidas de seguridad
- Normas y recomendaciones

**Contacto (`paginas/contacto.html`)**
- Formulario de contacto
- Información de contacto
- Preguntas frecuentes

### Para Administradores

**Login (`paginas/admin/login.html`)**
- Autenticación de administrador
- Credenciales de prueba:
  - Email: `admin@evosplash.bo`
  - Contraseña: `admin123`

**Panel Administrativo (`paginas/admin/panel.html`)**

✅ **Gestión de Parques**
- Ver todos los parques
- Crear nuevo parque
- Editar parque existente
- Eliminar parque

✅ **Gestión de Promociones**
- Ver todas las promociones
- Crear nueva promoción
- Editar promoción existente
- Eliminar promoción
- Control de estado (Activa/Inactiva)

✅ **Gestión de Galería**
- Ver todas las imágenes
- Agregar nueva imagen
- Editar imagen existente
- Eliminar imagen

✅ **Solicitudes de Clientes**
- Visualizar solicitudes de promociones
- Información de contacto del cliente
- (Requiere tabla adicional en Supabase)

---

## 🎨 Características de Diseño

### Responsividad
- ✅ Diseño móvil (< 480px)
- ✅ Tablets (481px - 768px)
- ✅ Desktop (> 768px)

### Animaciones
- Fade In al cargar
- Slide Up en modales
- Hover effects en cards
- Transiciones suaves

### Componentes Reutilizables
- Cards de parques y promociones
- Modales con overlay
- Formularios estilizados
- Tablas administrativas
- Alertas y notificaciones

---

## 🔒 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- Políticas de acceso público solo para lectura
- Operaciones de escritura protegidas
- Sesión de administrador con `sessionStorage`

> ⚠️ **Importante**: En producción, implementa autenticación real con Supabase Auth

---

## 📋 Próximas Mejoras Sugeridas

1. **Tabla de Solicitudes**
   - Crear tabla `solicitudes` en Supabase
   - Integrar formulario de promociones con la base de datos
   - Dashboard completo de solicitudes en el panel admin

2. **Autenticación Real**
   - Implementar Supabase Auth
   - Sistema de roles (admin, moderador)
   - Recuperación de contraseña

3. **Subida de Imágenes**
   - Integrar Supabase Storage
   - Upload de imágenes desde el panel
   - Optimización automática

4. **Sistema de Reservas**
   - Reserva de entradas online
   - Calendario de disponibilidad
   - Confirmación por email

5. **Notificaciones**
   - Email automático al recibir solicitudes
   - Confirmaciones de reserva
   - Newsletter de promociones

---

## 🐛 Solución de Problemas

### Error de CORS
Si ves errores de CORS en la consola:
- ✅ Asegúrate de estar usando un servidor local
- ❌ No abras el archivo directamente con `file://`

### No se cargan los datos
- Verifica que las credenciales de Supabase sean correctas
- Revisa que las tablas existan en Supabase
- Abre la consola del navegador para ver errores

### El login no funciona
- Usa las credenciales: `admin@evosplash.bo` / `admin123`
- Verifica que JavaScript esté habilitado
- Limpia el `sessionStorage` del navegador

---

## 📱 Compatibilidad

- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)
- ⚠️ IE11 no soportado

---

## 👤 Autor
Jhonn Alan Meneses Veizaga
Proyecto académico desarrollado como **proyecto final Evo Splash**.

**Contacto:**
- Universidad: [UPDS]
- Materia: [Tecnologia WebI]
- Gestión: 2025

---

## 📄 Licencia

Uso académico y educativo.

---

## 🙏 Agradecimientos

- Supabase por el backend gratuito
- Google Fonts por las tipografías
- Unsplash por las imágenes de ejemplo

---

**EvoSplash** 🌊  
*Tu guía confiable de parques acuáticos en Bolivia*
