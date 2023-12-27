import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateProducts() {
  const navigate=useNavigate()
  const {id}=useParams();
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(false)
useEffect(()=>{
  fetch(`${window.location.origin}/products/`+id,{
    headers:{
      authorization:"bearer "+JSON.parse(localStorage.getItem('token'))
    }
  }).then((resp) => {
    resp.json().then((result) => {
      console.log(result.name);
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);


    })
  })
},[])

  function add() {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    fetch(`${window.location.origin}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization:"bearer "+JSON.parse(localStorage.getItem('token'))

      },
      body: JSON.stringify({name,price,category,company}),
    }).then((result) =>
      result.json().then((resp) =>{
       alert('Restaurant Successfully updated');
      navigate('/')
      })
    );
  }
  return (
    <div>
    <h1 className='h1 text-center mt-[65px]'>Update Products</h1>
    <div className='m-auto text-center '>
      <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product name' onChange={(event) => setName((event.target.value))} value={name}></input>
      {error && !name && <span className='text-red-500 block -ml-[180px]'>Enter valid name </span>}
      <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product price' onChange={(event) => setPrice(event.target.value)} value={price}></input>
      {error && !price && <span className='text-red-500 block -ml-[185px]'>Enter valid price </span>}
      <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product category' onChange={(event) => setCategory(event.target.value)} value={category}></input>
      {error && !category && <span className='text-red-500 block -ml-[160px]'>Enter valid category </span>}
      <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter product company' onChange={(event) => setCompany(event.target.value)} value={company}></input>
      {error && !company && <span className='text-red-500 block -ml-[155px]'>Enter valid company </span>}
      <button className='button mt-[10px]' onClick={() => add()}>Update Product</button>
    </div>

  </div>
  )
}
