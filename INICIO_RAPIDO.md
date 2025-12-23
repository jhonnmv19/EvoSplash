# 🚀 Inicio Rápido - EvoSplash

Guía rápida para poner en marcha tu proyecto EvoSplash en minutos.

---

## ⚡ 3 Pasos para Empezar

### 1️⃣ Configurar Supabase (5 minutos)

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto:
   - Nombre: `evosplash`
   - Región: Elige la más cercana
   - Contraseña: Guarda tu contraseña de base de datos
3. Espera 2 minutos mientras se crea el proyecto
4. Ve a **SQL Editor** (icono de terminal en el menú lateral)
5. Copia y pega TODO el contenido del archivo `DATABASE.sql`
6. Haz clic en **"Run"** (botón verde)
7. ✅ Verás el mensaje "Success. No rows returned"

### 2️⃣ Configurar Credenciales (2 minutos)

1. En Supabase, ve a **Settings** → **API**
2. Copia estas 2 credenciales:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (clave larga)

3. Abre el archivo `/supa/supabase.js`
4. Reemplaza las credenciales:

```javascript
const SUPABASE_URL = 'TU_PROJECT_URL_AQUI';
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUI';
```

5. ✅ Guarda el archivo

### 3️⃣ Abrir el Proyecto (1 minuto)

**Opción A: Python 3** (Recomendado)
```bash
# Abre terminal en la carpeta del proyecto
python -m http.server 8000

# Abre en navegador:
http://localhost:8000/index.html
```

**Opción B: VS Code + Live Server**
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

**Opción C: Node.js**
```bash
npx http-server
```

---

## ✅ Verificar que Funciona

### Página Principal
1. Abre `http://localhost:8000/index.html`
2. Deberías ver:
   - ✅ Navbar azul oscuro con logo "🌊 EvoSplash"
   - ✅ Banner principal con degradado azul
   - ✅ 3 parques destacados (Aquapark Santa Cruz, Cochabamba Water Fun, Tarija Splash Park)
   - ✅ 2-4 promociones activas

### Página de Parques
1. Haz clic en **"Parques"** en el menú
2. Deberías ver:
   - ✅ Buscador y filtro por departamento
   - ✅ 3 tarjetas de parques
   - ✅ Al hacer clic en "Ver Detalles", se abre un modal con:
     - Imagen grande
     - Descripción completa
     - Ubicación con enlace a Google Maps
     - Atracciones con iconos
     - Horarios y precio

### Página de Promociones
1. Haz clic en **"Promociones"** en el menú
2. Deberías ver:
   - ✅ Filtros por departamento y estado
   - ✅ Tarjetas de promociones con badges (Activa/Inactiva)
   - ✅ Botón "Obtener Promoción" habilitado solo en activas
   - ✅ Al hacer clic, se abre formulario de solicitud

### Galería
1. Haz clic en **"Galería"**
2. Deberías ver:
   - ✅ Grid de 4 imágenes
   - ✅ Al hacer hover, aparece overlay con información
   - ✅ Al hacer clic, se abre modal con detalles

### Panel de Administración
1. Haz clic en **"Administración"** en el footer
2. Usa las credenciales:
   - Email: `admin@evosplash.bo`
   - Contraseña: `admin123`
3. Deberías ver:
   - ✅ Dashboard con tabs (Parques, Promociones, Galería, Solicitudes)
   - ✅ Tabla con todos los datos
   - ✅ Botones "Editar" y "Eliminar"
   - ✅ Botón "+ Nuevo" que abre formulario modal

---

## 🐛 Solución Rápida de Problemas

### ❌ No se cargan los datos

**Problema:** Ves "Loading..." o "Error al cargar"

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica:
   - ✅ Credenciales correctas en `/supa/supabase.js`
   - ✅ Script SQL ejecutado en Supabase
   - ✅ Estás usando servidor local (no `file://`)

### ❌ Error de CORS

**Problema:** `Access to fetch ... has been blocked by CORS policy`

**Solución:**
- ❌ NO abras `index.html` directamente (doble clic)
- ✅ USA un servidor local (Python, Node.js, Live Server)

### ❌ Login no funciona

**Problema:** No puedo entrar al panel admin

**Solución:**
1. Usa exactamente estas credenciales:
   - Email: `admin@evosplash.bo`
   - Contraseña: `admin123`
2. Limpia sessionStorage:
   - F12 → Application → Session Storage → Eliminar todo
3. Recarga la página

### ❌ No puedo crear/editar/eliminar

**Problema:** Al guardar da error en el panel admin

**Solución:**
1. Verifica que las políticas RLS estén habilitadas en Supabase
2. Revisa la consola del navegador para ver el error específico
3. Asegúrate de llenar todos los campos obligatorios (*)

---

## 📋 Checklist de Configuración

```
✅ Proyecto creado en Supabase
✅ Script DATABASE.sql ejecutado
✅ Credenciales copiadas a supabase.js
✅ Servidor local iniciado
✅ Página principal carga correctamente
✅ Se ven parques, promociones y galería
✅ Puedo entrar al panel admin
✅ Puedo crear/editar/eliminar desde el panel
```

---

## 🎯 Próximos Pasos

Una vez que todo funcione:

1. **Personaliza los Datos**
   - Entra al panel admin
   - Edita los parques de ejemplo
   - Crea tus propias promociones
   - Agrega imágenes a la galería

2. **Personaliza los Estilos**
   - Modifica colores en `/css/styles.css` (variables CSS)
   - Cambia tipografías en el `<head>` de los HTML
   - Ajusta tamaños y espaciados

3. **Agrega Funcionalidades**
   - Crea la tabla `solicitudes` para el formulario de promociones
   - Implementa Supabase Auth para login real
   - Agrega Supabase Storage para subir imágenes

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Revisa la consola del navegador** (F12 → Console)
2. **Lee el archivo README.md completo**
3. **Revisa el archivo DATABASE.sql** para ver la estructura de datos
4. **Verifica que todas las políticas RLS estén activas** en Supabase

---

## 🎉 ¡Listo!

Si llegaste hasta aquí y todo funciona:

✅ Tienes un portal web completo funcionando  
✅ Conectado a una base de datos real  
✅ Con panel de administración funcional  
✅ Diseño responsive y profesional  

**¡Felicitaciones! 🎊**

---

**EvoSplash** 🌊  
*Tu guía confiable de parques acuáticos en Bolivia*
