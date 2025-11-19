import os
import re
import urllib.parse

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

# Marcas de corte
HIDDEN_MARKER = ""
OLD_HEADER_TO_DELETE = "## 📑 Índice de Archivos (Automático)"

# 🚫 LISTA NEGRA DE CARPETAS (Aquí añadimos 'design' para que no lo toque)
IGNORE_DIRS = [
    '.git', '.github', '__pycache__', 'node_modules', '.next', 
    'images', 'img', 'assets', 'design', 'styles', 'fonts', '.vscode', 'dist', 'build'
]

IGNORE_FILES = ['README.md', 'script.py', '.DS_Store', 'Thumbs.db', '.gitignore', 'LICENSE', 'style-guide.md']
EXERCISE_EXTENSIONS = ['.html', '.js', '.css', '.py', '.java', '.php', '.ts', '.jsx', '.tsx', '.json', '.xml']
IGNORE_PHRASES_MERGE = ["Frontend Mentor", "Thanks for checking out", "Welcome! 👋"]
# ---------------------

def is_exercise_folder(dirpath, filenames):
    folder_name = os.path.basename(dirpath).lower()
    if folder_name in ['ejemplos', 'practicas', 'ejercicios', 'projects']: return False
    for f in filenames:
        if f == 'script.py': continue
        _, ext = os.path.splitext(f)
        if ext.lower() in EXERCISE_EXTENSIONS: return True
    return False

def get_clean_folder_name(dirpath):
    return os.path.basename(dirpath).replace("_", " ").replace("-", " ").upper()

def get_file_list_markdown(dirpath):
    items = []
    try:
        for entry in os.listdir(dirpath):
            if entry in IGNORE_FILES or entry in IGNORE_DIRS or entry.startswith('.'): continue
            full_path = os.path.join(dirpath, entry)
            
            # Filtro extra por si acaso hay una carpeta 'design' dentro
            if os.path.isdir(full_path) and entry.lower() in IGNORE_DIRS: continue

            display_name = entry
            link_safe = urllib.parse.quote(entry)
            link = f"./{link_safe}"
            icon = "📂" if os.path.isdir(full_path) else "📄"
            items.append(f"- {icon} [{display_name}]({link})")
    except Exception:
        return ""
    return "\n".join(sorted(items))

def sanitize_content(content, clean_name):
    """ Limpia contenido viejo """
    for marker in [HIDDEN_MARKER, OLD_HEADER_TO_DELETE]:
        if marker and marker in content:
            try: content = content.split(marker)[0]
            except ValueError: pass
    
    try: content = re.split(r'^## MATERIAL DE .*', content, flags=re.MULTILINE)[0]
    except Exception: pass
    
    content = content.strip()
    if content.replace("#", "").strip().upper() == clean_name: return ""
    return content

def update_sub_readmes():
    """ FASE 1 """
    root_dir = os.getcwd()
    print("--- FASE 1: Actualizando sub-READMEs ---")
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Esto evita que os.walk entre en carpetas prohibidas (como design)
        dirnames[:] = [d for d in dirnames if d.lower() not in IGNORE_DIRS]
        
        if dirpath == root_dir: continue
        if is_exercise_folder(dirpath, filenames): continue
        
        # DOBLE CHECK: Si la carpeta actual está en la lista negra, saltar
        if os.path.basename(dirpath).lower() in IGNORE_DIRS: continue

        readme_path = os.path.join(dirpath, "README.md")
        new_list = get_file_list_markdown(dirpath)
        if not new_list: continue

        current_content = ""
        if os.path.exists(readme_path):
            with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                current_content = f.read()

        clean_name = get_clean_folder_name(dirpath)
        manual_content = sanitize_content(current_content, clean_name)
        
        dynamic_header = f"## MATERIAL DE {clean_name}"
        marker = HIDDEN_MARKER
        final_content = f"{manual_content}\n\n{marker}\n\n{dynamic_header}\n\n{new_list}\n"

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

# --- FASE 2 ---

def fix_links(content, folder_path):
    def replace(m):
        t, l = m.group(1), m.group(2)
        if l.startswith(("http", "/", "#")): return m.group(0)
        folder_clean = folder_path.replace("\\", "/")
        folder_encoded = urllib.parse.quote(folder_clean)
        link_clean = l.replace("./", "")
        return f"{t}({folder_encoded}/{link_clean})"
    return re.sub(r'(\[.*?\]|\!\[.*?\])\((.*?)\)', replace, content)

def adjust_headers(content, depth):
    return re.sub(r'^(#+)\s+(.*)', lambda m: f"{'#' * (len(m.group(1)) + depth + 1)} {m.group(2)}", content, flags=re.MULTILINE)

def merge_readmes():
    print("\n--- FASE 2: Generando README Principal ---")
    root_dir = os.getcwd()
    full_content = "# Índice General de Asignaturas y Tareas\n\n> Índice actualizado automáticamente. Haz clic en los títulos para ir a la carpeta.\n\n"

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Bloqueo de carpetas prohibidas en Fase 2
        dirnames[:] = [d for d in dirnames if d.lower() not in IGNORE_DIRS]
        
        if '.git' in dirpath: continue
        if is_exercise_folder(dirpath, filenames): continue
        
        # TRIPLE CHECK: Si por lo que sea llegamos a una carpeta 'design', la ignoramos
        if os.path.basename(dirpath).lower() in IGNORE_DIRS: continue
        
        if 'README.md' in filenames and dirpath != root_dir:
            readme_path = os.path.join(dirpath, "README.md")
            try:
                with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if any(p in content for p in IGNORE_PHRASES_MERGE): continue
                    
                    rel_path = os.path.relpath(dirpath, root_dir)
                    depth = len(rel_path.split(os.sep))
                    
                    content = fix_links(content, rel_path)
                    content = re.split(r'^## MATERIAL DE .*', content, flags=re.MULTILINE)
                    content_cleaned = "\n".join(content).replace(HIDDEN_MARKER, "").strip()
                    content_final = adjust_headers(content_cleaned, depth)
                    
                    hashes = "#" * (depth + 1)
                    sep = "\n\n---\n\n" if depth == 1 else "\n\n"
                    clean_name = get_clean_folder_name(dirpath)
                    link_path = urllib.parse.quote(rel_path.replace("\\", "/"))
                    
                    full_content += f"{sep}{hashes} [📂 {clean_name}](./{link_path})\n\n{content_final}"
                    print(f"[OK] {os.path.basename(dirpath)}")
            except Exception as e:
                print(f"[ERROR] {e}")

    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        f.write(full_content)
    print("\n✨ PROCESO COMPLETADO.")

if __name__ == "__main__":
    update_sub_readmes()
    merge_readmes()
    