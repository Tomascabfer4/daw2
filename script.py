import os

# Nombre del archivo de salida
OUTPUT_FILENAME = "README_COMPLETO.md"

def merge_readmes():
    root_dir = os.getcwd()
    full_content = "# Índice General de Asignaturas y Tareas\n\n"

    # Recorremos todos los directorios desde la raíz
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Evitamos entrar en la carpeta .git o en el propio script
        if '.git' in dirpath:
            continue
            
        # Si encontramos un README.md (y no es el que estamos creando)
        if 'README.md' in filenames:
            # Ignoramos el README principal para no duplicarlo si ya tiene cosas
            if dirpath == root_dir:
                continue

            readme_path = os.path.join(dirpath, "README.md")
            
            # Obtenemos el nombre de la carpeta para usarlo de título
            folder_name = os.path.basename(dirpath)
            relative_path = os.path.relpath(dirpath, root_dir)
            
            try:
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Añadimos un encabezado separador para saber de qué carpeta viene
                    full_content += f"\n\n---\n\n# 📂 {folder_name.upper()} ({relative_path})\n\n"
                    full_content += content
                    print(f"✅ Procesado: {relative_path}")
            except Exception as e:
                print(f"❌ Error leyendo {relative_path}: {e}")

    # Guardamos todo en un nuevo archivo
    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print(f"\n✨ ¡Listo! Todo el contenido se ha guardado en {OUTPUT_FILENAME}")

if __name__ == "__main__":
    merge_readmes()