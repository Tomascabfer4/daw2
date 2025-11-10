import React from 'react'

async function page( { params }) {
    const { numeros } = await params

    const suma = numeros.reduce ( (acc,numero)=> acc + Number(numero), 0)
    
    return (
    <div className='text-9xl'>
        {suma}

    </div>
  )
}

export default page