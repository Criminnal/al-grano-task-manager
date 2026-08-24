# ROADMAP — Al Grano Task Manager

Gestor de tareas sencillo construido con React + Vite + JavaScript, sin backend ni dependencias
innecesarias. Este documento es la fuente de verdad del avance del proyecto y debe poder auditarse
por una IA o persona con acceso de **solo lectura** al repositorio.

---

## 1. Estado del repositorio antes de empezar

Análisis realizado el 2026-08-24 sobre `D:\AL_Grano_apps\al-grano-task-manager` (rama `main`,
commit `eac0ac1 Initial commit`).

Contenido existente (**se conserva íntegramente**):

| Archivo | Contenido | Decisión |
| --- | --- | --- |
| `.gitignore` | Plantilla estándar de Node (ignora `node_modules/`, `dist`, `.env`, caché de Vite) | Se conserva. Ya cubre las necesidades del proyecto. |
| `LICENSE` | Licencia MIT | Se conserva sin cambios. |
| `README.md` | 2 líneas describiendo el proyecto | Se conserva; se ampliará en la Fase 6 con instrucciones de uso. |

No existe `package.json`, ni código fuente, ni configuración previa. El proyecto se crea **encima**
de este contenido, sin borrar nada.

Entorno verificado: Node **v24.19.0**, npm **11.16.0** (compatibles con Vite 5/6+).

---

## 2. Alcance acordado

**Sí incluye:** crear tarea · listar tareas · completar/descompletar · eliminar · prioridad
(baja/media/alta) · persistencia en `localStorage`.

**No incluye (fuera de alcance salvo petición expresa posterior):** backend, base de datos, login,
usuarios, APIs externas, pagos, Docker, IA dentro de la app, categorías, fechas límite, filtros,
búsqueda, sincronización, animaciones complejas, modo oscuro, notificaciones.

---

## 3. Estructura propuesta

Estructura mínima y explícita, pensada para que se entienda leyéndola:

```
al-grano-task-manager/
├── index.html               # Punto de entrada HTML (lo genera Vite)
├── package.json             # Dependencias y scripts (dev / build / preview / lint)
├── vite.config.js           # Configuración de Vite
├── .oxlintrc.json           # Reglas de linting (Oxlint, incluido en la plantilla oficial de Vite)
├── ROADMAP.md               # Este documento
├── README.md                # Descripción y cómo ejecutar el proyecto
├── LICENSE                  # MIT (existente)
├── .gitignore               # Existente
└── src/
    ├── main.jsx             # Arranque de React
    ├── App.jsx              # Estado de las tareas y lógica principal
    ├── styles.css           # Todos los estilos de la aplicación
    ├── storage.js           # Leer/guardar tareas en localStorage (Fase 5)
    └── components/
        ├── TaskForm.jsx     # Campo de texto + selector de prioridad + botón añadir
        ├── TaskList.jsx     # Renderiza la lista (o el mensaje de lista vacía)
        └── TaskItem.jsx     # Una tarea: checkbox, texto, prioridad, botón eliminar
```

**Decisiones técnicas:**

- **JavaScript, no TypeScript.** El público objetivo son personas sin conocimientos avanzados de
  programación; TypeScript añadiría tipos y errores de compilación sin aportar valor en una app de
  este tamaño.
- **Sin librerías adicionales.** Nada de router (una sola pantalla), gestor de estado (`useState`
  basta), librería de UI ni de iconos. Las únicas dependencias serán `react`, `react-dom` y las de
  desarrollo que instala la plantilla oficial de Vite.
- **CSS plano en un único archivo** con variables CSS para los colores. Sin preprocesadores ni
  frameworks de estilos.
- **Los `id` de las tareas** se generan con `crypto.randomUUID()`, disponible de forma nativa en
  navegadores modernos. Cero dependencias.

**Modelo de datos de una tarea** (estable desde la Fase 3, la prioridad se añade en la Fase 4):

```js
{
  id: "uuid-string",
  text: "Comprar pan",
  completed: false,
  priority: "media",   // "baja" | "media" | "alta"  (desde Fase 4)
  createdAt: 1756000000000
}
```

---

## 4. Cómo verificar este proyecto (para el revisor)

