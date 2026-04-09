#!/bin/sh
# Bloquea commits que contengan el literal "AIza" en archivos staged.
# Motivo: Vite preserva comentarios en el bundle SSR (.netlify/build/chunks/*.mjs)
# y el secrets scanner de Netlify tiene regex AIza[0-9A-Za-z\-_]{35} que
# dispara false positives incluso en comentarios de documentación.
# Usa descriptores genéricos: "GCP_API_KEY_PREFIX", "prefijo de llave GCP", etc.

STAGED=$(git diff --cached --name-only 2>/dev/null)

if [ -z "$STAGED" ]; then
  exit 0
fi

MATCH=$(echo "$STAGED" | xargs grep -l 'AIza' 2>/dev/null)

if [ -n "$MATCH" ]; then
  echo ""
  echo "❌ COMMIT BLOQUEADO — Netlify secrets scanner protection"
  echo ""
  echo "El patrón 'AIza' fue detectado en:"
  echo "$MATCH" | sed 's/^/  → /'
  echo ""
  echo "Solución: Reemplaza 'AIza...' en comentarios por 'GCP_API_KEY_PREFIX'"
  echo "o cualquier descripción genérica. Vite incluye los comentarios en el"
  echo "bundle SSR y el scanner de Netlify lo detecta como secret real."
  echo ""
  exit 1
fi

exit 0
