import sys

def obtener_numero(prompt, tipo_dato):
    """
    Pide al usuario un número y se asegura de que sea del tipo correcto (int o float).
    Maneja la excepción ValueError.
    """
    while True:
        try:
            # Pedimos el dato al usuario
            valor_str = input(prompt)
            # Intentamos convertirlo al tipo de dato solicitado
            valor = tipo_dato(valor_str)
            return valor
        except ValueError:
            # Si falla la conversión, informamos el error y volvemos a pedirlo
            print(f"Error [ValueError]: Debes introducir un número {'entero' if tipo_dato == int else 'flotante'} válido.")

def calculadora_numeros(tipo_dato):
    """
    Realiza operaciones básicas (+, -, *, /) con dos números del tipo especificado.
    Maneja la excepción ZeroDivisionError.
    """
    nombre_tipo = "entero" if tipo_dato == int else "flotante"
    print(f"\n--- Calculadora de Números {nombre_tipo.title()}s ---")

    # Usamos la función auxiliar para obtener los números de forma segura
    num1 = obtener_numero(f"Introduce el primer número {nombre_tipo}: ", tipo_dato)
    num2 = obtener_numero(f"Introduce el segundo número {nombre_tipo}: ", tipo_dato)

    op = input("Introduce la operación (+, -, *, /): ").strip()

    try:
        if op == '+':
            resultado = num1 + num2
            print(f"Resultado: {num1} + {num2} = {resultado}")
        elif op == '-':
            resultado = num1 - num2
            print(f"Resultado: {num1} - {num2} = {resultado}")
        elif op == '*':
            resultado = num1 * num2
            print(f"Resultado: {num1} * {num2} = {resultado}")
        elif op == '/':
            # El intento de división ocurre aquí
            resultado = num1 / num2
            print(f"Resultado: {num1} / {num2} = {resultado}")
        else:
            print("Operación no válida. Usa +, -, *, o /.")

    except ZeroDivisionError:
        # Si la operación fue '/' y num2 fue 0, se captura aquí
        print(f"Error [ZeroDivisionError]: No se puede dividir por cero.")

def crear_matriz_desde_input(nombre_matriz):
    """
    Pide al usuario 10 números para una matriz 1x10.
    Los números deben estar separados por comas.
    Maneja la excepción ValueError si la entrada no es numérica.
    Devuelve la lista de números o None si hay un error.
    """
    print(f"\nIntroduce los 10 elementos de la matriz {nombre_matriz}, separados por comas:")
    print("Ejemplo: 1, 2.5, 3, 4, 5, 6, 7, 8, 9, 10")
    input_str = input("-> ")

    try:
        # Separamos la cadena por las comas
        elementos_str = input_str.split(',')
        
        # Convertimos cada elemento a flotante (strip() elimina espacios)
        # Esto fallará con un ValueError si algo no es un número
        matriz = [float(x.strip()) for x in elementos_str]
        
        return matriz
        
    except ValueError:
        # Si la conversión falla (ej. "1, 2, hola, 4"), se captura aquí
        print(f"Error [ValueError]: Uno o más elementos no son números válidos.")
        return None

def suma_matrices():
    """
    Pide dos matrices 1x10 al usuario y suma sus elementos.
    Maneja la excepción IndexError si las matrices no tienen 10 elementos.
    """
    print("\n--- Suma de Matrices 1x10 ---")
    
    # Obtenemos las matrices. Pueden devolver None si hubo un ValueError
    matriz_a = crear_matriz_desde_input("A")
    if matriz_a is None:
        return # El error ya fue impreso en la función auxiliar

    matriz_b = crear_matriz_desde_input("B")
    if matriz_b is None:
        return # El error ya fue impreso

    matriz_suma = []
    
    try:
        # El requisito es sumar 10 elementos (índices 0 al 9)
        print("\nSumando elementos...")
        for i in range(10):
            # Si 'matriz_a' o 'matriz_b' tienen menos de 10 elementos,
            # esta línea fallará con un IndexError cuando 'i' llegue
            # a un índice que no existe (ej. matriz_a[9] si solo tiene 9 elementos).
            suma_elemento = matriz_a[i] + matriz_b[i]
            matriz_suma.append(suma_elemento)
        
        # Si el bucle se completa, la suma fue exitosa
        print(f"\nMatriz A: {matriz_a}")
        print(f"Matriz B: {matriz_b}")
        print(f"Resultado:  {matriz_suma}")

    except IndexError:
        # Si el bucle falló, se captura aquí
        print(f"\nError [IndexError]: No se pudo completar la suma.")
        print("Una o ambas matrices no tienen exactamente 10 elementos.")
        print(f"(Tamaño real A: {len(matriz_a)}, Tamaño real B: {len(matriz_b)})")

def mostrar_menu():
    """Imprime el menú principal de la calculadora."""
    print("\n============================")
    print("       CALCULADORA            ")
    print("============================")
    print("1. Cálculos con números enteros")
    print("2. Cálculos con números flotantes (con decimales)")
    print("3. Sumar dos matrices (vectores 1x10)")
    print("4. Salir")
    print("----------------------------")
    return input("Selecciona una opción (1-4): ")

def main():
    """Función principal que ejecuta el bucle de la calculadora."""
    while True:
        opcion = mostrar_menu()
        
        if opcion == '1':
            calculadora_numeros(int)
        elif opcion == '2':
            calculadora_numeros(float)
        elif opcion == '3':
            suma_matrices()
        elif opcion == '4':
            print("Saliendo de la calculadora. ¡Adiós!")
            break
        else:
            print("Opción no válida. Por favor, elige un número del 1 al 4.")

# Punto de entrada del programa
if __name__ == "__main__":
    main()