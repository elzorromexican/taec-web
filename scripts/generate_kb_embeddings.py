import os
import time
import sys
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client
from google import genai
from google.genai import types

load_dotenv(Path(__file__).parent.parent / "astro-web/.env")

SUPABASE_URL = os.environ.get("PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("PUBLIC_SUPABASE_ANON_KEY")
GEMINI_KEY = os.environ.get("TAEC_GEMINI_KEY") or os.environ.get("GEMINI_API_KEY")

if not SUPABASE_KEY:
    print("CRITICAL ERROR: SUPABASE API key is required.")
    sys.exit(1)

if not GEMINI_KEY:
    print("CRITICAL ERROR: GEMINI key is required.")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
ai = genai.Client(api_key=GEMINI_KEY)

def generate_embedding(text: str) -> list[float]:
    response = ai.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=types.EmbedContentConfig(
            output_dimensionality=768
        )
    )
    return response.embeddings[0].values

def main():
    print("Fetching kb_items without embeddings...")
    response = supabase.table("kb_items").select("*").filter("activo", "eq", True).execute()
    items = [item for item in response.data if not item.get("embedding")]
    print(f"Found {len(items)} items to process.")

    updates = []
    
    for idx, item in enumerate(items):
        pregunta = item.get("pregunta") or ""
        plus = item.get("plus") or ""
        menos = item.get("menos") or ""
        
        text_to_embed = f"{pregunta}\n{plus}\n{menos}".strip()
        
        vector = generate_embedding(text_to_embed)
        
        item_to_update = item.copy()
        item_to_update["embedding"] = vector
        updates.append(item_to_update)
        
        if len(updates) >= 50 or (idx == len(items) - 1 and len(updates) > 0):
            print(f"Upserting batch of {len(updates)} items...")
            res = supabase.table("kb_items").upsert(updates).execute()
            updates = []
            time.sleep(1)
            
    print("Embedded all items successfully.")

if __name__ == "__main__":
    main()
