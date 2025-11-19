import os
import re

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md"

# Frases que, si aparecen en el README, hacen que se ignore el archivo
IGNORE_PHRASES = [
    "Frontend Mentor",
    "Thanks for checking out this front-end coding challenge",
    "Welcome! 👋"
]
# ---------------------

def fix_links(content, folder_path):
    """
    Arregla los enlaces relativos ./imagen.png para que apunten a la ruta correcta.
    """
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

def merge_readmes():
    root_dir = os.getcwd()
    
    full_content = "# Índice General de Asignaturas y Tareas\n\n"
    full_content += "> Índice generado automáticamente organizado por carpetas.\n\n"

    print("--- Iniciando proceso de organización ---")

    # os.walk recorre el árbol de directorios
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # 1. Ignorar carpetas de sistema (.git, .github)
        if '.git' in dirpath:
            continue
            
        # 2. Procesar solo si hay un README.md
        if 'README.md' in filenames:
            # Ignorar el propio archivo raíz donde escribimos
            if dirpath == root_dir:
                continue

            readme_path = os.path.join(dirpath, "README.md")
            folder_name = os.path.basename(dirpath)
            
            # Calculamos la ruta relativa y la profundidad
            relative_path = os.path.relpath(dirpath, root_dir)
            
            # Dividimos la ruta por las barras separadoras para saber el nivel
            # Ejemplo: 'asignatura/tema1' -> ['asignatura', 'tema1'] -> Nivel 2
            path_parts = relative_path.split(os.sep)
            depth = len(path_parts)
            
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                    # --- FILTRO ANTI-BASURA ---
                    if any(phrase in content for phrase in IGNORE_PHRASES):
                        print(f"[SKIP] Ignorado (Frontend Mentor): {folder_name}")
                        continue
                    # --------------------------

                    content = fix_links(content, relative_path)

                    # --- LÓGICA DE JERARQUÍA Y FORMATO ---
                    
                    # Creamos los hashtags según la profundidad (#, ##, ###, etc.)
                    # Si es profundidad 1 (Asignatura), usamos #. Si es 2 (Tema), ##.
                    header_hashes = "#" * depth
                    
                    # Si es una Asignatura principal (Nivel 1), ponemos separador grande antes
                    if depth == 1:
                        full_content += "\n\n---\n\n"
                    else:
                        # Si es subcarpeta, solo un salto de línea para que quede agrupado
                        full_content += "\n\n"

                    # Título LIMPIO (sin paréntesis de ruta)
                    full_content += f"{header_hashes} 📂 {folder_name.upper()}\n\n"
                    full_content += content
                    
                    print(f"[OK] Nivel {depth}: {folder_name}")

            except Exception as e:
                print(f"[ERROR] Fallo en {relative_path}: {e}")

    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
            f.write(full_content)
        print(f"\n✨ README.md actualizado y organizado correctamente.")
    except Exception as e:
        print(f"[ERROR] No se pudo guardar el archivo final: {e}")

if __name__ == "__main__":
    merge_readmes()