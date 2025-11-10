import React from 'react'

async function PaginaSuma ({params, searchParams}) {
    const { num1, num2} = await params
    const suma = Number(num1) + Number(num2);
    return (
      <div className='text-9xl'>{suma}</div>
    )
  }

export default PaginaSuma