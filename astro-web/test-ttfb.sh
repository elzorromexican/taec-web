#!/bin/bash
set -a
source .env
export SUPABASE_URL=$PUBLIC_SUPABASE_URL
export SUPABASE_SERVICE_ROLE_KEY=$PUBLIC_SUPABASE_ANON_KEY
set +a

# Kill any existing astro node
pkill -f 'npm run dev' || true
pkill -f 'astro dev' || true

npm run dev -- --port 5555 > dev.log 2>&1 &
PID=$!
sleep 6

echo -e "\n--- Prueba Inicial (Validando status HTTP) ---"
curl -i -X POST http://localhost:5555/api/agente-ia \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"userMessage":"¿Cuál es el precio de Vyond en México?","countryCode":"MX","session_id":"123","history":[]}'

echo -e "\n\n--- Prueba Carga para TTFB ---"
curl -w "\n=========================\nResultados de Latencia:\nResolve: %{time_namelookup} s\nConnect: %{time_connect} s\nTTFB: %{time_starttransfer} s\nTotal: %{time_total} s\n=========================\n" \
  -N -X POST http://localhost:5555/api/agente-ia \
  -H "Content-Type: application/json" \
  -d '{"userMessage":"¿Me puedes detallar más cosas sobre las características de Reach 360 y su precio público?","countryCode":"MX","session_id":"123","history":[]}' > /tmp/ttfb_out.txt

cat /tmp/ttfb_out.txt

kill $PID
wait $PID 2>/dev/null
