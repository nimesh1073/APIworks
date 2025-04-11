import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { allreviews, getrecipedetail } from '../services/Apicall'

function Detail() {
  const [review,setreview]=useState()
    const [recipe,setrecipe]=useState([])
    const navigate=useNavigate()

    const {search}=useLocation()
    console.log(search)

    const queryParams=new URLSearchParams(search)

    const id=queryParams.get('id')
    async function deleterecipe(i){
      let res=await deleterecipe(i)
      console.log(res)
    }

    async function editrecipe(i){
      console.log(i)
      navigate(`/update?id=${i}`)
    }

    async function fetchrecipedetail() {
        let res=await getrecipedetail(id)
        console.log(res)
        setrecipe(res.data)
        
    }

    async function reviews(i){
      //console.log("reviews")
      let res=await allreviews(i)
      console.log(res)
      setreview(res.data)

    }

    function addreview(i){
      //console.log(i)
      navigate(`/addreview?id=${i}`)
    }

    useEffect(()=>{fetchrecipedetail()},[])

    return (
        <div>
            
      <div class="container mt-5 w-50 border bg-warning text-light shadow p-2">
      <table class="table table-bordered p-3">
        <thead>
        <tr>
          <th>Cover</th>
          <td><img src={recipe.image} height="150px" width="100px"></img></td>
        </tr>
        <tr>
          <th>Name</th>
            <td>{recipe.recipe_name}</td>
        </tr>
        <tr>
          <th>Ingredients</th>
            <td>{recipe.recipe_ingredients}</td>
        </tr>
        <tr>
          <th>Instructions</th>
            <td>{recipe.instructions}</td>
        </tr>
        <tr>
          <th>Cuisine</th>
            <td>{recipe.recipe_cuisine}</td>
        </tr>
        <tr>
          <th>Meal Type</th>
            <td>{recipe.meal_type}</td>
        </tr>

        </thead>
        
      </table>
      
      <div class="d-flex justify-content-around">
      <button class="btn btn-outline-dark" onClick={()=>deleterecipe(recipe.id)}>Delete</button>
      <button class="btn btn-outline-dark"onClick={()=>editrecipe(recipe.id)}>Edit</button>
      <button class="btn btn-outline-dark" onClick={()=>reviews(recipe.id)}>Reviews</button>
      <button class="btn btn-outline-dark"onClick={()=>addreview(recipe.id)}>Add Review</button>      
      </div>
      
      {review?<div class="mt-4">
      <h2>Top Listed Review</h2>
      {review.map((s)=><div class="p-3 border border-top-1 border-dark">
        <strong>{s.recipe_name}</strong><br></br>
        <strong>{'*'.repeat(s.rating)}</strong><br></br>
        <strong>{s.comments}</strong><br></br>
        <strong>{s.date}</strong><br></br>
      </div>)}</div>:<div>No Reviews</div>}
        
      </div>
      </div>
        
        
    )
}

export default Detail