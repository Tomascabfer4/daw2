import os
import re
import urllib.parse

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

# Marcas para el robot
HIDDEN_MARKER = ""
OLD_HEADER_TO_DELETE = "## 📑 Índice de Archivos (Automático)"

# Carpetas a ignorar
IGNORE_DIRS = ['.git', '.github', '__pycache__', 'node_modules', '.next', 'images', 'img', 'assets', 'design', '.vscode']
IGNORE_FILES = ['README.md', 'script.py', '.DS_Store', 'Thumbs.db', '.gitignore', 'LICENSE', 'style-guide.md']

# Si una carpeta contiene archivos con estas extensiones, SE CONSIDERA UN EJERCICIO
# y NO se generará un apartado propio en el README principal.
EXERCISE_EXTENSIONS = ['.html', '.js', '.css', '.py', '.java', '.php', '.ts', '.jsx', '.tsx', '.json', '.xml']

IGNORE_PHRASES_MERGE = [
    "Frontend Mentor",
    "Thanks for checking out this front-end coding challenge",
    "Welcome! 👋"
]
# ---------------------

def is_exercise_folder(dirpath, filenames):
    """
    Detecta si una carpeta es un Ejercicio/Proyecto final (hoja)
    mirando si contiene código directamente.
    """
    # Si la carpeta se llama "ejemplos" o "practicas", suele ser estructural, no un ejercicio en sí
    folder_name = os.path.basename(dirpath).lower()
    if folder_name in ['ejemplos', 'practicas', 'ejercicios', 'projects']:
        return False

    for f in filenames:
        if f == 'script.py': continue
        _, ext = os.path.splitext(f)
        # Si encontramos código (.html, .js...), asumimos que es una carpeta de tarea
        if ext.lower() in EXERCISE_EXTENSIONS:
            return True
    return False

def get_clean_folder_name(dirpath):
    raw_name = os.path.basename(dirpath)
    clean_name = raw_name.replace("_", " ").replace("-", " ")
    return clean_name.upper()

def get_file_list_markdown(dirpath):
    items = []
    try:
        for entry in os.listdir(dirpath):
            full_path = os.path.join(dirpath, entry)
            
            if entry in IGNORE_FILES: continue
            if entry in IGNORE_DIRS: continue
            if entry.startswith('.'): continue
            
            display_name = entry
            link_safe = urllib.parse.quote(entry)
            link = f"./{link_safe}"
            
            icon = "📂" if os.path.isdir(full_path) else "📄"
            items.append(f"- {icon} [{display_name}]({link})")
            
    except Exception as e:
        print(f"[ERROR] Listando {dirpath}: {e}")
        return ""
    
    return "\n".join(sorted(items))

def update_sub_readmes():
    """ FASE 1: Actualiza READMEs, pero IGNORA las carpetas que parecen ejercicios """
    root_dir = os.getcwd()
    print("--- FASE 1: Actualizando sub-READMEs ---")
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]
        
        if dirpath == root_dir: continue

        # NUEVO FILTRO: Si es carpeta de ejercicio, NO creamos README dentro
        # (A menos que ya exista uno manual, pero el robot no lo tocará)
        if is_exercise_folder(dirpath, filenames):
            # print(f"[SKIP FASE 1] Detectado ejercicio: {os.path.basename(dirpath)}")
            continue

        readme_path = os.path.join(dirpath, "README.md")
        new_list_content = get_file_list_markdown(dirpath)
        
        if not new_list_content: continue

        current_content = ""
        if os.path.exists(readme_path):
            with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                current_content = f.read()

        manual_content = current_content
        if HIDDEN_MARKER and HIDDEN_MARKER in manual_content:
            manual_content = manual_content.split(HIDDEN_MARKER)[0]
        if OLD_HEADER_TO_DELETE and OLD_HEADER_TO_DELETE in manual_content:
             manual_content = manual_content.split(OLD_HEADER_TO_DELETE)[0]

        manual_content = manual_content.strip()
        clean_name = get_clean_folder_name(dirpath)
        if not manual_content:
             manual_content = f"# {clean_name}"

        dynamic_header = f"## MATERIAL DE {clean_name}"
        marker_safe = HIDDEN_MARKER if HIDDEN_MARKER else ""
        final_content = f"{manual_content}\n\n{marker_safe}\n\n{dynamic_header}\n\n{new_list_content}\n"

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

# ---------------------------------------------------------
# FASE 2
# ---------------------------------------------------------

def fix_links(content, folder_path):
    def replace_match(match):
        text_part = match.group(1)
        link_part = match.group(2)
        if link_part.startswith("http") or link_part.startswith("/") or link_part.startswith("#"):
            return match.group(0)
        clean_link = link_part.replace("./", "")
        folder_path_clean = folder_path.replace("\\", "/")
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
        
        # NUEVO FILTRO: Si es ejercicio, NO lo añadimos al README principal
        if is_exercise_folder(dirpath, filenames):
            # print(f"[SKIP FASE 2] Saltando ejercicio: {os.path.basename(dirpath)}")
            continue

        if 'README.md' in filenames:
            if dirpath == root_dir: continue

            readme_path = os.path.join(dirpath, "README.md")
            relative_path = os.path.relpath(dirpath, root_dir)
            path_parts = relative_path.split(os.sep)
            depth = len(path_parts)
            folder_name = os.path.basename(dirpath)
            
            try:
                with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                    if any(phrase in content for phrase in IGNORE_PHRASES_MERGE):
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