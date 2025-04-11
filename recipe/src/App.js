import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Detail from './components/Detail';
import Update from './components/Update';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Addreview from './components/Addreview';
import Add from './components/Add';
import Search from './components/Search';
import { useEffect, useState } from 'react';

function App() {
  const [islogin,settoken]=useState(false)  //default is set to false

  function checkloginstatus() {
    let token=localStorage.getItem('token')  //checks whether the token in localstorage
    settoken(!(!token))

  }


  useEffect(()=>{checkloginstatus()},[])


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar islogin={islogin} onlogout={checkloginstatus}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
        <Route path="/update" element={<Update/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login onlogin={checkloginstatus}/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/addreview" element={<Addreview islogin={islogin}/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
