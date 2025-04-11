import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addrecipedetails } from '../services/Apicall'

function Addreview(islogin) {

    const [review,setreview]=useState({'id':'','rating':'','comment':''})   

    const {search}=useLocation()        //
    console.log(search)

    const queryParams=new URLSearchParams(search)

    const id=queryParams.get('id')
    console.log(id)

    async function addreview(event){
        event.preventDefault()
        //console.log(review)
        const review1={...review,id:id}
        //console.log(review1)

          let res=await addrecipedetails(review1)
          //console.log(res)
          setreview(res)
    
        }


    
    return (
        <div>
            {islogin && <>
            
            
             <div class="container w-50 border border-1 shadow border-light p-5 mt-5">
                <h2 class="text-center text-dark mt-2 fw-bold">Add Review</h2>
            <form onSubmit={addreview}>
                <div class="mb-3">
                    <label class="form-label">Rating:</label>
                    <input type="number" class="form-control" max="5" min="1" placeholder='Enter your rating' onChange={(event)=>{setreview({...review,rating:event.target.value})}}></input>
                </div>
                <div class="mb-3">
                    <label class="form-label">Comments:</label>
                    <textarea class="form-control" placeholder='Enter your comments here' onChange={(event)=>{setreview({...review,comment:event.target.value})}}></textarea>
                </div>
                <div class="mb-3 mt-4">
                        <label class="form-label"></label>
                        <input type="submit" class="btn btn-outline-dark form-control"></input>
                </div>
            </form>

        </div>
        </>}
        {!islogin && 
        <>Please Login
        </>}
        </div>
    )
}

export default Addreview