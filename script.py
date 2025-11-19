import os
import re
import urllib.parse

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

# MARCAS QUE BUSCAREMOS PARA CORTAR EL ARCHIVO
# El script cortará el archivo en cuanto encuentre la PRIMERA de estas frases
MARKERS_TO_CUT = [
    "",
    "## 📑 Índice de Archivos (Automático)",
    "## MATERIAL DE" # Cortará cualquier cosa que empiece así
]

IGNORE_DIRS = ['.git', '.github', '__pycache__', 'node_modules', '.next', 'images', 'img', 'assets', 'design', '.vscode']
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
            display_name = entry
            link = f"./{urllib.parse.quote(entry)}"
            icon = "📂" if os.path.isdir(full_path) else "📄"
            items.append(f"- {icon} [{display_name}]({link})")
    except Exception:
        return ""
    return "\n".join(sorted(items))

def sanitize_content(content):
    """
    Busca la posición más temprana de cualquier marca automática
    y corta el string ahí para eliminar duplicados antiguos.
    """
    cut_index = len(content) # Por defecto, al final
    found_cut = False

    for marker in MARKERS_TO_CUT:
        # Buscamos la marca en el texto
        idx = content.find(marker)
        # Si existe y está antes que el corte actual, actualizamos
        if idx != -1 and idx < cut_index:
            cut_index = idx
            found_cut = True
    
    # Si encontramos algo, cortamos y devolvemos la parte limpia (manual)
    if found_cut:
        return content[:cut_index].strip()
    
    # Si no encontramos nada, devolvemos todo (asumimos que es todo manual)
    return content.strip()

def update_sub_readmes():
    root_dir = os.getcwd()
    print("--- FASE 1: Limpieza Nuclear de READMEs ---")
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]
        if dirpath == root_dir: continue
        if is_exercise_folder(dirpath, filenames): continue

        readme_path = os.path.join(dirpath, "README.md")
        new_list = get_file_list_markdown(dirpath)
        if not new_list: continue

        current_content = ""
        if os.path.exists(readme_path):
            with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                current_content = f.read()

        # 1. LIMPIEZA: Nos quedamos solo con lo que hay ANTES del primer título automático
        manual_content = sanitize_content(current_content)

        # 2. Si no queda nada (porque no había notas manuales), ponemos título por defecto
        clean_name = get_clean_folder_name(dirpath)
        if not manual_content:
             manual_content = f"# {clean_name}"

        # 3. REGENERACIÓN
        final_content = f"{manual_content}\n\n\n\n## MATERIAL DE {clean_name}\n\n{new_list}\n"

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

# --- FASE 2 (Igual que antes) ---
def fix_links(content, folder_path):
    def replace(m):
        t, l = m.group(1), m.group(2)
        if l.startswith(("http", "/", "#")): return m.group(0)
        return f"{t}({folder_path.replace(os.sep, '/')}/{l.replace('./', '')})"
    return re.sub(r'(\[.*?\]|\!\[.*?\])\((.*?)\)', replace, content)

def adjust_headers(content, depth):
    return re.sub(r'^(#+)\s+(.*)', lambda m: f"{'#' * (len(m.group(1)) + depth + 1)} {m.group(2)}", content, flags=re.MULTILINE)

def merge_readmes():
    print("\n--- FASE 2: Generando README Principal ---")
    root_dir = os.getcwd()
    full_content = "# Índice General de Asignaturas y Tareas\n\n> Índice actualizado automáticamente.\n\n"

    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath: continue
        if is_exercise_folder(dirpath, filenames): continue
        
        if 'README.md' in filenames and dirpath != root_dir:
            readme_path = os.path.join(dirpath, "README.md")
            try:
                with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if any(p in content for p in IGNORE_PHRASES_MERGE): continue
                    
                    # Ajustes para el principal
                    rel_path = os.path.relpath(dirpath, root_dir)
                    depth = len(rel_path.split(os.sep))
                    
                    content = fix_links(content, rel_path)
                    content = adjust_headers(content, depth)
                    
                    hashes = "#" * (depth + 1)
                    sep = "\n\n---\n\n" if depth == 1 else "\n\n"
                    
                    full_content += f"{sep}{hashes} 📂 {get_clean_folder_name(dirpath)}\n\n{content}"
                    print(f"[OK] {os.path.basename(dirpath)}")
            except Exception: pass

    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        f.write(full_content)
    print("\n✨ TODO LIMPIO Y ORDENADO.")

if __name__ == "__main__":
    update_sub_readmes()
    merge_readmes()