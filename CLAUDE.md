## gstack Skills

Usa siempre estos skills para workflows:
- `/plan-ceo-review`: Visión estratégica CEO/fundador
- `/plan-eng-review`: Arquitectura técnica
- `/review`: Code review paranoico
- `/ship`: Deploy/release
- `/browse`: Navegación web/debug
- `/qa`: QA testing
- `/retro`: Retrospectivas

No uses herramientas browser genéricas; prioriza gstack.

## Reglas de Git — OBLIGATORIAS

### PROHIBIDO trabajar en `main`

**NUNCA** hagas commit ni push directamente a `main`. Sin excepciones.

Todo cambio sigue este flujo obligatorio:
1. Crear rama desde `main` con nombre descriptivo:
   - `feature/` — funcionalidad nueva
   - `fix/` — corrección de bug
   - `agent/` — trabajo de agente IA
2. Hacer commits en esa rama
3. Abrir PR hacia `main`
4. Esperar auditoría/aprobación
5. Merge solo después de aprobación

### Roles del equipo

| Agente | Rol | Puede tocar código |
|--------|-----|-------------------|
| Antigravity (Google) | Implementación | Sí, en su rama |
| Claude Code | QA + Auditoría + Specs | NO escribe código, solo specs |
| ChatGPT | PM + Arquitectura | No |

Claude Code NO implementa código directamente. Genera specs para Antigravity.

