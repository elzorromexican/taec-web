"""
/**
 * @name import_doc_markitdown.py
 * @version 1.0
 * @date 2026-04-23
 * @owner TAEC / Slim
 * @status Activo
 * @vigencia Permanente
 *
 * @description Script para ingerir documentos usando MarkItDown, chunkear texto y generar embeddings.
 *
 * Changelog:
 *   v1.0 (2026-04-23) — Autor: Antigravity
 *     - [FEAT] Creación del script con limpieza de chunks huérfanos y upsert con source_hash
 */
"""
import os
import hashlib
import sys
import time
import argparse
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client
from google import genai
from google.genai import types
from markitdown import MarkItDown

load_dotenv(Path(__file__).parent.parent / "astro-web/.env")

SUPABASE_URL = os.environ.get("PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
GEMINI_KEY = os.environ.get("TAEC_GEMINI_KEY") or os.environ.get("GEMINI_API_KEY")

if not SUPABASE_KEY:
    print("CRITICAL ERROR: SUPABASE_SERVICE_ROLE_KEY no está definida.")
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

def chunk_text(text: str, max_chunk_size=1500) -> list[str]:
    # Very simple double-newline chunking for markdown
    paragraphs = text.split("\n\n")
    chunks = []
    current_chunk = ""
    for p in paragraphs:
        if len(current_chunk) + len(p) > max_chunk_size:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = p
        else:
            current_chunk += "\n\n" + p if current_chunk else p
            
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks

def main():
    parser = argparse.ArgumentParser(description="Ingest a document into Supabase using MarkItDown.")
    parser.add_argument("file_path", help="Path to the file to ingest (e.g. PDF, DOCX)")
    parser.add_argument("--producto", required=True, help="Producto (e.g. articulate360)")
    parser.add_argument("--seccion", required=True, help="Seccion (e.g. tecnica)")
    parser.add_argument("--fuente", required=True, help="Fuente de la información")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.file_path):
        print(f"File not found: {args.file_path}")
        sys.exit(1)
        
    print(f"Converting {args.file_path} to Markdown using MarkItDown...")
    md = MarkItDown()
    result = md.convert(args.file_path)
    text_content = result.text_content
    
    if not text_content:
        print("Error: Could not extract text content from the file.")
        sys.exit(1)
        
    print(f"Extracted {len(text_content)} characters. Chunking...")
    chunks = chunk_text(text_content)
    print(f"Created {len(chunks)} chunks.")
    
    print(f"Limpiando chunks huérfanos para {args.producto} de la fuente {args.fuente}...")
    supabase.table("kb_items").delete().eq("fuente", args.fuente).eq("producto", args.producto).execute()
    
    updates = []
    
    for idx, chunk in enumerate(chunks):
        print(f"Generating embedding for chunk {idx+1}/{len(chunks)}...")
        vector = generate_embedding(chunk)
        
        chunk_hash_input = f"{args.producto}_{args.fuente}_{idx}_{chunk}"
        source_hash = hashlib.md5(chunk_hash_input.encode("utf-8")).hexdigest()
        
        updates.append({
            "producto": args.producto,
            "seccion": args.seccion,
            "seccion_label": "Documentación",
            "seccion_color": "#000000",
            "orden": 100,
            "pregunta": f"Fragmento {idx+1} de {os.path.basename(args.file_path)}",
            "plus": chunk,  # Store the actual markdown content in 'plus'
            "menos": "",
            "fuente": args.fuente,
            "activo": True,
            "audiencia": ["interno"],
            "version": "1.0",
            "embedding": vector,
            "source_hash": source_hash
        })
        
        if len(updates) >= 10 or idx == len(chunks) - 1:
            print(f"Upserting batch of {len(updates)} items...")
            supabase.table("kb_items").upsert(updates, on_conflict="source_hash").execute()
            updates = []
            time.sleep(1)
            
    print("Importación completada con éxito.")

if __name__ == "__main__":
    main()