Comandos disponibles en cualquier fase a partir de la Fase 1:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Criterio general para todas las fases: una fase solo puede marcarse 🟢 si `npm run build` termina
sin errores y `npm run lint` no reporta errores (los *warnings* deben quedar documentados en el
informe de cierre de la fase).

---

## 5. Fases

Estados posibles: ⚪ Pendiente · 🟡 En progreso · 🟢 Completado

---

### Fase 1 — Preparación del proyecto

**Estado:** 🟢 Completado (2026-08-24)

**Objetivo**
Tener un proyecto React + Vite funcional que arranque y compile, conservando el contenido previo del
repositorio.

**Tareas**
1. Inicializar el proyecto con la plantilla oficial `react` (JavaScript) de Vite en la raíz, sin
   sobrescribir `.gitignore`, `LICENSE` ni `README.md`.
2. Instalar dependencias con `npm install`.
3. Comprobar que el servidor de desarrollo arranca y que el build de producción funciona.
4. Dejar la estructura mínima de `src/` limpia (eliminar el contenido de demostración de la
   plantilla: contador, logos, `App.css`, `index.css` de ejemplo).

**Criterios de aceptación (verificables)**
- [x] Existe `package.json` con `react` y `react-dom` en `dependencies` y con los scripts `dev`,
      `build`, `preview` y `lint`.
- [x] Existen `index.html`, `vite.config.js`, `src/main.jsx` y `src/App.jsx`.
- [x] `dependencies` **no** contiene ninguna librería fuera de `react` y `react-dom`.
- [x] `npm run build` termina con código de salida 0 y genera `dist/`.
- [x] `npm run dev` arranca y sirve la aplicación sin errores en consola.
- [x] `LICENSE` y `.gitignore` siguen intactos respecto al commit `eac0ac1`
      (`git diff eac0ac1 -- LICENSE .gitignore` no devuelve nada).
- [x] No quedan restos de la demo de Vite: no existen `src/assets/react.svg` ni `src/App.css`, y
      `src/App.jsx` no contiene el contador de ejemplo.

**Nota:** también se verificó `README.md` con el mismo `git diff` (petición explícita de esta fase),
sin diferencias.

---

### Fase 2 — Interfaz base

**Estado:** 🟢 Completado (2026-08-24)

**Objetivo**
Construir la estructura visual completa de la aplicación, todavía **sin lógica**: se ve la pantalla
final pero los botones aún no hacen nada.

**Tareas**
1. Crear la cabecera con el título de la aplicación.
2. Crear `TaskForm.jsx`: campo de texto para el nombre de la tarea y botón «Añadir».
3. Crear `TaskList.jsx` y `TaskItem.jsx` con la maquetación de una tarea (checkbox, texto, botón
   eliminar) y el mensaje para lista vacía.
4. Escribir `styles.css`: layout centrado, tipografía legible, espaciados, estados `:hover` y
   `:focus` visibles.

**Criterios de aceptación (verificables)**
- [x] Existen `src/components/TaskForm.jsx`, `src/components/TaskList.jsx`,
      `src/components/TaskItem.jsx` y `src/styles.css`.
- [x] `src/App.jsx` importa y renderiza `TaskForm` y `TaskList`.
- [x] `src/main.jsx` (o `App.jsx`) importa `styles.css`.
- [x] La página muestra: título, campo de texto, botón «Añadir» y una zona de lista.
- [x] El formulario usa `<label>` asociado al `<input>` (accesibilidad básica).
- [x] `npm run build` y `npm run lint` pasan sin errores.

**Nota:** `TaskList` recibe una prop `tasks` con valor por defecto `[]` (sin `useState`, sin datos
de ejemplo), por lo que en esta fase solo es visible el mensaje de lista vacía. `TaskItem` queda
implementado y referenciado desde `TaskList.map`, listo para mostrarse en la Fase 3 cuando exista
gestión real de tareas.

**Corrección aplicada (2026-08-24):** en la media query móvil, `.task-form__field` heredaba
`flex-basis: 200px` de la regla base, que en `flex-direction: column` se interpretaba como altura
mínima y generaba un hueco vertical artificial de ~135px antes del botón. Se añadió
`.task-form__field { flex: 0 1 auto; }` dentro de la media query para restablecer el
comportamiento flexible en columna, sin afectar al diseño de escritorio.

