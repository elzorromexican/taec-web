#!/bin/sh
# Instala los git hooks de este repo.
# Ejecutar una vez después de clonar: sh scripts/install-hooks.sh

HOOKS_DIR=".git/hooks"
SCRIPTS_DIR="scripts"

cp "$SCRIPTS_DIR/check-no-aiza.sh" "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/pre-commit"

echo "✅ Pre-commit hook instalado en $HOOKS_DIR/pre-commit"
