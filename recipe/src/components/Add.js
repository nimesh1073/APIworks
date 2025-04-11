import React, { useState } from "react";
import { data } from "react-router-dom";
import { addrecipedetails } from "../services/Apicall";

function Add(){
    const [recipe,setrecipe]=useState({recipe_name:'',recipe_ingredients:'',instructions:'',recipe_cuisine:'',meal_type:'',image:''})
    
    async function addrecipe(event){
        event.preventDefault()
       // console.log(recipe)
        let res=await addrecipedetails(recipe)
        console.log(res)
    }
    
    return(
        <div>
            <div class="container w-50 border border-1 shadow border-light p-5 mt-5">
                <h2 class="text-center text-dark mt-2 fw-bold">Add Recipe</h2>
                <form onSubmit={addrecipe}>
                    <div class="mb-3">
                        <label class="form-label">Recipe Name</label>
                        <input type="text" class="form-control" onChange={(event)=>(setrecipe({...recipe,recipe_name:event.target.value}))} placeholder="Enter Recipe Name"></input>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Recipe Ingredients</label>
                        <input type="text" class="form-control" onChange={(event)=>(setrecipe({...recipe,recipe_ingredients:event.target.value}))} placeholder="Enter Recipe Name"></input>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Instructions</label>
                        <textarea type="text" class="form-control" onChange={(event)=>(setrecipe({...recipe,instructionspe_name:event.target.value}))} placeholder="How to make recipe"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Meal Type</label>
                        <input type="text" class="form-control" onChange={(event)=>(setrecipe({...recipe,meal_type:event.target.value}))} placeholder="Enter Meal Type"></input>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Type of Cuisine</label>
                        <input type="text" class="form-control" onChange={(event)=>(setrecipe({...recipe,recipe_cuisine:event.target.value}))} placeholder="Enter Cuisine"></input>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Upload image</label>
                        <input type="file" class="form-control" onChange={(event)=>{setrecipe({recipe,image:event.target.files[0]})}}></input>
                    </div>
                    <div class="mb-3 mt-4">
                        <label class="form-label"></label>
                        <input type="submit" class="btn btn-outline-dark form-control"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add