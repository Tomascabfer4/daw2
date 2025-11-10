'use server'

import { db } from '@/lib/db'
import { revalidatePath, updateTag } from 'next/cache'



// BASE DE DATOS


export async function nuevoClienteDB(formData) {
    const nombre = formData.get('nombre')
    const apellido1 = formData.get('apellido1')
    const apellido2 = formData.get('apellido2')
    const dni = formData.get('dni')
    const telefono = formData.get('telefono')

    const sql = 'insert into `clientes` (`nombre`, `apellido1`, `apellido2`, `dni`, `telefono`) values (?, ?, ?, ?,?)'
    const values = [nombre, apellido1, apellido2, dni, telefono];

    const [result, fields] = await db.query(sql, values)
    revalidatePath('/clientes-db')
}


export async function editarClienteDB(formData) {
    const id = formData.get('id')
    const nombre = formData.get('nombre')
    const apellido1 = formData.get('apellido1')
    const apellido2 = formData.get('apellido2')
    const dni = formData.get('dni')
    const telefono = formData.get('telefono')

    const sql = 'update clientes set nombre=?, apellido1=?, apellido2=?, dni=?, telefono=? where id=?'
    const values = [nombre, apellido1, apellido2, dni, telefono, id];

    const [result, fields] = await db.query(sql, values)
    revalidatePath('/clientes-db')
}




export async function eliminarClienteDB(formData) {
    const id = formData.get('id')

    const sql = 'delete from clientes where id = ?'
    const values = [id]
    await db.query(sql, values);

    revalidatePath('/clientes-db')
}



// API

export async function nuevoClienteAPI(formData) {
    const [nombre, apellido1, apellido2, dni, telefono] = formData.values()

    const response = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, apellido1, apellido2, dni, telefono, createdAt: new Date().toISOString() })
    })
    const data = await response.json()

    revalidatePath('/clientes-api')
}


export async function editarClienteAPI(formData) {
    const [id, nombre, apellido1, apellido2, dni, telefono] = formData.values()

    const response = await fetch('http://localhost:3001/clientes/' + id, {
        method: 'PUT',
        body: JSON.stringify({ nombre, apellido1, apellido2, dni, telefono, updatedAt: new Date().toISOString() })
    })
    const data = await response.json()
    revalidatePath('/clientes-api')
}


export async function eliminarClienteAPI(formData) {
    const id = formData.get('id')

    await fetch('http://localhost:3001/clientes/' + id, { method: 'DELETE' })

    revalidatePath('/clientes-api')
}
