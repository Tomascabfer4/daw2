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
            return dato
        else:
            print("--> Error: El dato no puede estar vacío. Inténtelo de nuevo.")

class Persona:
    def __init__(self,nombre,apellido1,apellido2,direccion,ciudad,provincia,codigoPostal,telefono):
        """
        Nombre funcion: __init__
        Función que realiza: Constructor de la clase Persona para inicializar atributos.
        Parametros de entrada:
        * nombre : Nombre de la persona.
        * apellido1 : Primer apellido.
        * apellido2 : Segundo apellido.
        * direccion : Dirección.
        * ciudad : Ciudad.
        * provincia : Provincia.
        * codigoPostal : Código Postal.
        * telefono : Teléfono.
        Valor que devuelve: Ninguno.
        Uso de la función: Persona("Juan", "Perez", ...)
        """
        # Inicialización de las variables de instancia
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
        # Retorna el string formateado para mostrar los datos
        return f"""
        ╔══════════════════════════════════════╗
        ║           DATOS DEL CONTACTO         ║
        ╠══════════════════════════════════════╣
        ║ Nombre:      {self.nombre:<24}║
        ║ Apellido 1:  {self.apellido1:<24}║
        ║ Apellido 2:  {self.apellido2:<24}║
        ║ Dirección:   {self.direccion:<24}║
        ║ Ciudad:      {self.ciudad:<24}║
        ║ Provincia:   {self.provincia:<24}║
        ║ Código Postal: {self.codigoPostal:<22}║
        ║ Teléfono:    {self.telefono:<24}║
        ╚══════════════════════════════════════╝
        """

class Agenda:
    def __init__(self):
        """
        Nombre funcion: __init__
        Función que realiza: Constructor de la clase Agenda. Inicializa la lista de contactos.
        Parametros de entrada: Ninguno.
        Valor que devuelve: Ninguno.
        Uso de la función: agenda = Agenda()
        """
        # Inicializa la lista vacía para almacenar contactos
        self.contactos = []

    def agregar_contacto(self, nueva_persona):
        """
        Nombre funcion: agregar_contacto
        Función que realiza: Añade un nuevo contacto a la agenda.
        Parametros de entrada:
        * nueva_persona : Objeto de tipo Persona a añadir.
        Valor que devuelve: Ninguno.
        Uso de la función: agenda.agregar_contacto(persona)
        """
        # Añade la persona a la lista de contactos
        self.contactos.append(nueva_persona)
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
        # Recorre la lista de contactos para buscar coincidencias
        for contacto in self.contactos:
            if contacto.nombre.lower() == nombre.lower():
                return contacto
        return None

    def eliminar_contacto(self, nombre):
        """
        Nombre funcion: eliminar_contacto
        Función que realiza: Elimina un contacto de la agenda por nombre.
        Parametros de entrada:
        * nombre : Nombre del contacto a eliminar.
        Valor que devuelve: True si se eliminó, False si no se encontró.
        Uso de la función: agenda.eliminar_contacto("Juan")
        """
        # Comprueba si el contacto existe antes de intentar borrarlo
        if self.buscar_contacto(nombre):
            self.contactos.remove(self.buscar_contacto(nombre))
            print(f"--> {nombre} ha sido eliminado/a correctamente")
            return True
        else:
            print(f"--> No se ha encontrado ningun contacto con el nombre {nombre}")
            return False

    def modificar_contacto(self, nombre):
        """
        Nombre funcion: modificar_contacto
        Función que realiza: Modifica los datos de un contacto existente.
        Parametros de entrada:
        * nombre : Nombre del contacto a modificar.
        Valor que devuelve: True si se modificó, False si no se encontró.
        Uso de la función: agenda.modificar_contacto("Juan")
        """
        # Verifica si el contacto existe
        if self.buscar_contacto(nombre):
            # Solicita y actualiza los nuevos datos utilizando pedir_dato para validar
            self.buscar_contacto(nombre).nombre = pedir_dato("Introduce el nuevo nombre: ")
            self.buscar_contacto(nombre).apellido1 = pedir_dato("Introduce el nuevo apellido1: ")
            self.buscar_contacto(nombre).apellido2 = pedir_dato("Introduce el nuevo apellido2: ")
            self.buscar_contacto(nombre).direccion = pedir_dato("Introduce la nueva direccion: ")
            self.buscar_contacto(nombre).ciudad = pedir_dato("Introduce la nueva ciudad: ")
            self.buscar_contacto(nombre).provincia = pedir_dato("Introduce la nueva provincia: ")
            self.buscar_contacto(nombre).codigoPostal = pedir_dato("Introduce el nuevo codigoPostal: ")
            self.buscar_contacto(nombre).telefono = pedir_dato("Introduce el nuevo telefono: ")
            print(f"--> {nombre} ha sido modificado/a correctamente")
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
    print("Esta aplicación permite gestionar una lista de contactos personales.")
    print("Opciones disponibles:")
    print("1. Añadir Contacto: Solicita los datos de una nueva persona y la guarda.")
    print("2. Borrar Contacto: Elimina un contacto existente buscando por su nombre.")
    print("3. Modificar Contacto: Permite cambiar los datos de un contacto existente.")
    print("4. Buscar Contacto: Muestra la información detallada de un contacto.")
    print("5. Listar Contactos: Muestra una lista de todos los contactos guardados.")
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
    # Instancia la clase Agenda
    agenda = Agenda()
    opcion = 0
    # Bucle principal del menú hasta que se seleccione salir (opción 7)
    while opcion != 7:
        opcion = mostrarMenu()
        # Control de opciones del menú
        if opcion == 1:
            nombre = pedir_dato("Introduce el nombre: ")
            apellido1 = pedir_dato("Introduce el apellido1: ")
            apellido2 = pedir_dato("Introduce el apellido2: ")
            direccion = pedir_dato("Introduce la direccion: ")
            ciudad = pedir_dato("Introduce la ciudad: ")
            provincia = pedir_dato("Introduce la provincia: ")
            codigoPostal = pedir_dato("Introduce el codigoPostal: ")
            telefono = pedir_dato("Introduce el telefono: ")
            agenda.agregar_contacto(Persona(nombre, apellido1, apellido2, direccion, ciudad, provincia, codigoPostal, telefono))
        elif opcion == 2:
            nombre = pedir_dato("Introduce el nombre: ")
            agenda.eliminar_contacto(nombre)
        elif opcion == 3:
            nombre = pedir_dato("Introduce el nombre: ")
            agenda.modificar_contacto(nombre)
        elif opcion == 4:
            nombre = pedir_dato("Introduce el nombre: ")
            print(agenda.buscar_contacto(nombre))
        elif opcion == 5:
            agenda.mostrarContactos()
        elif opcion == 6:
            mostrarAyuda()
        elif opcion == 7:
            print("\n--- ADIOS ---")
        else:
            print("\n--- OPCION NO VALIDA ---")


if __name__ == "__main__":
    main()