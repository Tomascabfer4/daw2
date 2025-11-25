# 4. Escribir un programa que almacene las matrices
# en una tupla y muestre por pantalla su producto.
# Nota: Para representar matrices mediante tuplas usar tuplas anidadas, representando cada
# vector fila en una lista.
# Formula para multiplicar matrices: Matriz A (m x n), Matriz B (n x p), 

matriz1 = ((1, 2, 3), (4, 5, 6))  # 2×3
matriz2 = ((-1, 0), (0, 1), (1, 1))  # 3×2

# Obtener dimensiones
filas_A = len(matriz1)  # 2
columnas_A = len(matriz1[0])  # 3
filas_B = len(matriz2)  # 3
columnas_B = len(matriz2[0])  # 2

# Verificar que las matrices son compatibles para multiplicación
if columnas_A != filas_B:
    print("Error: Las matrices no se pueden multiplicar")
    print(f"Matriz A: {filas_A}×{columnas_A}, Matriz B: {filas_B}×{columnas_B}")
else:
    # Crear matriz resultado inicializada con ceros
    # El resultado será de dimensiones filas_A × columnas_B (2×2)
    resultado = []
    for i in range(filas_A):
        fila = []
        for j in range(columnas_B):
            fila.append(0)
        resultado.append(fila)
    
    # Realizar la multiplicación
    # Para cada fila de matriz1
    for i in range(filas_A):
        # Para cada columna de matriz2
        for j in range(columnas_B):
            # Calcular el elemento resultado[i][j]
            suma = 0
            for k in range(columnas_A):  # o filas_B (son iguales)
                suma += matriz1[i][k] * matriz2[k][j]
            resultado[i][j] = suma
    
    # Mostrar el resultado
    print("Matriz 1:")
    for fila in matriz1:
        print(fila)
    
    print("\nMatriz 2:")
    for fila in matriz2:
        print(fila)
    
    print("\nProducto (Matriz 1 x Matriz 2):")
    for fila in resultado:
        print(fila)
