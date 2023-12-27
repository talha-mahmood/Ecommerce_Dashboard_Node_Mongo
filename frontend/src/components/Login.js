import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: null,
    password: null
  })
  useEffect(() => {
    localStorage.getItem("user") && navigate("/")
  }, [])
  function login() {
    fetch(`${window.location.origin}/login`, {
      method: "post",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(state)
    }).then((resp) => {
      resp.json().then((result) => {
        console.log(result)
        if (result.auth) {
          localStorage.setItem("user", JSON.stringify(result.userFind))
          localStorage.setItem("token", JSON.stringify(result.auth))
          navigate("/")
        }
        if (result.result) {
          alert("plz enter correct details");
        }
      })
    })
  }
  return (
    <div>
      <div className='blockmargin'>
        <h1 className='h1 text-center'>Login</h1>
        <div className='m-auto text-center '>
          <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter Email' onChange={(event) => setState((prevState) => ({ ...prevState, email: event.target.value }))}></input>
          <input className='m-auto flex mt-[5px] p-[10px] w-[300px] border-[1px] border-solid border-[skyblue]' type='text' placeholder='Enter Password' onChange={(event) => setState((prevState) => ({ ...prevState, password: event.target.value }))}></input>
          <button className='button mt-[10px]' onClick={() => login()}>Login</button>
        </div>
      </div>
    </div>
  )
}
