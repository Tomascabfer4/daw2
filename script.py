import os
import re

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

IGNORE_PHRASES = [
    "Frontend Mentor",
    "Thanks for checking out this front-end coding challenge",
    "Welcome! 👋"
]
# ---------------------

def fix_links(content, folder_path):
    """ Arregla los enlaces relativos ./imagen.png """
    def replace_match(match):
        text_part = match.group(1)
        link_part = match.group(2)
        if link_part.startswith("http") or link_part.startswith("/") or link_part.startswith("#"):
            return match.group(0)
        clean_link = link_part.replace("./", "")
        new_path = f"{folder_path}/{clean_link}".replace("\\", "/")
        return f"{text_part}({new_path})"

    pattern = r'(\[.*?\]|\!\[.*?\])\((.*?)\)'
    return re.sub(pattern, replace_match, content)

def adjust_headers(content, depth):
    """
    Esta función busca líneas que empiecen por # dentro del contenido
    y les añade más # para que sean más pequeños que el título de la carpeta.
    
    Si la carpeta es nivel 2 (##), el contenido pasará a ser nivel 4 (####) automáticamente.
    """
    def replace_header(match):
        hashes = match.group(1) # Los # que ya tenía el archivo
        text = match.group(2)   # El texto del título
        
        # Calculamos cuántos # añadir. 
        # Queremos que el contenido sea siempre menor que la carpeta.
        # Carpeta es: depth + 1. Contenido será: depth + 1 + cantidad original
        new_hashes = "#" * (len(hashes) + depth + 1)
        
        return f"{new_hashes} {text}"

    # Regex que busca líneas que empiezan por uno o más #
    return re.sub(r'^(#+)\s+(.*)', replace_header, content, flags=re.MULTILINE)

def merge_readmes():
    root_dir = os.getcwd()
    
    full_content = "# Índice General de Asignaturas y Tareas\n\n"
    full_content += "> Índice generado automáticamente.\n\n"

    print("--- Iniciando proceso ---")

    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath:
            continue
            
        if 'README.md' in filenames:
            if dirpath == root_dir:
                continue

            readme_path = os.path.join(dirpath, "README.md")
            folder_name = os.path.basename(dirpath)
            relative_path = os.path.relpath(dirpath, root_dir)
            path_parts = relative_path.split(os.sep)
            depth = len(path_parts)
            
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                    if any(phrase in content for phrase in IGNORE_PHRASES):
                        print(f"[SKIP] Ignorado: {folder_name}")
                        continue

                    # 1. Arreglar enlaces
                    content = fix_links(content, relative_path)
                    
                    # 2. AJUSTAR TAMAÑO DE TÍTULOS (NUEVO)
                    content = adjust_headers(content, depth)

                    # 3. Crear encabezado de carpeta
                    header_hashes = "#" * (depth + 1)
                    
                    if depth == 1:
                        full_content += "\n\n---\n\n"
                    else:
                        full_content += "\n\n"

                    # Título de carpeta
                    full_content += f"{header_hashes} 📂 {folder_name.upper()}\n\n"
                    full_content += content
                    
                    print(f"[OK] Procesado: {folder_name}")

            except Exception as e:
                print(f"[ERROR] Fallo en {relative_path}: {e}")

    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
            f.write(full_content)
        print(f"\n✨ ¡Listo! Títulos ajustados visualmente.")
    except Exception as e:
        print(f"[ERROR] No se pudo guardar: {e}")

if __name__ == "__main__":
    merge_readmes()