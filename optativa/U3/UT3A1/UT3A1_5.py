# 5. Escribir un programa que pregunte por una muestra de números, separados por comas, los
# guarde en una lista y muestre por pantalla su media y desviación típica.

numeros = input("Introduce una muestra de números separados por comas: ").split(",")
numeros = [float(num) for num in numeros]
media = sum(numeros) / len(numeros)
desviacion_tipica = (sum((x - media) ** 2 for x in numeros) / len(numeros)) ** 0.5
print("Media:", media)
print("Desviación típica:", desviacion_tipica)
