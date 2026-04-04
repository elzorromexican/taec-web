const fs = require('fs');
const path = require('path');

const cursos = [
  { nombre: "Crear cursos accesibles con Articulate 360", precio: 580, categ: "Articulate 360" },
  { nombre: "Curso Articulate 360 Avanzado", precio: 289, categ: "Articulate 360" },
  { nombre: "Curso Articulate 360 Básico", precio: 429, categ: "Articulate 360" },
  { nombre: "Curso Articulate 360 Completo", precio: 749, categ: "Articulate 360" },
  { nombre: "Curso Articulate Rise 360+", precio: 289, categ: "Articulate 360" },
  { nombre: "Curso Articulate Storyline Experto", precio: 599, categ: "Articulate 360" },
  { nombre: "Curso Cerrado Articulate con AI Assistant", precio: 3750, categ: "Articulate 360" },
  { nombre: "Curso Diseño Instruccional de guion e-learning", precio: 212, categ: "Diseño Instruccional" },
  { nombre: "Curso Storyline 360 Técnicas Avanzadas", precio: 345, categ: "Articulate 360" },
  { nombre: "Desarrollo de paquete de actividades", precio: 6027, categ: "DDC" },
  { nombre: "Lo esencial para el diseño de E-learning", precio: 449, categ: "Diseño Instruccional" },
  { nombre: "Moodle Administración", precio: 90, categ: "Moodle LMS" },
  { nombre: "Moodle Administración y Creación de Cursos", precio: 230, categ: "Moodle LMS" },
  { nombre: "Moodle Creación de Cursos", precio: 190, categ: "Moodle LMS" },
  { nombre: "Vyond", precio: 268, categ: "Vyond" },
];

const dir = path.join(__dirname, 'astro-web/src/content/cursos');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

cursos.forEach(cur => {
    const slug = cur.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = path.join(dir, `${slug}.md`);
    const content = `---
titulo: "${cur.nombre}"
precio_usd: ${cur.precio}
categoria: "${cur.categ}"
portada: "/images/cursos/default.webp"
descripcion: "Aprende y domina ${cur.nombre} con nuestros expertos certificados."
---
## Temario Completo

### Módulo 1: Introducción
- Conceptos básicos y configuración inicial.
- Interfaz de usuario y primeros pasos.

### Módulo 2: Técnicas Principales
- Desarrollo práctico guiado.
- Mejores prácticas de la industria.

### Módulo 3: Proyecto Final y Evaluación
- Puesta en producción.
- Certificación y entrega oficial.
`;
    fs.writeFileSync(filename, content);
});
console.log('Archivos de cursos generados correctamente: ' + cursos.length);
