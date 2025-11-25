# 2. Escribir un programa que almacene el abecedario en una lista, elimine de la lista las letras
# que ocupen posiciones múltiplos de 3, y muestre por pantalla la lista resultante.

abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

# Itera de al reves para evitar que cambie el indice range(inicio, fin, paso): desde len-1 hasta 0, decrementando de 1 en 1
for i in range(len(abecedario) - 1, -1, -1):
    if i % 3 == 0:
        abecedario.pop(i)
        
print("Lista resultante:", abecedario)