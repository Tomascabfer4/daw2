import os
import re

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"
HEADER_AUTO_SECTION = "\n\n## 📑 Índice de Archivos (Automático)\n"

# Carpetas y archivos que NO queremos listar en los índices
IGNORE_DIRS = ['.git', '.github', '__pycache__', 'node_modules', '.next', 'images', 'img', 'assets']
IGNORE_FILES = ['README.md', 'script.py', '.DS_Store', 'Thumbs.db', '.gitignore']

# Frases para ignorar en la fusión final (Frontend Mentor)
IGNORE_PHRASES_MERGE = [
    "Frontend Mentor",
    "Thanks for checking out this front-end coding challenge",
    "Welcome! 👋"
]
# ---------------------

def get_file_list_markdown(dirpath):
    """ Genera una lista en Markdown de los archivos de la carpeta """
    items = []
    try:
        # Listamos todo lo que hay en la carpeta
        for entry in os.listdir(dirpath):
            full_path = os.path.join(dirpath, entry)
            
            # Filtros de exclusión
            if entry in IGNORE_FILES: continue
            if entry in IGNORE_DIRS: continue
            if entry.startswith('.'): continue # Ignorar ocultos
            
            # Crear enlace Markdown
            # Si es carpeta, ponemos barra al final para distinguirlo
            display_name = entry
            link = f"./{entry}"
            
            # Iconos opcionales según tipo
            icon = "📂" if os.path.isdir(full_path) else "📄"
            
            items.append(f"- {icon} [{display_name}]({link})")
            
    except Exception as e:
        print(f"[ERROR] Listando archivos de {dirpath}: {e}")
        return ""
        
    return "\n".join(sorted(items)) # Ordenado alfabéticamente

def update_sub_readmes():
    """ FASE 1: Recorre carpetas y actualiza sus README individuales """
    root_dir = os.getcwd()
    print("--- FASE 1: Actualizando READMEs de subcarpetas ---")
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Ignorar carpetas del sistema para no entrar en bucle
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]
        
        if dirpath == root_dir:
            continue # No tocamos el raíz en esta fase

        readme_path = os.path.join(dirpath, "README.md")
        new_list_content = get_file_list_markdown(dirpath)
        
        # Si la carpeta está vacía de archivos relevantes, pasamos
        if not new_list_content:
            continue

        current_content = ""
        
        # Leemos el contenido actual si existe
        if os.path.exists(readme_path):
            with open(readme_path, 'r', encoding='utf-8') as f:
                current_content = f.read()

        # LOGICA DE REEMPLAZO INTELIGENTE
        # Buscamos si ya existe nuestra sección automática
        if "## 📑 Índice de Archivos (Automático)" in current_content:
            # Cortamos el contenido justo antes del encabezado automático
            # Mantenemos todo lo que el usuario escribió antes
            parts = current_content.split("## 📑 Índice de Archivos (Automático)")
            manual_content = parts[0].strip()
        else:
            # Si no existe, asumimos que todo es manual
            manual_content = current_content.strip()

        # Si no hay título manual, ponemos el nombre de la carpeta por defecto
        if not manual_content.strip():
             folder_name = os.path.basename(dirpath).upper()
             manual_content = f"# {folder_name}"

        # Reconstruimos el archivo: Manual + Cabecera Auto + Lista Nueva
        final_content = f"{manual_content}{HEADER_AUTO_SECTION}{new_list_content}\n"

        # Guardamos
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(final_content)
            # print(f"[UPDATED] {os.path.relpath(readme_path)}")

# ---------------------------------------------------------
# FASE 2: EL CÓDIGO DE FUSIÓN QUE YA TENÍAMOS (MODIFICADO)
# ---------------------------------------------------------

def fix_links(content, folder_path):
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
    def replace_header(match):
        hashes = match.group(1)
        text = match.group(2)
        new_hashes = "#" * (len(hashes) + depth + 1)
        return f"{new_hashes} {text}"
    return re.sub(r'^(#+)\s+(.*)', replace_header, content, flags=re.MULTILINE)

def merge_readmes():
    """ FASE 2: Genera el README principal """
    print("\n--- FASE 2: Generando README Principal ---")
    root_dir = os.getcwd()
    full_content = "# Índice General de Asignaturas y Tareas\n\n> Índice y enlaces actualizados automáticamente.\n\n"

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

                    full_content += f"{header_hashes} 📂 {folder_name.upper()}\n\n"
                    full_content += content
                    print(f"[OK] Integrado: {folder_name}")

            except Exception as e:
                print(f"[ERROR] {relative_path}: {e}")

    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        f.write(full_content)
    print(f"\n✨ PROCESO COMPLETADO.")

if __name__ == "__main__":
    # Ejecutamos las dos fases
    update_sub_readmes() # 1. Crear enlaces en sub-readmes
    merge_readmes()      # 2. Crear el readme gordo