import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Navbar({islogin,onlogout}) {
  const navigate=useNavigate()
  const [w,setw]=useState('')

  function input(event){
    setw(event.target.value)
  }

  // async function logout() {
  //   let res=await userlogout()
  //   console.log(res)
  //   localStorage.removeItem('token')
  //   onlogout()
  // }



  function search(){
    console.log("Hello")
    navigate(`/search?word=${w}`)


  }


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Recipe Management</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <Link to="/">
          <a class="nav-link active" aria-current="page" href="#">Home</a></Link>
        </li>
        {!islogin &&(
          <>
                  <li class="nav-item">
            <Link to="/register">
          <a class="nav-link active" aria-current="page" href="#">Register</a></Link>
        </li>
        <li class="nav-item">
            <Link to="/login">
          <a class="nav-link active" aria-current="page" href="#">Login</a></Link>
        </li>
          </>
        )}
        {islogin &&(
          <>
                  <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Logout</a>
        </li>
          </>
        )}
      </ul>

        <input class="form-control w-25 me-2 ms-2" type="search" placeholder="Search" onChange={input} aria-label="Search"></input>
        <button class="btn btn-outline-light" onClick={search}>Search</button>
      
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar