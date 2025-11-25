# 1. Escribir un programa que almacene las asignaturas de un curso (por ejemplo Matemáticas,
# Física, Química, Historia y Lengua) en una lista, pregunte al usuario la nota que ha sacado
# en cada asignatura y elimine de la lista las asignaturas aprobadas. Al final el programa debe
# mostrar por pantalla las asignaturas que el usuario tiene que repetir.

asignaturas = ["Matemáticas", "Física", "Química", "Historia", "Lengua"]
asignaturas_suspensas = []
notas = []

for asignatura in asignaturas:
    # El while true es para que el bucle se repita hasta que se introduzca un número válido
    while True:
        try:
            nota = float(input(f"Introduce la nota de {asignatura}:"))
            if nota >= 0 and nota <= 10:
                notas.append(nota)
                if nota < 5:
                    asignaturas_suspensas.append(asignatura)# Añade la asignatura a la lista de asignaturas suspensas
                break
            else:
                print("Error: Introduce un número entre 0 y 10.")
        except ValueError:
            print("Error: Introduce un número válido.")
print("Tienes que repetir las siguientes asignaturas:", asignaturas_suspensas)
    