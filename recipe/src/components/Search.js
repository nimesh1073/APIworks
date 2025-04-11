import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchrecipe } from '../services/Apicall'


function Search() { 
    const {search}=useLocation()
    // console.log(search)

    const queryParams=new URLSearchParams(search)
    const w=queryParams.get('word')
    console.log(w)
    const[recipe,setrecipe]=useState([])


    async function searchrecipedetails() 
    {
        console.log("hello")
        let res=await searchrecipe(w)
        setrecipe(res.data)
    }

    useEffect(()=>{searchrecipedetails()},[])


    return (
        <div>
           <div>
          <div class="container mt-3  bg-secondary text-light p-3">
            {Array.isArray(recipe)? 
            <table class="table table-bordered text-light">
            <thead>
                <tr>
                <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Ingredients</th>
                  <th scope="col">instructions</th>
                  <th scope='col'>Cuisine</th>
                  <th scope='col'>Meal Type</th>
               
                </tr>
    
              </thead>
              <tbody>
            {recipe.map((i)=>           <tr>
                  <td><img src={i.image} height="100px" width="150px"></img></td>
                  <td>{i.recipe_name}</td>
                  <td>{i.recipe_ingredients}</td>
                  <td>{i.instructions}</td>
                  <td>{i.recipe_cuisine}</td>
                  <td>{i.meal_type}</td>
                              </tr>)}
             
              </tbody>
            </table>:<h2>NO results found</h2>}
           
          </div>
        </div>
        </div>
      )
    }



export default Search