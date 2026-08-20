# Brewman Dashboard

1. Resumen y Estilo Visual

"Crear una aplicación web moderna tipo agenda y dashboard en modo oscuro, diseñada específicamente para la planificación y el control de la limpieza y el mantenimiento de equipos en el área de Bloque Caliente (Cocimientos).

La interfaz debe estar altamente inspirada en el diseño visual de tarjetas, la barra lateral y el esquema de colores (gris oscuro y acentos en amarillo mostaza) que se muestran en la imagen de referencia visualizada (concept-map-cocimientos.png). Debe ser una adaptación de esa estructura operativa para el mantenimiento de equipos."

2. Barra Lateral (Navegación) - Estructura

"Define las siguientes secciones en la barra lateral izquierda, utilizando iconos limpios como en la referencia:

Logotipo y Título: 'Brewman - Bloque Caliente' (Limpieza y Mantenimiento).

Tablero (Dashboard) (Activo): Vista general de hoy.

Agenda de Limpieza (Nueva Sección): Un calendario interactivo a pantalla completa (vista de Mes/Semana/Día) que permita arrastrar y soltar tareas (drag-and-drop).

Mantenimiento Preventivo: Registro de tareas de mantenimiento.

Bitácora de CIP: Registro específico de limpiezas Clean-in-Place.

Inventario de Equipos: Base de datos de toda la maquinaria de cocimientos.

Reportes e Historial: Exportación de datos y cumplimiento.

Configuración: Usuarios, turnos y tipos de tarea.

Pie de página: Información de logout y footer de la empresa."

3. Barra Superior (Header) y Filtros

"Mimetiza la barra superior de la referencia, incluyendo:

Barra de búsqueda.

Título: 'Tablero General - Cocimientos'.

Reloj dinámico en tiempo real y selector de fecha.

Filtros de Turno: Un selector idéntico al de la referencia para 'Turno Actual', 'T1', 'T2', 'T3', que aplique filtros instantáneos a todo el dashboard."

4. Contenido del Dashboard (Tablero Central)

"Divide el contenido central en las siguientes secciones secuenciales:

A. Banner de Notificaciones Críticas: Un banner idéntico en estilo y color amarillo mostaza al de la referencia, para alertas de alta prioridad (ej: '¡Mantenimiento Crítico Pendiente! La Paila de Cocimiento requiere CIP urgente.').

B. Tarjetas de Estadísticas KPI: Tres tarjetas principales con iconos y un color de acento amarillo mostaza:

Equipos Activos / Plan de Limpieza al Día.

CIPs Pendientes / Siguientes (este turno).

Mantenimiento Urgente / Próximo.

C. Tarjetas de Tareas Detalladas (El 'Core' de la Referencia): Esta es la parte más crucial. Crea tarjetas de tareas detalladas, agrupadas quizás por prioridad o tiempo (ej: 'Tareas de este Turno', 'Mantenimiento Preventivo Próximo'). Estas tarjetas deben replicar el diseño exacto de los 'Chequeos de Plato' en la referencia (iconos, timestamps, nombre del equipo, estado de 'Pendiente').

Ejemplos de tareas para estas tarjetas: 'CIP Paila de Cocimiento (P-01)', 'Mantenimiento Bomba de Agua (B-05)', 'Verificación Intercambiador de Placas (I-02)'.

Cada tarjeta debe tener un icono que identifique la tarea (limpieza vs. mantenimiento), la hora de vencimiento y un indicador de estado visual."

5. Funcionalidades y Flujos Clave

"Define los siguientes flujos operativos:

Flujo de Agenda Dinámica (Lógica): La aplicación debe generar tareas automáticamente basadas en la frecuencia definida (ej: CIP diario, mantenimiento semanal, limpieza tras 'X' lotes).

Integración de Turnos (Lógica): Usar la hora actual y el selector de turnos para mostrar en el dashboard central solo las tareas relevantes para el turno activo en ese momento.

Registro de Finalización: Al hacer clic en una tarjeta de tarea, abrir una ventana modal moderna para marcar la tarea como 'Completada', subir una foto (opcional) y registrar incidencias.

Desarrollo: Usar React, con un toolkit moderno (como Tailwind o Ant Design), enfocado en la responsividad móvil."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6fe299b4-4417-40f2-8dc7-9a6bc2100b03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
