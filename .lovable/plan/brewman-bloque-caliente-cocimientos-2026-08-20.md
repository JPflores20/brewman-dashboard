# Brewman — Bloque Caliente (Cocimientos)

App web en modo oscuro para planificar y controlar limpieza (CIP) y mantenimiento de equipos de cocimientos. Primera entrega con datos de demostración en el navegador; el Tablero y la Agenda quedan completos y el resto de secciones como páginas base listas para crecer.

## Estilo visual

- Modo oscuro permanente: fondos gris carbón, tarjetas gris grafito con bordes sutiles.
- Acento único amarillo mostaza para KPIs, estados activos, banner crítico y botones primarios.
- Tipografía condensada industrial para títulos, sans neutra para texto.
- Todos los colores como tokens semánticos en `src/styles.css` (nada de colores fijos en componentes).
- Diseño responsivo: sidebar colapsable a menú móvil, tarjetas en una columna en pantallas chicas.

## Estructura

### Barra lateral
Logotipo "Brewman" con subtítulo "Bloque Caliente — Limpieza y Mantenimiento", e items con iconos: Tablero, Agenda de Limpieza, Mantenimiento Preventivo, Bitácora de CIP, Inventario de Equipos, Reportes e Historial, Configuración. Pie con usuario, cerrar sesión y nota de empresa.

### Barra superior
Buscador, título de página, reloj en tiempo real (actualiza cada segundo), selector de fecha y filtro de turnos: Turno Actual / T1 / T2 / T3. El filtro aplica al instante sobre el tablero y la agenda.

### Tablero
1. Banner de alertas críticas en amarillo mostaza (ej. "¡Mantenimiento Crítico Pendiente! La Paila de Cocimiento requiere CIP urgente").
2. Tres tarjetas KPI: Equipos Activos / Plan al Día, CIPs Pendientes del turno, Mantenimiento Urgente / Próximo.
3. Tarjetas de tareas detalladas agrupadas en "Tareas de este Turno" y "Mantenimiento Preventivo Próximo": icono por tipo (limpieza vs mantenimiento), equipo y código (P-01, B-05, I-02), hora de vencimiento e indicador de estado (Pendiente / En proceso / Completada / Vencida).

### Agenda de Limpieza
Calendario a pantalla completa con vistas Mes / Semana / Día, tareas como bloques de color por tipo y prioridad, arrastrar y soltar para reprogramar (con confirmación visual), y creación de tarea al hacer clic en un espacio libre.

### Modal de tarea
Al hacer clic en cualquier tarjeta o bloque del calendario: detalle del equipo, marcar como Completada, subir foto opcional (vista previa local), registrar incidencia/observaciones y responsable del turno.

### Otras secciones
Mantenimiento Preventivo, Bitácora de CIP, Inventario de Equipos, Reportes y Configuración se crean como páginas con la misma estética, mostrando los datos demo en tablas/listas simples, listas para ampliarse.

## Lógica de demostración

- Catálogo de equipos de cocimientos (paila, macerador, whirlpool, intercambiador, bombas, tanques).
- Reglas de frecuencia (CIP diario, mantenimiento semanal/mensual, limpieza tras X lotes) que generan las tareas del día y de la semana en el arranque.
- Turnos T1 06:00–14:00, T2 14:00–22:00, T3 22:00–06:00; "Turno Actual" se deduce del reloj.
- Estado en memoria compartido, así que completar o mover una tarea se refleja en tablero y agenda durante la sesión.

## Notas técnicas

- React + TanStack Router (rutas: `/` tablero, `/agenda`, `/mantenimiento`, `/cip`, `/inventario`, `/reportes`, `/configuracion`) y Tailwind v4 con tokens en `src/styles.css`.
- Componentes shadcn (sidebar, dialog, select, tabs, badge, calendar) adaptados al tema mostaza/oscuro.
- Drag-and-drop del calendario con `@dnd-kit`; datos demo en un contexto React + hooks, sin backend.
- `head()` propio por ruta con títulos y descripciones específicas.
- Persistencia real (base de datos, usuarios, fotos, historial) queda para una segunda fase con Lovable Cloud.
