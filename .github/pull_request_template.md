## Descripción del PR

[Por favor describe brevemente los cambios introducidos por este PR.]

## Checklist General

- [ ] He añadido/actualizado los headers JSDoc y el changelog en los archivos modificados según el estándar del proyecto.
- [ ] He verificado que mi código no incluye el literal prohibido (`AIza`).
- [ ] Los comentarios inline están presentes en la nueva lógica.

---

## ⚠️ Paso Obligatorio Post-Merge (Regeneración de Embeddings)

**ATENCIÓN:** Si este PR modifica alguno de los siguientes archivos/directorios:
- `astro-web/src/data/titoKnowledgeBase.ts`
- `astro-web/src/content/wiki/**`
- `astro-web/src/data/chatContextRules.ts`

**DEBES ejecutar los siguientes comandos inmediatamente después del merge para que los cambios lleguen a TitoBits en producción:**

```bash
# 1. KB items (titoKnowledgeBase.ts)
python generate_kb_embeddings.py

# 2. Chunks de wiki Markdown (src/content/wiki/)
npx tsx scripts/run-reindex.ts   # requiere dev server corriendo
```

- [ ] **Prueba de humo obligatoria:** Después de regenerar los embeddings, confirma haciendo exactamente la pregunta que motivó el cambio en el chat de producción y verifica que Tito responde con el contenido nuevo. Sin esta verificación, el fix no ha llegado a Tito real.
