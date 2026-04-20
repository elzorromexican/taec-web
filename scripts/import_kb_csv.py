import ast
import csv
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(Path(__file__).parent.parent / "astro-web/.env")

CSV_PATH = "kb_traducido_FINAL.csv"
SUPABASE_URL = os.environ["PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_KEY:
    print("CRITICAL ERROR: SUPABASE_SERVICE_ROLE_KEY no está definida.")
    print("Por razones de seguridad (Issue #124), la importación de KB debe realizarse EXCLUSIVAMENTE con la llave de Service Role.")
    sys.exit(1)

SECTION_MAP = {
    "faq_ventas": "comercial",
    "cuenta": "comercial",
    "faq_teams": "comercial",
    "faq": "comercial",
    "soporte_tecnico": "troubleshooting",
    "faq_mac": "troubleshooting",
    "tutoriales": "tecnica",
    "getting_started": "tecnica",
    "guia": "tecnica",
}

PRODUCT_SLUG_MAP = {
    "Rise 360": "rise360",
    "Storyline 360": "storyline360",
    "Reach 360": "reach360",
    "Review 360": "review360",
    "Content Library 360": "contentlibrary360",
    "Articulate 360": "articulate360",
    "Articulate Localization": "localization",
    "AI Assistant": "aiassistant",
    "Vyond": "vyond",
    "Vyond Studio": "vyondstudio",
    "Vyond Enterprise": "vyondenterprise",
    "Vyond Go": "vyondgo",
}

def normalize_list_field(value: str) -> str:
    value = value.strip()
    if value.startswith("[") and value.endswith("]"):
        try:
            items = ast.literal_eval(value)
            if isinstance(items, list):
                return "• " + "\n• ".join(str(i).strip() for i in items if str(i).strip())
        except (ValueError, SyntaxError):
            pass
    return value

def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    rows = []

    with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            slug = PRODUCT_SLUG_MAP.get(row["producto"])
            if not slug:
                print(f"SKIP: '{row['producto']}'")
                continue
            
            seccion_raw = row["seccion"]
            seccion = SECTION_MAP.get(seccion_raw)
            if seccion is None:
                print(f"WARN: unknown section '{seccion_raw}' -> defaulting to 'comercial'")
                seccion = "comercial"

            rows.append({
                "producto": slug,
                "seccion": seccion,
                "seccion_label": row["seccion_label"],
                "seccion_color": row["seccion_color"],
                "orden": int(row["orden"]) if row["orden"].isdigit() else 50,
                "pregunta": row["pregunta"].strip(),
                "plus": normalize_list_field(row["plus"]),
                "menos": normalize_list_field(row["menos"]),
                "fuente": row["fuente"].strip(),
                "activo": row["activo"].strip() == "True",
                "audiencia": ["interno"],
                "version": row["version"].strip(),
            })

    print(f"Preparados: {len(rows)} items")
    failed = False
    for i in range(0, len(rows), 50):
        batch = rows[i:i+50]
        try:
            supabase.table("kb_items").upsert(batch, on_conflict="producto, pregunta").execute()
            print(f"Lote {i//50 + 1}: {len(batch)} items upserted.")
        except Exception as e:
            print(f"Error in batch {i//50 + 1}: {e}")
            failed = True
    print("Importación completa")
    if failed:
        sys.exit(1)

if __name__ == "__main__":
    main()
