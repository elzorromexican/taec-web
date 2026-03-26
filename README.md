# TAEC Web App

Plataforma corporativa y e-learning de **TAEC (Tecnología Aplicada a la Educación Corporativa)**, especializada en el desarrollo de contenidos, plataformas LMS y herramientas de autor como Articulate 360 y Vyond.

![TAEC Logo](https://www.taec.com.mx/assets/img/logo-taec.svg)

## 🚀 Tecnologías Principales

El frontend del proyecto está desacoplado bajo el subdirectorio `/astro-web` y construido con las siguientes tecnologías de alto rendimiento:

- **Framework:** [Astro](https://astro.build/) (Generación de Sitios Estáticos - SSG)
- **Componentes Reactivos:** [React](https://reactjs.org/) (Islands Architecture)
- **Estilos:** CSS puro / Modular
- **Despliegue:** GitHub Pages (vía `.github/workflows`)
- **Gestión de Lógica:** TypeScript / Vanilla JavaScript

## 📁 Estructura del Proyecto

```text
taec-web/
├── astro-web/              # Código fuente principal de la aplicación web
│   ├── public/             # Assets estáticos (imágenes, CSVs, fuentes, legacy)
│   ├── src/
│   │   ├── components/     # Componentes de Astro y React (UI, Layouts)
│   │   ├── data/           # Datos duros y constantes (Menús, Catálogos)
│   │   ├── layouts/        # Plantillas maestras de página
│   │   └── pages/          # Rutas dinámicas y estáticas (.astro)
│   ├── astro.config.mjs    # Configuración del motor Astro
│   └── package.json        # Dependencias de npm
├── .github/workflows/      # Pipelines CI/CD para GitHub Actions
├── docs/                   # Documentación y PDFs de diseño
└── task.md                 # Bitácora maestra dinámica de progreso y roadmaps
```

## 🛠 Instalación y Desarrollo Local

Todo el ecosistema Node reside dentro de la carpeta `astro-web`. Para levantar el entorno de desarrollo:

1. Clonar el repositorio.
2. Navegar a la carpeta del código fuente:
   ```bash
   cd astro-web
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Levantar el servidor local (con Hot Reloading en el puerto `4321`):
   ```bash
   npm run dev
   ```

## 🌐 Producción y Despliegue

La aplicación está diseñada bajo el patrón de generación de sitios estáticos (SSG). El despliegue a **GitHub Pages** está totalmente automatizado. 
Cada vez que se hace un `push` a la rama `main`, la GitHub Action (`deploy-pages.yml`) se detona, compila el sitio y lo empuja a la rama `gh-pages` para publicarlo en vivo.

## 🤖 Integración con IA

Este proyecto aprovecha herramientas avanzadas de AI-Coders, usando `cursorrules` y habilidades documentadas en `.gemini/skills/taec-standards` para asegurar estandarización semántica a lo largo de los componentes.

---
*TAEC - Excelencia en E-Learning*
