import os
import re
import urllib.parse

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

# Marcas de corte
HIDDEN_MARKER = ""
OLD_HEADER_TO_DELETE = "## 📑 Índice de Archivos (Automático)"

IGNORE_DIRS = ['.git', '.github', '__pycache__', 'node_modules', '.next', 'images', 'img', 'assets', 'design', '.vscode']
IGNORE_FILES = ['README.md', 'script.py', '.DS_Store', 'Thumbs.db', '.gitignore', 'LICENSE', 'style-guide.md']
EXERCISE_EXTENSIONS = ['.html', '.js', '.css', '.py', '.java', '.php', '.ts', '.jsx', '.tsx', '.json', '.xml']
IGNORE_PHRASES_MERGE = ["Frontend Mentor", "Thanks for checking out", "Welcome! 👋"]
# ---------------------

def is_exercise_folder(dirpath, filenames):
    """ Detecta si es carpeta de ejercicio """
    folder_name = os.path.basename(dirpath).lower()
    if folder_name in ['ejemplos', 'practicas', 'ejercicios', 'projects']: return False
    for f in filenames:
        if f == 'script.py': continue
        _, ext = os.path.splitext(f)
        if ext.lower() in EXERCISE_EXTENSIONS: return True
    return False

def get_clean_folder_name(dirpath):
    """ Nombre limpio y en mayúsculas """
    return os.path.basename(dirpath).replace("_", " ").replace("-", " ").upper()

def get_file_list_markdown(dirpath):
    """ Genera lista de archivos con enlaces seguros """
    items = []
    try:
        for entry in os.listdir(dirpath):
            if entry in IGNORE_FILES or entry in IGNORE_DIRS or entry.startswith('.'): continue
            
            full_path = os.path.join(dirpath, entry)
            display_name = entry
            # Encodificamos espacios para que el link funcione
            link_safe = urllib.parse.quote(entry)
            link = f"./{link_safe}"
            icon = "📂" if os.path.isdir(full_path) else "📄"
            items.append(f"- {icon} [{display_name}]({link})")
    except Exception:
        return ""
    return "\n".join(sorted(items))

def sanitize_content(content, clean_name):
    """ Limpia el contenido manual de residuos anteriores """
    # 1. Cortar por marcas conocidas
    for marker in [HIDDEN_MARKER, OLD_HEADER_TO_DELETE]:
        if marker in content:
            content = content.split(marker)[0]
    
    # 2. Cortar por regex de títulos automáticos
    content = re.split(r'^## MATERIAL DE .*', content, flags=re.MULTILINE)[0]
    
    content = content.strip()

    # 3. LIMPIEZA FINA: Si el contenido manual es SOLO el título de la carpeta (residuo), borrarlo.
    # Ejemplo: Si queda "# TEMA 1" y nada más, lo borramos para no duplicar.
    if content.replace("#", "").strip().upper() == clean_name:
        return ""

    return content

def update_sub_readmes():
    """ FASE 1: Actualiza READMEs locales """
    root_dir = os.getcwd()
    print("--- FASE 1: Actualizando sub-READMEs ---")
    
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

        clean_name = get_clean_folder_name(dirpath)
        
        # Limpiamos contenido manual previo
        manual_content = sanitize_content(current_content, clean_name)
        
        # Si había notas manuales reales, las dejamos. Si no, queda vacío.
        # NO forzamos un título H1 aquí si está vacío, para evitar duplicidad en el Principal.

        # Construimos el contenido
        dynamic_header = f"## MATERIAL DE {clean_name}"
        marker = HIDDEN_MARKER
        
        final_content = f"{manual_content}\n\n{marker}\n\n{dynamic_header}\n\n{new_list}\n"

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

# --- FASE 2 ---

def fix_links(content, folder_path):
    """ Ajusta rutas relativas para el README principal """
    def replace(m):
        t, l = m.group(1), m.group(2)
        if l.startswith(("http", "/", "#")): return m.group(0)
        folder_clean = folder_path.replace("\\", "/")
        # Codificamos también la ruta de la carpeta por si tiene espacios
        folder_encoded = urllib.parse.quote(folder_clean)
        link_clean = l.replace("./", "")
        return f"{t}({folder_encoded}/{link_clean})"
    return re.sub(r'(\[.*?\]|\!\[.*?\])\((.*?)\)', replace, content)

def adjust_headers(content, depth):
    """ Ajusta tamaño de headers """
    return re.sub(r'^(#+)\s+(.*)', lambda m: f"{'#' * (len(m.group(1)) + depth + 1)} {m.group(2)}", content, flags=re.MULTILINE)

def merge_readmes():
    print("\n--- FASE 2: Generando README Principal ---")
    root_dir = os.getcwd()
    full_content = "# Índice General de Asignaturas y Tareas\n\n> Índice actualizado automáticamente. Haz clic en los títulos para ir a la carpeta.\n\n"

    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath: continue
        if is_exercise_folder(dirpath, filenames): continue
        
        if 'README.md' in filenames and dirpath != root_dir:
            readme_path = os.path.join(dirpath, "README.md")
            try:
                with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if any(p in content for p in IGNORE_PHRASES_MERGE): continue
                    
                    rel_path = os.path.relpath(dirpath, root_dir)
                    depth = len(rel_path.split(os.sep))
                    
                    # 1. Ajustar enlaces
                    content = fix_links(content, rel_path)
                    
                    # 2. ELIMINAR EL TÍTULO AUTOMÁTICO DEL CONTENIDO
                    # (Para que no salga duplicado debajo del header principal)
                    content = re.split(r'^## MATERIAL DE .*', content, flags=re.MULTILINE)
                    # Cogemos la parte manual (si hay) y la parte de la lista (normalmente la última)
                    # Unimos todo lo que no sea el título "MATERIAL DE..."
                    content_cleaned = "\n".join(content).replace(HIDDEN_MARKER, "").strip()

                    # 3. Ajustar jerarquía de títulos restantes
                    content_final = adjust_headers(content_cleaned, depth)
                    
                    # 4. CREAR HEADER CLICABLE (Aquí está la solución a "elementos sin enlace")
                    hashes = "#" * (depth + 1)
                    sep = "\n\n---\n\n" if depth == 1 else "\n\n"
                    clean_name = get_clean_folder_name(dirpath)
                    
                    # Codificamos la ruta para el enlace del título
                    link_path = urllib.parse.quote(rel_path.replace("\\", "/"))
                    
                    # AQUI: Hacemos que el título sea un enlace a la carpeta
                    full_content += f"{sep}{hashes} [📂 {clean_name}](./{link_path})\n\n{content_final}"
                    
                    print(f"[OK] {os.path.basename(dirpath)}")
            except Exception as e:
                print(f"[ERROR] {e}")

    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        f.write(full_content)
    print("\n✨ TODO LIMPIO Y ENLAZADO.")

if __name__ == "__main__":
    update_sub_readmes()
    merge_readmes()