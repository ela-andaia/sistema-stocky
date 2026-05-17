# CHANGELOG — Stocky Sistema de Inventario

## [v1.1] — 2026-05-17

### Nuevas funcionalidades
- Validaciones de entrada para campos del formulario de productos
- Exportación del inventario completo en formato CSV
- Paginación de la tabla de productos en bloques de 7 registros

### Seguridad
- Parche de sanitización HTML contra ataques XSS en función escHtml

### Integración continua
- Configuración de pipeline CI con GitHub Actions (.github/workflows/ci.yml)

### Gestión colaborativa
- Flujo de trabajo basado en Feature Branches
- Pull Requests con revisión obligatoria antes de merge a main
- Política de commits basada en Conventional Commits
