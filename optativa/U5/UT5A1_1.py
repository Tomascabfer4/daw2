import os

def pedir_dato(mensaje):
    """
    Nombre funcion: pedir_dato
    Función que realiza: Solicita un dato al usuario y valida que no esté vacío.
    Parametros de entrada:
    * mensaje : Texto que se muestra al usuario para solicitar el dato.
    Valor que devuelve: El dato introducido por el usuario (string no vacío).
    Uso de la función: nombre = pedir_dato("Introduce el nombre: ")
    """
    while True:
        dato = input(mensaje)
        if len(dato.strip()) > 0:
            return dato.strip()
        else:
            print("--> Error: El dato no puede estar vacío. Inténtelo de nuevo.")

class Persona:
    def __init__(self, nombre, apellido1, apellido2, direccion, ciudad, provincia, codigoPostal, telefono):
        """
        Nombre funcion: __init__
        Función que realiza: Constructor de la clase Persona para inicializar atributos.
        Parametros de entrada:
        * nombre : Nombre de la persona.
        * apellido1 : Primer apellido.
        * apellido2 : Segundo apellido.
        * direccion : Dirección.
        * ciudad : Ciudad (Población).
        * provincia : Provincia.
        * codigoPostal : Código Postal.
        * telefono : Teléfono.
        Valor que devuelve: Ninguno.
        Uso de la función: Persona("Juan", "Perez", ...)
        """
        self.nombre = nombre
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        self.direccion = direccion
        self.ciudad = ciudad
        self.provincia = provincia
        self.codigoPostal = codigoPostal
        self.telefono = telefono

    def __str__(self):
        """
        Nombre funcion: __str__
        Función que realiza: Devuelve una representación en cadena del objeto Persona.
        Parametros de entrada: Ninguno.
        Valor que devuelve: String con los datos formateados.
        Uso de la función: print(persona)
        """
        return f"""
        ╔══════════════════════════════════════════╗
        ║           DATOS DEL CONTACTO             ║
        ╠══════════════════════════════════════════╣
        ║ Nombre:      {self.nombre:<28}║
        ║ Apellido 1:  {self.apellido1:<28}║
        ║ Apellido 2:  {self.apellido2:<28}║
        ║ Dirección:   {self.direccion:<28}║
        ║ Ciudad:      {self.ciudad:<28}║
        ║ Provincia:   {self.provincia:<28}║
        ║ Código Postal: {self.codigoPostal:<26}║
        ║ Teléfono:    {self.telefono:<28}║
        ╚══════════════════════════════════════════╝
        """

