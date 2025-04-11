import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getrecipedetail } from '../services/Apicall'
import { editrecipedetail } from '../services/Apicall'

function Update() {


  const [recipe,setrecipe]=useState({recipe_name:'',recipe_ingredients:'',instructions:'',recipe_cuisine:'',meal_type:'',image:null})
     
  const {search}=useLocation()
     console.log(search)
     
     const queryParams=new URLSearchParams(search)
     const id=queryParams.get('id')
     const navigate=useNavigate()
     console.log(id)
         async function fetchrecipe()
          {
          
             let res=await getrecipedetail(id)
             // console.log(res.data)
             setrecipe(res.data)
         }
  

          async function editrecipe(event)
          {
           event.preventDefault()
           // let res= await editbookdetails(id,book)
           // console.log(res)
           // console.log(recipe)
         
   
   
             const urecipe={...recipe}
          
                 if(typeof urecipe.image=='string')
                 {
                  delete urecipe.image
                 }
                  
                  console.log(urecipe)
                  let res= await editrecipedetail(urecipe,id)
                  console.log(res)
                  navigate('/')
                 }
             
          
             
                  useEffect(()=>{fetchrecipe()},[]) 
   
  return (
    <div>
        <div class="container w-50 border border-1 shadow border-light p-5 mt-5">
                <h2 class="text-center text-dark mt-2 fw-bold">Edit Recipe</h2>
        <form onSubmit={editrecipe}>
        <div class="mb-3 mt-3">
          <label class="form-label">Recipe Name</label>
          <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,'recipe_name':event.target.value})}} value={recipe.recipe_name}></input>
        </div>
        <div class="mb-3 mt-3">
          <label class="form-label">Ingredients</label>
          <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,'recipe_ingredients':event.target.value})}} value={recipe.recipe_ingredients}></input>
        </div>
        <div class="mb-3 mt-3">
          <label class="form-label">Instructions</label>
          <textarea type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,'instructions':event.target.value})}} value={recipe.instructions}></textarea>
        </div>
        <div class="mb-3 mt-3">
          <label class="form-label">Recipe Cuisine</label>
          <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,'recipe_cuisine':event.target.value})}} value={recipe.recipe_cuisine}></input>
        </div>
        <div class="mb-3 mt-3">
          <label class="form-label">Meal Type</label>
          <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,'meal_type':event.target.value})}} value={recipe.meal_type}></input>
        </div>
          <div class="mb-3 mt-3">
          <label class="form-label">Image:</label>
          <img src={recipe.image} height="100px" width="80px"></img>
          <input type="file" class="form-control mt-3" onChange={(event)=>{setrecipe({...recipe,'image':event.target.files[0]})}}></input>
        </div>
        <div class="mb-3 mt-4">
          <input type="submit" class="btn btn-outline-dark fw-bold"></input>
        </div>
        </form>
        </div>
      </div>
  )
}

export default Update