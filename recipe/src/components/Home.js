import React, { useEffect, useState } from 'react'
import { getallrecipe } from '../services/Apicall'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [recipe,setrecipe]=useState([])
    const navigate=useNavigate()

    async function addrecipe(){ 
        console.log("hello")
        navigate('/add')
    }

    async function fetchrecipes() {
       // console.log("Hello")
       let res=await getallrecipe()
       console.log(res)
       setrecipe(res.data)
    }

    function detailrecipe(i) {
        navigate(`/detail?id=${i}`)
    }


    useEffect(()=>{fetchrecipes()},[])
    return (
        <div>
            <div class="container border border-1 border-light">
                <div class="row">
                {recipe.map((s)=><div class="col-4">
                <div class="card mx-auto mt-5 " style={{width:"18rem;"}}>                
  <img src={s.image} height="250px" style={{width:"230px"}} class="card-img-top" alt="..."></img>
  <div class="card-body">
    <h5 class="card-title">{s.recipe_name}</h5>
    <a href="#" class="btn btn-primary" onClick={()=>detailrecipe(s.id)}>Details</a>
  </div>
</div>
</div>)}
</div>
<div class="d-flex justify-content-center">
    <button class="btn btn-primary mt-5" onClick={addrecipe}>Add New Recipe</button>
</div>
</div>
        </div>
    )
}

export default Home