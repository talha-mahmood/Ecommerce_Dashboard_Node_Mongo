import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Home() {
  const [state, setState] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  async function getProducts() {
    await fetch(`${window.location.origin}/products`,{
      headers:{
        authorization:"bearer "+JSON.parse(localStorage.getItem('token'))
      }
    }).then(async (resp) => {
      await resp.json().then((result) => {
        console.log(result)
        // console.log(result.map((i)=>i.name))
        setState(result)
      })
    })
  }
  function search(key) {
    if (key) {
      fetch(`${window.location.origin}/search/` + key,{
        headers:{
          authorization:"bearer "+JSON.parse(localStorage.getItem('token'))
        }
      }).then((resp) => resp.json().then((result) => {
        console.log(result)
        setState(result)
      }))
    }
    else {
      getProducts()
    }

  }

  function deleteProducts(id) {
    fetch(`${window.location.origin}/products/` + id, {
      method: 'delete',
      headers:{
        authorization:"bearer "+JSON.parse(localStorage.getItem('token'))
      }
    }).then(async (resp) => {
      resp.json().then((result) => {
        // console.log(result.map((i)=>i.name))
        console.log(result)
        if (result) {

          getProducts()
        }
        else {
          alert("no products available")
        }

      })
    })
  }
  return (
    <div>
      <div className='product-list'>
        <h1 className='h1'>Product List</h1>
        <input type="text" placeholder='Search Products' className='search-product-box' onChange={(event) => { search(event.target.value) }} />
        {
          console.log(state)

        }
        <ul className=''>
          <li className="">S.No</li>
          <li className="">Name</li>
          <li className="">Price</li>
          <li className="">Category</li>
          <li className="">Operations</li>
        </ul>

        {
          console.log(state)
        }
        {state.length > 0 ?
          (state.map((item, i) =>
            <ul className='' key={item._id}>
              <li className="">{i + 1}</li>
              <li className="">{item.name}</li>
              <li className="">{item.price}</li>
              <li className="">{item.category}</li>
              <li className=""><FontAwesomeIcon icon={faTrash} color='red' onClick={() => deleteProducts(item._id)} className='pr-[5px]' /> <Link to={"/update/" + item._id}><FontAwesomeIcon icon={faPenToSquare} color='orange' /></Link></li>
            </ul>)) : <div className="h1">No Products found</div>
        }
      </div>
    </div>
  )
}
