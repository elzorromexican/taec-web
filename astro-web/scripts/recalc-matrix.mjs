import fs from 'fs';
import path from 'path';

const matrixPath = '/Users/slimmasmoudi/taec-web/astro-web/src/data/ddc-pricing-matrix.json';
const data = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));

// Modificador A: Storyline y Rise (Cursos de 5 hasta 60 mins)
['storyline', 'rise'].forEach(product => {
  for (const key in data[product]) {
    for (const mins in data[product][key]) {
      const duration = parseInt(mins, 10);
      const originalHours = data[product][key][mins];
      
      // Matemática: Un curso muy corto sufre una inflación irreal en un modelo plano.
      // Esta fórmula inicia en un multiplicador ~0.55 y sube al 1.0 en productos largos.
      // Esto respeta nuestro estimado alto de cursos pesados, pero recorta la exageración del contenido breve.
      const multiplier = 0.5 + (0.5 * (duration / 60));
      const newHours = parseFloat((originalHours * multiplier).toFixed(1));
      
      data[product][key][mins] = newHours;
    }
  }
});

// Modificador B: Vyond (Vyond asume máximos de 10 minutos)
for (const key in data['vyond']) {
  for (const mins in data['vyond'][key]) {
    const duration = parseInt(mins, 10);
    const originalHours = data['vyond'][key][mins];
    
    const multiplier = 0.5 + (0.5 * (duration / 10));
    const newHours = parseFloat((originalHours * multiplier).toFixed(1));
    
    data['vyond'][key][mins] = newHours;
  }
}

fs.writeFileSync(matrixPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Operación Exitosa: Curvas logarítmicas aplicadas a matriz DDC. Los cursos cortos ahora escalan de manera responsable.');
