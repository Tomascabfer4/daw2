import os
import re  # Importamos expresiones regulares para arreglar los enlaces

# --- CONFIGURACIÓN ---
OUTPUT_FILENAME = "README.md" 

# Si el README contiene alguna de estas frases, SE IGNORA COMPLETAMENTE
IGNORE_PHRASES = [
    "Frontend Mentor", 
    "Thanks for checking out this front-end coding challenge",
    "Welcome! 👋"
]
# ---------------------

def fix_links(content, folder_path):
    """
    Busca enlaces relativos tipo [Link](./archivo) o imagenes ![Img](foto.png)
    y les añade la ruta de la carpeta delante para que no se rompan.
    """
    def replace_match(match):
        text_part = match.group(1)  # Ej: [Texto] o ![Imagen]
        link_part = match.group(2)  # Ej: ./imagen.png

        # Si es un enlace web (http) o absoluto (/), no lo tocamos
        if link_part.startswith("http") or link_part.startswith("/") or link_part.startswith("#"):
            return match.group(0)

        # Limpiamos el './' inicial si existe
        clean_link = link_part.replace("./", "")
        
        # Construimos la ruta completa (usando / para web, no backslash de windows)
        new_path = f"{folder_path}/{clean_link}".replace("\\", "/")
        
        return f"{text_part}({new_path})"

    # Regex que busca [algo](algo) o ![algo](algo)
    pattern = r'(\[.*?\]|\!\[.*?\])\((.*?)\)'
    return re.sub(pattern, replace_match, content)

def merge_readmes():
    root_dir = os.getcwd()
    
    # Cabecera del archivo principal
    full_content = "# Índice General de Asignaturas y Tareas\n\n"
    full_content += "> Este índice se genera automáticamente combinando los README de cada carpeta.\n\n"

    print("--- Iniciando proceso de unificación ---")

    # Recorremos todos los directorios
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Evitamos carpeta .git, .github y similares
        if '.git' in dirpath:
            continue
            
        if 'README.md' in filenames:
            # No nos procesamos a nosotros mismos (el README raíz)
            if dirpath == root_dir:
                continue

            readme_path = os.path.join(dirpath, "README.md")
            folder_name = os.path.basename(dirpath)
            relative_path = os.path.relpath(dirpath, root_dir)
            
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                    # --- FILTRO: Si contiene "Frontend Mentor", lo saltamos ---
                    # Verificamos si alguna de las frases prohibidas está en el contenido
                    if any(phrase in content for phrase in IGNORE_PHRASES):
                        print(f"[SKIP] Ignorado (Frontend Mentor): {relative_path}")
                        continue 
                    # ----------------------------------------------------------

                    # Arreglamos los enlaces antes de añadir el contenido
                    content = fix_links(content, relative_path)

                    # Añadimos separador y contenido al texto final
                    full_content += f"\n\n---\n\n# 📂 {folder_name.upper()} ({relative_path})\n\n"
                    full_content += content
                    print(f"[OK] Añadido: {relative_path}")

            except Exception as e:
                print(f"[ERROR] Fallo leyendo {relative_path}: {e}")

    # Guardamos el resultado sobrescribiendo el README.md principal
    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
            f.write(full_content)
        print(f"\n[FIN] README.md actualizado correctamente.")
    except Exception as e:
        print(f"[ERROR] No se pudo guardar el archivo final: {e}")

if __name__ == "__main__":
    merge_readmes()