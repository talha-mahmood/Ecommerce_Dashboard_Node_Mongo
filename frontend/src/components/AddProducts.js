import React, { useState } from 'react'

export default function AddProducts() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(false)


  function add() {
    if (!name || !price || !category || !company) {
      console.log(!name)
      setError(true);
      return false;

    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    fetch(`${window.location.origin}/addProduct`, {
      method: "post",
      headers: {
        'Content-Type': "application/json",
        authorization:"bearer "+JSON.parse(localStorage.getItem('token'))
      },
      body: JSON.stringify({ name, price, category, company, userId })
    }).then((resp) => {
      resp.json().then((result) => {
        console.log(result)
        alert("Product added successfully")

      })
    })
  }
  return (
    <div>
      <h1 className='h1 text-center mt-[65px]'>Add Products</h1>
      <div className='m-auto text-center '>
        <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product name' onChange={(event) => setName((event.target.value))}></input>
        {error && !name && <span className='text-red-500 block -ml-[180px]'>Enter valid name </span>}
        <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product price' onChange={(event) => setPrice(event.target.value)}></input>
        {error && !price && <span className='text-red-500 block -ml-[185px]'>Enter valid price </span>}
        <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product category' onChange={(event) => setCategory(event.target.value)}></input>
        {error && !category && <span className='text-red-500 block -ml-[160px]'>Enter valid category </span>}
        <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product company' onChange={(event) => setCompany(event.target.value)}></input>
        {error && !company && <span className='text-red-500 block -ml-[155px]'>Enter valid company </span>}
        <button className='button mt-[10px]' onClick={() => add()}>Add Product</button>
      </div>

    </div>
  )
}
