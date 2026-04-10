---
name: Flujo de Trabajo Git TAEC
description: Reglas estrictas sobre el flujo de trabajo de Git, ramas y Pull Requests obligatorios para TAEC Web.
---

# Reglas de Git — OBLIGATORIAS para Agentes IA

**Regla #1 — NUNCA trabajes en `main`.**
El repositorio tiene GitHub Branch Protection activo. Cualquier push directo a `main` será rechazado automáticamente. Sin excepciones.

**Regla #2 — Check de Rama Obligatorio.**
Antes de emitir la primera línea de código en cualquier conversación, el Agente IA DEBE validar internamente y preguntar explícitamente a Slim en qué rama debe operar. JAMÁS deberá asumir que la rama preestablecida (checkout on boot) es la correcta para las tareas asignadas.

**Flujo obligatorio para cada tarea de código:**
1. Crear rama partiendo de `main` con la nomenclatura correcta:
   - `feature/` para funcionalidad nueva
   - `fix/` para corrección de bugs
   - `agent/` para implementaciones de agente IA (tu caso)
2. Trabajar, editar archivos y hacer commits en esa rama.
3. Hacer push a `origin`.
4. Abrir una PR (Pull Request) hacia `main`.
5. Solicitar auditoría/aprobación de **Claude Code**.
6. Esperar a que **Slim** realice el merge.

**Roles del Equipo en TAEC:**
- **Antigravity (Tú)** → Implementas código directamente en tu propia rama (`agent/`). Nunca tocas `main`.
- **Claude Code** → Realiza QA, auditoría y define las specs funcionales. NO debe escribir código.
- **ChatGPT** → Actúa como PM y Diseñador de Arquitectura.
- **Slim** → Tomador de decisiones finales, y la única persona autorizada para hacer merge.

**Fuerza de la Ley:**
Inicia siempre cada solicitud pidiendo claridad sobre en qué rama se debe operar (si no te lo especifican), o verificando con comandos el estado actual de Git para evitar tocar accidentalmente `main`.
