-- =================================================
-- EvoSplash - Script SQL para Supabase
-- Base de Datos: PostgreSQL
-- =================================================

-- =================================================
-- ================== TABLA: PARQUES ==============
-- =================================================

CREATE TABLE parques (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  departamento TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  descripcion_completa TEXT,
  horario_entrada TEXT NOT NULL,
  horario_salida TEXT NOT NULL,
  costo_entrada NUMERIC NOT NULL,
  imagen_principal TEXT NOT NULL,
  imagenes_galeria TEXT[],
  ubicacion TEXT,
  atracciones TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE parques ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Lectura pública de parques"
  ON parques FOR SELECT
  USING (true);

-- Políticas admin
CREATE POLICY "Admin puede insertar parques"
  ON parques FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin puede actualizar parques"
  ON parques FOR UPDATE
  USING (true);

CREATE POLICY "Admin puede eliminar parques"
  ON parques FOR DELETE
  USING (true);

-- =================================================
-- ================== TABLA: PROMOCIONES ==========
-- =================================================

CREATE TABLE promociones (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  imagen TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('Activa', 'Inactiva')),
  parque_nombre TEXT NOT NULL,
  departamento TEXT NOT NULL,
  porcentaje_descuento INTEGER NOT NULL CHECK (porcentaje_descuento >= 0 AND porcentaje_descuento <= 100),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE promociones ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Lectura pública de promociones"
  ON promociones FOR SELECT
  USING (true);

CREATE POLICY "Admin puede gestionar promociones"
  ON promociones FOR ALL
  USING (true);

-- =================================================
-- ================== TABLA: GALERIA ==============
-- =================================================

CREATE TABLE galeria (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  url TEXT NOT NULL,
  departamento TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Lectura pública de galería"
  ON galeria FOR SELECT
  USING (true);

CREATE POLICY "Admin puede gestionar galería"
  ON galeria FOR ALL
  USING (true);

-- =================================================
-- ========== TABLA: SOLICITUDES (OPCIONAL) =======
-- =================================================

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

-- =================================================
-- ============= INSERTAR PARQUES EJEMPLO =========
-- =================================================

INSERT INTO parques (
  nombre, 
  departamento, 
  descripcion, 
  descripcion_completa,
  horario_entrada, 
  horario_salida, 
  costo_entrada, 
  imagen_principal, 
  ubicacion,
  atracciones
) VALUES 
(
  'Aquapark Santa Cruz',
  'Santa Cruz',
  'El parque acuático más grande de Bolivia con atracciones para toda la familia',
  'Aquapark Santa Cruz ofrece más de 15 toboganes emocionantes, piscinas climatizadas, áreas VIP, restaurantes de primera calidad y zonas especiales para niños. Ubicado en el corazón de Santa Cruz, es el destino perfecto para un día de diversión acuática.',
  '09:00',
  '18:00',
  50,
  'https://images.unsplash.com/photo-1723524993962-0234edebe0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBhcmslMjBzbGlkZXN8ZW58MXx8fHwxNzY1MjIyMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Av. Principal #123, Santa Cruz de la Sierra',
  ARRAY['Piscinas', 'Toboganes', 'Piscinas climatizadas', 'Restaurantes', 'Áreas VIP', 'Zonas familiares']
),
(
  'Cochabamba Water Fun',
  'Cochabamba',
  'Diversión y aventura en el valle alto de Bolivia',
  'Water Fun Cochabamba es un paraíso acuático ubicado en el valle. Cuenta con toboganes de alta velocidad, piscinas para todas las edades, saunas relajantes y áreas especiales para eventos familiares.',
  '10:00',
  '19:00',
  45,
  'https://images.unsplash.com/photo-1529250488-121d3dd2383f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBmYW1pbHl8ZW58MXx8fHwxNzY1MzE4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Km 5 Carretera a Sacaba, Cochabamba',
  ARRAY['Piscinas', 'Toboganes', 'Saunas', 'Juegos infantiles', 'Restaurantes', 'Zonas familiares']
),
(
  'Tarija Splash Park',
  'Tarija',
  'El oasis acuático del sur de Bolivia',
  'Splash Park Tarija combina diversión acuática con la calidez tarijeña. Disfruta de nuestras piscinas, toboganes y áreas de relajación en un ambiente familiar único.',
  '09:30',
  '17:30',
  40,
  'https://images.unsplash.com/photo-1594069240194-16118a5bb475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBhcmslMjBib2xpdmlhfGVufDF8fHx8MTc2NTMxODI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Zona San Luis, Tarija',
  ARRAY['Piscinas', 'Toboganes', 'Juegos infantiles', 'Restaurantes', 'Zonas familiares']
);

-- =================================================
-- =========== INSERTAR PROMOCIONES EJEMPLO =======
-- =================================================

INSERT INTO promociones (
  titulo,
  descripcion,
  imagen,
  estado,
  parque_nombre,
  departamento,
  porcentaje_descuento,
  fecha_inicio,
  fecha_fin
) VALUES
(
  '¡Descuento de Verano 2024!',
  'Aprovecha el 30% de descuento en entradas familiares. Válido para grupos de 4 personas o más. Incluye acceso a todas las atracciones del parque.',
  'https://images.unsplash.com/photo-1723524993962-0234edebe0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBhcmslMjBzbGlkZXN8ZW58MXx8fHwxNzY1MjIyMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Activa',
  'Aquapark Santa Cruz',
  'Santa Cruz',
  30,
  '2024-12-01',
  '2025-03-31'
),
(
  'Promo Fin de Semana',
  'Los sábados y domingos disfruta del 20% de descuento. No acumulable con otras promociones.',
  'https://images.unsplash.com/photo-1529250488-121d3dd2383f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBmYW1pbHl8ZW58MXx8fHwxNzY1MzE4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Activa',
  'Cochabamba Water Fun',
  'Cochabamba',
  20,
  '2024-12-01',
  '2025-02-28'
),
(
  '¡Promo Navideña 2025!',
  'Celebra Navidad con un 35% de descuento en entradas familiares. Disponible para grupos de 4 personas o más e incluye acceso total a todas las atracciones.',
  'https://images.unsplash.com/photo-1723524993962-0234edebe0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'Activa',
  'Aquapark Santa Cruz',
  'Santa Cruz',
  35,
  '2025-12-01',
  '2026-01-15'
),
(
  'Fiesta de Fin de Año – Descuento Especial',
  'Todos los fines de semana de diciembre disfruta del 25% de descuento. Ideal para familias y grupos. No acumulable con otras ofertas.',
  'https://images.unsplash.com/photo-1529250488-121d3dd2383f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'Activa',
  'Cochabamba Water Fun',
  'Cochabamba',
  25,
  '2025-12-05',
  '2026-01-10'
);

-- =================================================
-- =========== INSERTAR IMÁGENES GALERÍA =========
-- =================================================

INSERT INTO galeria (titulo, url, departamento, descripcion) VALUES
(
  'Tobogán Extremo',
  'https://images.unsplash.com/photo-1723524993962-0234edebe0cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBhcmslMjBzbGlkZXN8ZW58MXx8fHwxNzY1MjIyMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Santa Cruz',
  'El tobogán más emocionante de Bolivia'
),
(
  'Piscina Familiar',
  'https://images.unsplash.com/photo-1529250488-121d3dd2383f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBmYW1pbHl8ZW58MXx8fHwxNzY1MzE4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Cochabamba',
  'Diversión segura para toda la familia'
),
(
  'Área de Relax',
  'https://images.unsplash.com/photo-1594069240194-16118a5bb475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBhcmslMjBib2xpdmlhfGVufDF8fHx8MTc2NTMxODI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Tarija',
  'Zona de descanso y relajación'
),
(
  'Parque Acuático Vista Aérea',
  'https://images.unsplash.com/photo-1689036057555-ef94c2cdca9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhdGljJTIwcGFya3xlbnwxfHx8fDE3NjUzMTgyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Santa Cruz',
  'Vista panorámica del parque'
);

-- =================================================
-- ============== VERIFICAR DATOS =================
-- =================================================

-- Ver todos los parques
SELECT * FROM parques;

-- Ver todas las promociones
SELECT * FROM promociones;

-- Ver toda la galería
SELECT * FROM galeria;

-- Ver todas las solicitudes (si existe la tabla)
SELECT * FROM solicitudes;

-- =================================================
-- ============== QUERIES ÚTILES ==================
-- =================================================

-- Obtener parques por departamento
SELECT * FROM parques WHERE departamento = 'Santa Cruz';

-- Obtener promociones activas vigentes
SELECT * FROM promociones 
WHERE estado = 'Activa' 
  AND CURRENT_DATE >= fecha_inicio 
  AND CURRENT_DATE <= fecha_fin;

-- Contar parques por departamento
SELECT departamento, COUNT(*) as total 
FROM parques 
GROUP BY departamento;

-- Obtener promociones con mayor descuento
SELECT * FROM promociones 
ORDER BY porcentaje_descuento DESC 
LIMIT 5;
