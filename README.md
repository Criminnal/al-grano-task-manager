# Al Grano — Gestor de tareas

Aplicación web sencilla para gestionar tareas del día a día: crearlas, marcarlas como
completadas, asignarles una prioridad y eliminarlas cuando ya no las necesites. Todo funciona
directamente en tu navegador, sin necesidad de crear una cuenta ni conectarte a internet.

Este proyecto se ha creado como primera aplicación práctica de un tutorial para aprender a
construir apps con ayuda de inteligencia artificial, sin necesidad de tener conocimientos
avanzados de programación.

## Qué puedes hacer con esta aplicación

- **Crear una tarea** escribiendo su nombre y pulsando «Añadir».
- **Ver la lista** de todas las tareas que has creado.
- **Marcar una tarea como completada** haciendo clic en su casilla.
- **Volver a marcarla como pendiente** haciendo clic de nuevo en la misma casilla.
- **Eliminar una tarea** con el botón «Eliminar» de cada tarjeta.
- **Asignar una prioridad** (Baja, Media o Alta) a cada tarea al crearla, visible con un color
  distinto para cada nivel.
- **Conservar tus tareas** aunque cierres el navegador o recargues la página: se guardan
  automáticamente en tu propio dispositivo.

## Dónde se guardan tus datos

Las tareas se guardan **únicamente en tu navegador**, usando una tecnología llamada
`localStorage`. Esto significa que:

- No existe ningún servidor ni base de datos externa: tus datos nunca salen de tu ordenador.
- No hay cuentas de usuario ni inicio de sesión.
- Las tareas **no se sincronizan** entre dispositivos ni entre navegadores distintos: si abres la
  aplicación en otro ordenador o en otro navegador, empezarás con la lista vacía.
- Si borras los datos de navegación de tu navegador (caché, cookies y almacenamiento local) para
  este sitio, perderás las tareas guardadas.

## Tecnologías utilizadas

- [React](https://react.dev/) — para construir la interfaz.
- [Vite](https://vite.dev/) — para arrancar el proyecto y generar la versión final.
- JavaScript (sin TypeScript).
- CSS plano, sin frameworks ni librerías de estilos.
- `localStorage` del navegador, para la persistencia de datos.

No se usa ningún backend, base de datos externa, sistema de usuarios, API externa ni Docker.

## Requisitos previos

Necesitas tener instalado en tu ordenador:

- **Node.js** en una de estas versiones: `20.19` o superior (dentro de la serie 20), o `22.12` o
  superior. Esto lo exige la versión de Vite que usa este proyecto.
- **npm** (se instala automáticamente junto con Node.js). Se recomienda una versión `10` o
  posterior.

Para comprobar qué versiones tienes instaladas, abre una terminal y ejecuta:

```bash
node --version
npm --version
```

Si no tienes Node.js instalado, puedes descargarlo desde [nodejs.org](https://nodejs.org/).

## Cómo poner en marcha el proyecto

Abre una terminal en la carpeta del proyecto y sigue estos pasos, uno por uno.

**1. Instalar las dependencias** (solo hace falta la primera vez, o si el proyecto cambia):

```bash
npm install
```

**2. Arrancar la aplicación en modo desarrollo** (para trabajar en ella y ver los cambios al
instante):

```bash
npm run dev
```

La terminal mostrará una dirección como `http://localhost:5173/`. Ábrela en tu navegador para ver
la aplicación funcionando. Para detener el servidor, vuelve a la terminal y pulsa `Ctrl + C`.

**3. Revisar la calidad del código** (comprueba que no haya errores de estilo o de programación):

```bash
npm run lint
```

**4. Generar la versión final optimizada** (la que se usaría para publicar la aplicación):

```bash
npm run build
```

Esto crea una carpeta `dist/` con los archivos listos para producción.

**5. Previsualizar esa versión final** (para comprobar que el resultado del paso anterior
funciona correctamente):

```bash
npm run preview
```

## Estructura del proyecto

```
al-grano-task-manager/
├── index.html                    # Punto de entrada de la aplicación
├── package.json                  # Dependencias y comandos disponibles
├── vite.config.js                # Configuración de Vite
├── ROADMAP.md                    # Historial y estado de cada fase de desarrollo
└── src/
    ├── main.jsx                  # Arranque de React
    ├── App.jsx                   # Estado de las tareas y lógica principal
    ├── storage.js                # Guardar y leer las tareas en localStorage
    ├── styles.css                # Todos los estilos de la aplicación
    └── components/
        ├── TaskForm.jsx          # Formulario para crear una tarea
        ├── TaskList.jsx          # Lista de tareas (o mensaje de lista vacía)
        └── TaskItem.jsx          # Una tarea individual
```

## Historial de desarrollo

Este proyecto se construyó de forma incremental, fase a fase, con revisión y aprobación en cada
paso. El detalle completo de cada fase —qué se hizo, cómo se comprobó y cuándo se aprobó— está
documentado en [ROADMAP.md](ROADMAP.md).
