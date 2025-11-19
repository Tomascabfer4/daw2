import os
import re
import urllib.parse # Para arreglar los enlaces con espacios

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

# MARCAS PARA EL ROBOT
HIDDEN_MARKER = ""
OLD_HEADER_TO_DELETE = "## 📑 Índice de Archivos (Automático)" # Lo que queremos borrar

IGNORE_DIRS = ['.git', '.github', '__pycache__', 'node_modules', '.next', 'images', 'img', 'assets', 'design']
IGNORE_FILES = ['README.md', 'script.py', '.DS_Store', 'Thumbs.db', '.gitignore', 'LICENSE', 'style-guide.md']

IGNORE_PHRASES_MERGE = [
    "Frontend Mentor",
    "Thanks for checking out this front-end coding challenge",
    "Welcome! 👋"
]
# ---------------------

def get_clean_folder_name(dirpath):
    """ Convierte 'desarrollo_entorno_cliente' en 'DESARROLLO ENTORNO CLIENTE' """
    raw_name = os.path.basename(dirpath)
    clean_name = raw_name.replace("_", " ").replace("-", " ")
    return clean_name.upper()

def get_file_list_markdown(dirpath):
    """ Genera la lista de archivos (arreglando espacios en enlaces) """
    items = []
    try:
        for entry in os.listdir(dirpath):
            full_path = os.path.join(dirpath, entry)
            
            if entry in IGNORE_FILES: continue
            if entry in IGNORE_DIRS: continue
            if entry.startswith('.'): continue
            
            display_name = entry
            # IMPORTANTE: Codificamos los espacios como %20 para que no se rompa el link
            link_safe = urllib.parse.quote(entry)
            link = f"./{link_safe}"
            
            icon = "📂" if os.path.isdir(full_path) else "📄"
            
            items.append(f"- {icon} [{display_name}]({link})")
            
    except Exception as e:
        print(f"[ERROR] Listando {dirpath}: {e}")
        return ""
    
    return "\n".join(sorted(items))

def update_sub_readmes():
    """ FASE 1: Actualiza READMEs y BORRA el título viejo """
    root_dir = os.getcwd()
    print("--- FASE 1: Actualizando sub-READMEs ---")
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]
        
        if dirpath == root_dir: continue

        readme_path = os.path.join(dirpath, "README.md")
        new_list_content = get_file_list_markdown(dirpath)
        
        # Si la carpeta está vacía (solo readme), no escribimos nada
        if not new_list_content: continue

        current_content = ""
        if os.path.exists(readme_path):
            with open(readme_path, 'r', encoding='utf-8') as f:
                current_content = f.read()

        # --- LÓGICA DE LIMPIEZA ---
        manual_content = current_content

        # 1. Si existe la marca nueva, cortamos por ahí
        if HIDDEN_MARKER in manual_content:
            manual_content = manual_content.split(HIDDEN_MARKER)[0]
        
        # 2. IMPERATIVO: Si existe el título viejo, cortamos por ahí TAMBIÉN
        # Esto asegura que borramos el rastro del script anterior
        if OLD_HEADER_TO_DELETE in manual_content:
             manual_content = manual_content.split(OLD_HEADER_TO_DELETE)[0]

        manual_content = manual_content.strip()

        # Si después de limpiar no queda nada, ponemos título por defecto
        clean_name = get_clean_folder_name(dirpath)
        if not manual_content:
             manual_content = f"# {clean_name}"

        # Título dinámico
        dynamic_header = f"## MATERIAL DE {clean_name}"

        final_content = f"{manual_content}\n\n{HIDDEN_MARKER}\n\n{dynamic_header}\n\n{new_list_content}\n"

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

# ---------------------------------------------------------
# FASE 2: FUSIÓN AL PRINCIPAL
# ---------------------------------------------------------

def fix_links(content, folder_path):
    def replace_match(match):
        text_part = match.group(1)
        link_part = match.group(2)
        if link_part.startswith("http") or link_part.startswith("/") or link_part.startswith("#"):
            return match.group(0)
        # Limpiamos ./
        clean_link = link_part.replace("./", "")
        # Nos aseguramos de que folder_path usa barras normales
        folder_path_clean = folder_path.replace("\\", "/")
        # Construimos ruta: carpeta/archivo
        new_path = f"{folder_path_clean}/{clean_link}"
        return f"{text_part}({new_path})"
        
    pattern = r'(\[.*?\]|\!\[.*?\])\((.*?)\)'
    return re.sub(pattern, replace_match, content)

def adjust_headers(content, depth):
    def replace_header(match):
        hashes = match.group(1)
        text = match.group(2)
        new_hashes = "#" * (len(hashes) + depth + 1)
        return f"{new_hashes} {text}"
    return re.sub(r'^(#+)\s+(.*)', replace_header, content, flags=re.MULTILINE)

def merge_readmes():
    print("\n--- FASE 2: Generando README Principal ---")
    root_dir = os.getcwd()
    full_content = "# Índice General de Asignaturas y Tareas\n\n> Repositorio actualizado automáticamente.\n\n"

    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath: continue
        if 'README.md' in filenames:
            if dirpath == root_dir: continue

            readme_path = os.path.join(dirpath, "README.md")
            folder_name = os.path.basename(dirpath)
            relative_path = os.path.relpath(dirpath, root_dir)
            path_parts = relative_path.split(os.sep)
            depth = len(path_parts)
            
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                    if any(phrase in content for phrase in IGNORE_PHRASES_MERGE):
                        print(f"[SKIP] Ignorado: {folder_name}")
                        continue

                    content = fix_links(content, relative_path)
                    content = adjust_headers(content, depth)

                    header_hashes = "#" * (depth + 1)
                    if depth == 1: full_content += "\n\n---\n\n"
                    else: full_content += "\n\n"

                    display_folder_name = get_clean_folder_name(dirpath)
                    full_content += f"{header_hashes} 📂 {display_folder_name}\n\n"
                    full_content += content
                    print(f"[OK] Integrado: {folder_name}")

            except Exception as e:
                print(f"[ERROR] {relative_path}: {e}")

    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        f.write(full_content)
    print(f"\n✨ PROCESO COMPLETADO.")

if __name__ == "__main__":
    update_sub_readmes()
    merge_readmes()