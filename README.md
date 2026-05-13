# 📦 Stocky — Sistema de Gestión de Inventario

**Stocky** es una aplicación web minimalista y funcional diseñada para el control de inventarios en tiempo real. Permite gestionar productos, monitorear niveles de stock y visualizar métricas clave a través de un dashboard interactivo.

Este proyecto ha sido desarrollado siguiendo una arquitectura limpia en el frontend, utilizando tecnologías nativas para garantizar velocidad y eficiencia.

---

## 🚀 Características Principales

- **Gestión CRUD Completa**: Permite agregar, listar, editar y eliminar productos del inventario.
- **Dashboard de Estadísticas**: 
  - Visualización del total de productos.
  - Cálculo automático del valor total del inventario.
  - Contador de productos con **Stock Bajo** (menos de 5 unidades).
  - Resumen de categorías registradas.
- **Búsqueda en Tiempo Real**: Filtrado dinámico por nombre o categoría mientras escribes.
- **Alertas Visuales**: Los productos con existencias críticas se resaltan automáticamente con etiquetas de advertencia.
- **Diseño Responsive**: Interfaz adaptativa optimizada para dispositivos móviles, tablets y escritorio.
- **Sanitización de Datos**: Implementación de limpieza de HTML para prevenir ataques básicos de XSS.

---

## 🤝 Guía de Colaboración

Para mantener el orden en el desarrollo, cada integrante debe seguir este flujo de trabajo:

1. **Clonar el repositorio**:
   `git clone https://github.com/ela-andaia/Sistema-Stocky.git`
2. **Crear una rama propia** (según su tarea):
   `git checkout -b feature/nombre-tarea`
3. **Realizar cambios y commits** siguiendo las políticas establecidas.
4. **Subir la rama a GitHub**:
   `git push origin feature/nombre-tarea`
5. **Crear un Pull Request (PR)**: Notificar a la líder para revisión y Merge.

---

## 📜 Reglas del Proyecto

### 1. Asignación de Tareas
Cada colaborador tiene una responsabilidad específica asignada:
- **Adrián**: Implementación de validaciones de formularios.
- **Rubén**: Sistema de paginación de productos.
- **Emilio**: Exportación de reportes en formato CSV.

### 2. Política de Commits
Es obligatorio usar los siguientes prefijos en todos los mensajes de commit:
- `feat:` Nuevas funcionalidades o componentes.
- `fix:` Corrección de errores o bugs.
- `style:` Cambios visuales, CSS o diseño (sin cambiar lógica).
- `docs:` Cambios en la documentación o archivos README.
- `refactor:` Mejoras en la estructura del código existente.

### 3. Nombramiento de Ramas
- Funcionalidades: `feature/nombre-funcionalidad`
- Correcciones: `fix/nombre-bug`

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica avanzada.
- **CSS3**: Layouts modernos mediante **Grid** y **Flexbox**.
- **JavaScript (ES6+)**: Lógica de negocio y manipulación del DOM.
- **Tabler Icons**: Iconografía profesional.

---

## 📂 Estructura del Proyecto

```text
Sistema-Stocky/
├── index.html   # Interfaz de usuario principal.
├── style.css    # Diseño visual y responsive.
├── app.js       # Lógica del sistema y CRUD.
└── README.md    # Guía técnica y de colaboración.