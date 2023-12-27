import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Nav';
const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: null,
    email: null,
    password: null
  })
  useEffect(() => {
    localStorage.getItem("user") && navigate("/")
  }, [])
  function register() {
    fetch(`${window.location.origin}/register`, {
      method: "post",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(state)
    }).then((resp) => {
      resp.json().then((result) => {
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))
        navigate('/')
        alert("User Signed up Successfully")
      })
    })
  }
  return (
    <div>
      <div className='blockmargin'>
        <h1 className='h1 text-center'>Register</h1>
        <div className='m-auto text-center '>
          <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter Name'
            onChange={(event) => setState((prevState) => ({ ...prevState, name: event.target.value }))}></input>
          <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter Email' onChange={(event) => setState((prevState) => ({ ...prevState, email: event.target.value }))}></input>
          <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter Password' onChange={(event) => setState((prevState) => ({ ...prevState, password: event.target.value }))}></input>
          <button className='button mt-[10px]' onClick={() => register()}>Sign up</button>
        </div>

      </div>
    </div>
  )
}
export default Signup;