class Agenda:
    def __init__(self):
        """
        Nombre funcion: __init__
        Función que realiza: Constructor de la clase Agenda. Inicializa la lista y carga el fichero.
        Parametros de entrada: Ninguno.
        Valor que devuelve: Ninguno.
        Uso de la función: agenda = Agenda()
        """
        self.contactos = []
        self.nombre_fichero = "agenda.txt"
        self.cargar_contactos()

    def cargar_contactos(self):
        """
        Nombre funcion: cargar_contactos
        Función que realiza: Lee el fichero agenda.txt y carga los datos en la lista de memoria.
        Parametros de entrada: Ninguno.
        Valor que devuelve: Ninguno.
        Uso de la función: self.cargar_contactos()
        """
        if os.path.exists(self.nombre_fichero):
            try:
                with open(self.nombre_fichero, "r", encoding="utf-8") as f:
                    for linea in f:
                        datos = linea.strip().split(";")
                        if len(datos) == 8:
                            p = Persona(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6], datos[7])
                            self.contactos.append(p)
                print(f"--> Se han cargado {len(self.contactos)} contactos del fichero.")
            except Exception as e:
                print(f"--> Error al leer el fichero: {e}")
        else:
            open(self.nombre_fichero, "w").close()

    def guardar_contactos(self):
        """
        Nombre funcion: guardar_contactos
        Función que realiza: Vuelca toda la lista de contactos actual al fichero agenda.txt.
        Parametros de entrada: Ninguno.
        Valor que devuelve: Ninguno.
        Uso de la función: self.guardar_contactos()
        """
        try:
            with open(self.nombre_fichero, "w", encoding="utf-8") as f:
                for c in self.contactos:
                    linea = f"{c.nombre};{c.apellido1};{c.apellido2};{c.direccion};{c.ciudad};{c.provincia};{c.codigoPostal};{c.telefono}\n"
                    f.write(linea)
        except Exception as e:
            print(f"--> Error al guardar en el fichero: {e}")

    def agregar_contacto(self, nueva_persona):
        """
        Nombre funcion: agregar_contacto
        Función que realiza: Añade un nuevo contacto a la agenda y actualiza el fichero.
        Parametros de entrada:
        * nueva_persona : Objeto de tipo Persona a añadir.
        Valor que devuelve: Ninguno.
        Uso de la función: agenda.agregar_contacto(persona)
        """
        self.contactos.append(nueva_persona)
        self.guardar_contactos()
        print(f"--> {nueva_persona.nombre} ha sido agregado/a correctamente")

    def buscar_contacto(self, nombre):
        """
        Nombre funcion: buscar_contacto
        Función que realiza: Busca un contacto por nombre.
        Parametros de entrada:
        * nombre : Nombre del contacto a buscar.
        Valor que devuelve: El objeto Persona si existe, None si no.
        Uso de la función: contacto = agenda.buscar_contacto("Juan")
        """
        for contacto in self.contactos:
            if contacto.nombre.lower() == nombre.lower():
                return contacto
        return None

    def eliminar_contacto(self, nombre):
        """
        Nombre funcion: eliminar_contacto
        Función que realiza: Elimina un contacto de la agenda por nombre y actualiza el fichero.
        Parametros de entrada:
        * nombre : Nombre del contacto a eliminar.
        Valor que devuelve: True si se eliminó, False si no se encontró.
        Uso de la función: agenda.eliminar_contacto("Juan")
        """
        contacto_a_borrar = self.buscar_contacto(nombre)
        if contacto_a_borrar:
            self.contactos.remove(contacto_a_borrar)
            self.guardar_contactos()
            print(f"--> {nombre} ha sido eliminado/a correctamente")
            return True
        else:
            print(f"--> No se ha encontrado ningun contacto con el nombre {nombre}")
            return False

    def modificar_contacto(self, nombre):
        """
        Nombre funcion: modificar_contacto
        Función que realiza: Modifica los datos de un contacto existente y actualiza el fichero.
        Parametros de entrada:
        * nombre : Nombre del contacto a modificar.
        Valor que devuelve: True si se modificó, False si no se encontró.
        Uso de la función: agenda.modificar_contacto("Juan")
        """
        contacto = self.buscar_contacto(nombre)
        if contacto:
            print(f"--> Modificando datos de: {contacto.nombre}")
            contacto.nombre = pedir_dato("Introduce el nuevo nombre: ")
            contacto.apellido1 = pedir_dato("Introduce el nuevo apellido1: ")
            contacto.apellido2 = pedir_dato("Introduce el nuevo apellido2: ")
            contacto.direccion = pedir_dato("Introduce la nueva direccion: ")
            contacto.ciudad = pedir_dato("Introduce la nueva ciudad: ")
            contacto.provincia = pedir_dato("Introduce la nueva provincia: ")
            contacto.codigoPostal = pedir_dato("Introduce el nuevo codigoPostal: ")
            contacto.telefono = pedir_dato("Introduce el nuevo telefono: ")
            self.guardar_contactos()
            print(f"--> {contacto.nombre} ha sido modificado/a correctamente")
            return True
        else:
            print(f"--> No se ha encontrado ningun contacto con el nombre {nombre}")
            return False
            
    def mostrarContactos(self):
        """
        Nombre funcion: mostrarContactos
        Función que realiza: Imprime todos los contactos de la agenda.
        Parametros de entrada: Ninguno.
        Valor que devuelve: Ninguno.
        Uso de la función: agenda.mostrarContactos()
        """
        print ("\n--- LISTA DE CONTACTOS ---")
        if not self.contactos:
            print("No hay contactos guardados.")
        else:
            for contacto in self.contactos:
                print(contacto)
        print("\n--------------------------")