---

### Fase 3 — Gestión de tareas

**Estado:** 🟢 Completado (2026-08-24)

**Objetivo**
Que la aplicación funcione de verdad: crear, listar, completar/descompletar y eliminar tareas
(en memoria, todavía sin persistencia).

**Tareas**
1. Añadir el estado `tasks` en `App.jsx` con `useState`.
2. Implementar `addTask`: crea la tarea con `id`, `text`, `completed: false` y `createdAt`; ignora
   entradas vacías o solo con espacios; limpia el campo tras añadir.
3. Implementar `toggleTask`: alterna `completed`.
4. Implementar `deleteTask`: elimina la tarea por `id`.
5. Mostrar visualmente la tarea completada (texto tachado y atenuado).
6. Mostrar un mensaje cuando no hay tareas.

**Criterios de aceptación (verificables)**
- [x] `src/App.jsx` define las funciones de añadir, alternar y eliminar, y las pasa como props.
- [x] Se puede añadir una tarea y aparece en la lista.
- [x] Enviar el formulario vacío o con solo espacios **no** crea ninguna tarea.
- [x] Marcar el checkbox tacha la tarea; desmarcarlo la devuelve a pendiente.
- [x] El botón eliminar borra únicamente la tarea correspondiente.
- [x] Con la lista vacía se muestra un mensaje informativo, no una zona en blanco.
- [x] Cada elemento de la lista tiene una `key` estable basada en `task.id` (no en el índice).
- [x] `npm run build` y `npm run lint` pasan sin errores.

**Nota:** la validación existe en dos capas con propósitos distintos. `TaskForm` valida por
experiencia de usuario: evita envíos innecesarios y controla cuándo se limpia el campo. `App.addTask`
protege además la integridad del propio estado —vuelve a aplicar `trim()` y descarta el resultado si
queda vacío antes de crear la tarea—, por lo que no debe asumirse que `addTask` recibe siempre texto
ya válido solo porque `TaskForm` valida primero. Las tres actualizaciones de estado (`addTask`,
`toggleTask`, `deleteTask`) usan la forma funcional de `setTasks` para evitar estado obsoleto.

---

### Fase 4 — Prioridades

**Estado:** 🟢 Completado (2026-08-24)

**Objetivo**
Permitir asignar prioridad baja, media o alta a cada tarea y que se distinga claramente en la
interfaz.

**Tareas**
1. Añadir un `<select>` de prioridad en `TaskForm.jsx` con valor por defecto «media».
2. Guardar `priority` en el objeto de la tarea al crearla.
3. Mostrar la prioridad en `TaskItem.jsx` como una etiqueta con color propio.
4. Definir en `styles.css` un color distinto por prioridad, acompañado siempre del texto
   («Baja», «Media», «Alta») para no depender solo del color.

**Criterios de aceptación (verificables)**
- [x] `TaskForm.jsx` contiene un `<select>` con exactamente las opciones baja, media y alta, con
      su `<label>` asociado.
- [x] Las tareas nuevas se crean con la propiedad `priority`.
- [x] `TaskItem.jsx` renderiza la prioridad como texto visible, no solo como color.
- [x] `styles.css` define un estilo diferenciado para cada una de las tres prioridades.
- [x] Tras añadir una tarea, el selector vuelve al valor por defecto.
- [x] `npm run build` y `npm run lint` pasan sin errores.

**Nota:** la defensa contra valores de prioridad inesperados vive en `App.addTask`, no en
`TaskForm`: una constante `VALID_PRIORITIES = ['baja', 'media', 'alta']` decide si el valor recibido
es válido; si no lo es, se sustituye por `'media'` antes de crear la tarea, de modo que el estado
nunca contiene una prioridad fuera de las tres permitidas, incluso si `TaskForm` llegara a enviar un
valor distinto a los suyos propios.

---

### Fase 5 — Persistencia local

**Estado:** 🟢 Completado (2026-08-24)

**Objetivo**
Que las tareas sobrevivan a una recarga o al cierre del navegador, usando `localStorage`.

**Tareas**
1. Crear `src/storage.js` con dos funciones: `loadTasks()` y `saveTasks(tasks)`, usando una clave
   constante (p. ej. `al-grano-tasks`).
