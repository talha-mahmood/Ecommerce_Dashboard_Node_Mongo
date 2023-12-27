import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Nav() {
  const navigate=useNavigate()
  const auth = localStorage.getItem("user");
  function logout(){
    localStorage.clear();
    navigate("/signup");
  }
  return (
    <div>
      <img className='  w-[45px] h-[45px] float-left rounded-[50%] mt-[4px] ml-[10px]' src='https://cdn.logojoy.com/wp-content/uploads/20201123121721/Surge-Select-Still.png' />
      {auth ?
        <ul className="nav-ul w-[100%]">
          <li><a href=''><Link to="/">Products</Link></a></li>
          <li><a href=""><Link to="/create">Add Products</Link></a></li>
          <li><a href=""><Link to="/profile">Profile</Link></a></li>
          <li><a href=""><Link to="/signup" onClick={()=>logout()}>Logout {"( " + JSON.parse(auth).name + " )"}</Link></a></li>
        </ul> :
        <ul className="nav-ul w-[100%] text-right">
          <li><a href=""><Link to="/signup">Signup</Link></a></li>
          <li><a href=""><Link to="/login">Login</Link></a></li>
        </ul>
      }

    </div>
  )
}
