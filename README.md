# Tablero Kanban para la Agencia de Eventos "Momentum"

## Descripción
La agencia de eventos "Momentum" requiere una aplicación web que permita gestionar tareas y eventos a través de un tablero Kanban dinámico. Este proyecto implementa dicha aplicación, proporcionando a los usuarios una interfaz interactiva, modular y responsiva para crear, editar, mover y eliminar tareas en columnas organizadas.

## Funcionalidades Principales
1. **Interfaz del Tablero Kanban:**
   - Tres columnas principales: `Pendientes`, `En progreso` y `Completadas`.

2. **Gestión de Tareas:**
   - Cada tarea incluye:
     - Título
     - Descripción
     - Imagen opcional
     - Fecha de inicio y finalización
     - Asignación a una columna específica
   - Permite:
     - Crear nuevas tareas.
     - Editar información de tareas existentes.
     - Mover tareas entre columnas.
     - Eliminar tareas.

3. **Sistema de Usuarios:**
   - Registro e inicio de sesión.
   - Gestión de tareas:
     - Sin iniciar sesión, las tareas se guardan temporalmente en la sesión actual.
     - Con sesión iniciada, las tareas se almacenan de forma persistente en un servidor usando `json-server`.

4. **Persistencia de Tareas:**
   - Al iniciar sesión, las tareas previas del usuario se cargan automáticamente en el tablero, en las columnas correspondientes.

5. **Validación de Entradas:**
   - Los campos de título, descripción y fechas son validados antes de crear o editar una tarea.

6. **Diseño Responsivo:**
   - Interfaz adaptable para diferentes dispositivos (escritorio, tablet y móvil).
   - Diseño limpio y sencillo con estilos CSS.

7. **Gestión Modular y Buenas Prácticas:**
   - Código organizado y modularizado.
   - Separación de responsabilidades por archivos.

## Estructura del Proyecto
```plaintext
📂 Examen JavaScript
├── 📂 css
│   └── styles.css          # Estilos CSS para el diseño responsivo y atractivo
│   └── styleLogin.css       
│   └── styleRegistro.css        
├── 📂 js
│   ├── app.js              # Lógica principal del proyecto
│   ├── login.js             # Funciones relacionadas con el registro e inicio de sesión
│   └── registro.js           
├── 📂 db
│   └── db.json           # Carpeta con la base de datos/API del proyecto.
├── index.html              # Página principal del tablero Kanban
├── registro.html           # Página de registro de usuario
├── login.html              # Página de inicio de sesión
└── README.md               # Documentación del proyecto
