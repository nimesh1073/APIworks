import axios from "axios";
import { data } from "react-router-dom";

// axios.methodname(url,data,headers,params)

export async function getallrecipe(){
    return await axios.get('http://127.0.0.1:8000/recipe/')
}

export async function getrecipedetail(id) {
    console.log('hello')
    return await axios.get(`http://127.0.0.1:8000/recipe/${id}`)
}
export async function deleterecipe(id) {
    console.log(id)
    return await axios.delete(`http://127.0.0.1:8000/recipe/${id}`)
}
export async function addrecipedetails(data) {
    console.log(data)
    let h={"content-type":"multipart/form-data"}
    return await axios.post("http://127.0.0.1:8000/recipe/",data,{headers:h})
    
}
export async function editrecipedetail(data,id)
 { 
   let h={'Content-Type':'multipart/form-data'}
    return await  axios.put(`http://127.0.0.1:8000/recipe/${id}/`,data,{headers:h})
 }

export async function searchrecipe(w) {
    let p={'search':w}
    return await axios.get("http://127.0.0.1:8000/search",{params:p})
}
export async function allreviews(id) {
    console.log(id)
    return await axios.get(`http://127.0.0.1:8000/getreview/${id}`)
}
export async function addrecipereview(data) {
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    return await axios.post('http://127.0.0.1:8000/getreview',data,{'headers':h})
}