2. Inicializar el estado de `App.jsx` leyendo de `localStorage`.
3. Guardar en `localStorage` cada vez que cambien las tareas, con `useEffect`.
4. Proteger la lectura con `try/catch` para que un dato corrupto no rompa la aplicación: si el JSON
   es inválido, arrancar con una lista vacía.

**Criterios de aceptación (verificables)**
- [x] Existe `src/storage.js` y exporta las funciones de carga y guardado.
- [x] La lectura de `localStorage` está envuelta en `try/catch` y devuelve `[]` ante un error.
- [x] `App.jsx` usa `useEffect` para guardar cuando cambia `tasks`.
- [x] Manual: se añaden tareas, se recarga con F5 y siguen ahí, conservando su estado de
      completada y su prioridad.
- [x] Manual: escribir un valor inválido en la clave de `localStorage` y recargar no rompe la app.
- [x] `npm run build` y `npm run lint` pasan sin errores.

**Nota — validación de datos cargados:** `loadTasks()` no se limita a proteger `JSON.parse` con
`try/catch`; también exige que el resultado sea un array (si no lo es —objeto, `null`, cadena,
número—, devuelve `[]`) y valida cada entrada de forma individual (`id` string no vacío, `text`
string no vacío tras `trim()`, `completed` booleano, `priority` en `baja`/`media`/`alta`,
`createdAt` número finito). **Política elegida para arrays parcialmente corruptos: filtrar y
conservar solo las entradas válidas**, en vez de descartar el array completo por una sola entrada
corrupta. Los `id` duplicados se deduplican quedándose con la primera aparición, para no producir
claves de React repetidas. El texto se normaliza con `trim()` también al cargar, no solo al crear.

---

### Fase 6 — Revisión final

**Estado:** ⚪ Pendiente

**Objetivo**
Verificar que todos los requisitos iniciales funcionan, dejar el repositorio limpio y documentado.

**Tareas**
1. Repasar los 7 requisitos funcionales uno a uno en el navegador.
2. Revisar la consola del navegador: cero errores y cero warnings de React.
3. Ejecutar `npm run lint` y `npm run build` y dejar constancia del resultado.
4. Revisar el código: nombres claros, sin código muerto, sin `console.log` olvidados.
5. Actualizar `README.md` con qué es la app, cómo instalarla y cómo ejecutarla.
6. Comprobar que la app se ve correctamente en una ventana estrecha (móvil).

**Criterios de aceptación (verificables)**
- [ ] Los 7 requisitos funcionan: crear · listar · completar · descompletar · eliminar · prioridad ·
      persistencia.
- [ ] `npm run lint` sin errores; cualquier warning queda documentado en el informe.
- [ ] `npm run build` termina con código de salida 0.
- [ ] No hay `console.log` ni código comentado sin uso en `src/`.
- [ ] `README.md` explica instalación y ejecución.
- [ ] Todas las fases anteriores están en estado 🟢.
- [ ] Las dependencias de producción siguen siendo únicamente `react` y `react-dom`.

---

## 6. Regla de trabajo

1. Se implementa **una única fase por vez**, previa autorización expresa.
2. Al terminar, se ejecutan las comprobaciones de la fase.
3. `ROADMAP.md` solo se actualiza cuando la evidencia lo justifica.
4. Se entrega un informe de cierre (Resumen · Cambios · Comprobaciones · Riesgos, supuestos y
   pendientes) y se espera autorización antes de continuar.

## 7. Registro de avance

| Fase | Estado | Fecha de cierre | Commit |
| --- | --- | --- | --- |
| 1 — Preparación del proyecto | 🟢 Completado | 2026-08-24 | (pendiente de commit — no solicitado en esta fase) |
| 2 — Interfaz base | 🟢 Completado | 2026-08-24 | (pendiente de commit — no solicitado en esta fase) |
| 3 — Gestión de tareas | 🟢 Completado | 2026-08-24 | (pendiente de commit — no solicitado en esta fase) |
| 4 — Prioridades | 🟢 Completado | 2026-08-24 | (pendiente de commit — no solicitado en esta fase) |
| 5 — Persistencia local | 🟢 Completado | 2026-08-24 | (pendiente de commit — no solicitado en esta fase) |
| 6 — Revisión final | ⚪ Pendiente | — | — |
