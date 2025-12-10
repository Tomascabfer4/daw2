diccionarioContactos = [
    {
        "nombre": "Juan",
        "apellido1": "Perez",
        "apellido2": "Garcia",
        "direccion": "Calle 123",
        "ciudad": "Madrid",
        "provincia": "Madrid",
        "codigoPostal": "12345",
        "telefono": "123456789"
    },
    {
        "nombre": "Maria",
        "apellido1": "Lopez",
        "apellido2": "Gonzalez",
        "direccion": "Calle 456",
        "ciudad": "Barcelona",
        "provincia": "Barcelona",
        "codigoPostal": "65432",
        "telefono": "987654321"
    }
]

def annadirContacto():
    nombre = input("Introduce el nombre: ")
    apellido1 = input("Introduce el apellido1: ")
    apellido2 = input("Introduce el apellido2: ")
    direccion = input("Introduce la direccion: ")
    ciudad = input("Introduce la ciudad: ")
    provincia = input("Introduce la provincia: ")
    codigoPostal = input("Introduce el codigoPostal: ")
    telefono = input("Introduce el telefono: ")
    diccionarioContactos.append({
        "nombre": nombre,
        "apellido1": apellido1,
        "apellido2": apellido2,
        "direccion": direccion,
        "ciudad": ciudad,
        "provincia": provincia,
        "codigoPostal": codigoPostal,
        "telefono": telefono
    })
    print("Contacto añadido correctamente")

def eliminarContacto():
    nombre = input("Introduce el nombre del contacto: ").lower()
    for contacto in diccionarioContactos:
        if contacto["nombre"].lower() == nombre:
            diccionarioContactos.remove(contacto)
            return True
    return False

def editarContacto():
    nombre = input("Introduce el nombre del contacto: ").lower()
    for contacto in diccionarioContactos:
        if contacto["nombre"].lower() == nombre:
            contacto["nombre"] = input("Introduce el nuevo nombre: ")
            contacto["apellido1"] = input("Introduce el nuevo apellido1: ")
            contacto["apellido2"] = input("Introduce el nuevo apellido2: ")
            contacto["direccion"] = input("Introduce la nueva direccion: ")
            contacto["ciudad"] = input("Introduce la nueva ciudad: ")
            contacto["provincia"] = input("Introduce la nueva provincia: ")
            contacto["codigoPostal"] = input("Introduce el nuevo codigoPostal: ")
            contacto["telefono"] = input("Introduce el nuevo telefono: ")
            return True
    return False

def buscarContacto():
    nombre = input("Introduce el nombre del contacto: ").lower()
    for contacto in diccionarioContactos:
        if contacto["nombre"].lower() == nombre:
            print(formatearContacto(contacto))
            return True
    return False

def formatearContacto(contacto):
    return f"""
    ╔══════════════════════════════════════╗
    ║           DATOS DEL CONTACTO         ║
    ╠══════════════════════════════════════╣
    ║ Nombre:      {contacto['nombre']:<24}║
    ║ Apellido 1:  {contacto['apellido1']:<24}║
    ║ Apellido 2:  {contacto['apellido2']:<24}║
    ║ Dirección:   {contacto['direccion']:<24}║
    ║ Ciudad:      {contacto['ciudad']:<24}║
    ║ Provincia:   {contacto['provincia']:<24}║
    ║ Código Postal: {contacto['codigoPostal']:<22}║
    ║ Teléfono:    {contacto['telefono']:<24}║
    ╚══════════════════════════════════════╝
    """

def mostrarContactos():
    for contacto in diccionarioContactos:
        print(formatearContacto(contacto))

def mostrarMenu():
    print("1. Añadir contacto")
    print("2. Eliminar contacto")
    print("3. Editar contacto")
    print("4. Buscar contacto")
    print("5. Mostrar contactos")
    print("6. Salir")
    opcion = int(input("Introduce una opcion: "))
    return opcion

def main():
    opcion = 0
    while opcion != 6:
        opcion = mostrarMenu()
        if opcion == 1:
            annadirContacto()
        elif opcion == 2:
            if eliminarContacto() != None:
                print("Contacto eliminado correctamente")
            else:
                print("Contacto no encontrado")
        elif opcion == 3:
            if editarContacto() != None:
                print("Contacto editado correctamente")
            else:
                print("Contacto no encontrado")
        elif opcion == 4:
            if buscarContacto() != None:
                print("Contacto encontrado")
            else:
                print("Contacto no encontrado")
        elif opcion == 5:
            mostrarContactos()
        elif opcion == 6:
            print("Adios")

if __name__ == "__main__":
    main()