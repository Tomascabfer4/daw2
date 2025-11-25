# 3. Escribir un programa que pida al usuario una palabra y muestre por pantalla si es un
# palíndromo.

palabra = input("Introduce una palabra: ")
palabra_invertida = palabra[::-1] #Invierte toda la cadena de texto

if palabra == palabra_invertida:
    print("La palabra es un palíndromo")
else:
    print("La palabra no es un palíndromo")