def mostrarAyuda():
    """
    Nombre funcion: mostrarAyuda
    Función que realiza: Muestra una ayuda detallada sobre el uso de la agenda.
    Parametros de entrada: Ninguno.
    Valor que devuelve: Ninguno.
    Uso de la función: mostrarAyuda()
    """
    print("\n--- AYUDA DE LA AGENDA ---")
    print("Esta aplicación permite gestionar una lista de contactos personales usando un fichero 'agenda.txt'.")
    print("Opciones disponibles:")
    print("1. Añadir Contacto: Solicita los datos y los guarda permanentemente.")
    print("2. Borrar Contacto: Elimina un contacto del fichero buscando por su nombre.")
    print("3. Modificar Contacto: Actualiza los datos de una persona en el fichero.")
    print("4. Buscar Contacto: Busca por nombre y muestra la ficha detallada.")
    print("5. Listar Contactos: Muestra todos los contactos almacenados en el fichero.")
    print("6. Ayuda: Muestra esta pantalla de información.")
    print("7. Salir: Cierra la aplicación.")
    print("--------------------------")


def mostrarMenu():
    """
    Nombre funcion: mostrarMenu
    Función que realiza: Muestra las opciones del menú y recoge la elección del usuario.
    Parametros de entrada: Ninguno.
    Valor que devuelve: Entero con la opción seleccionada (0 si es inválida).
    Uso de la función: opcion = mostrarMenu()
    """
    print("\n--- MENÚ DE LA AGENDA ---")
    print("1. Añadir Contacto")
    print("2. Borrar Contacto")
    print("3. Modificar Contacto")
    print("4. Buscar Contacto")
    print("5. Listar Contactos")
    print("6. Ayuda al uso de la Agenda")
    print("7. Salir")
    try:
        opcion = int(input("\nIntroduce una opcion: "))
        return opcion
    except ValueError:
        print("--> Error: Debes introducir un número válido.")
        return 0

def main():
    """
    Nombre funcion: main
    Función que realiza: Función principal que gestiona el flujo del programa.
    Parametros de entrada: Ninguno.
    Valor que devuelve: Ninguno.
    Uso de la función: main()
    """
    agenda = Agenda()
    opcion = 0
    while opcion != 7:
        opcion = mostrarMenu()
        if opcion == 1:
            print("\n--- NUEVO CONTACTO ---")
            nombre = pedir_dato("Introduce el nombre: ")
            apellido1 = pedir_dato("Introduce el apellido1: ")
            apellido2 = pedir_dato("Introduce el apellido2: ")
            direccion = pedir_dato("Introduce la direccion: ")
            ciudad = pedir_dato("Introduce la ciudad (Poblacion): ")
            provincia = pedir_dato("Introduce la provincia: ")
            codigoPostal = pedir_dato("Introduce el codigoPostal: ")
            telefono = pedir_dato("Introduce el telefono: ")
            agenda.agregar_contacto(Persona(nombre, apellido1, apellido2, direccion, ciudad, provincia, codigoPostal, telefono))
            
        elif opcion == 2:
            print("\n--- BORRAR CONTACTO ---")
            nombre = pedir_dato("Introduce el nombre del contacto a borrar: ")
            agenda.eliminar_contacto(nombre)
            
        elif opcion == 3:
            print("\n--- MODIFICAR CONTACTO ---")
            nombre = pedir_dato("Introduce el nombre del contacto a modificar: ")
            agenda.modificar_contacto(nombre)
            
        elif opcion == 4:
            print("\n--- BUSCAR CONTACTO ---")
            nombre = pedir_dato("Introduce el nombre a buscar: ")
            c = agenda.buscar_contacto(nombre)
            if c:
                print(c)
            else:
                print(f"--> No se encontró a {nombre}")
                
        elif opcion == 5:
            agenda.mostrarContactos()
            
        elif opcion == 6:
            mostrarAyuda()
            
        elif opcion == 7:
            print("\n--- ADIOS ---")
            
        else:
            print("\n--- OPCION NO VALIDA ---")
            print("Por favor, seleccione una opción entre 1 y 7.")


if __name__ == "__main__":
    main()