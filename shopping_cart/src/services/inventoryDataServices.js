import http from './httpcommon'
import axios from 'axios'
const getAllItem = () => {
    const config={
      headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        Authorization:'Bearer '+localStorage.getItem("token")
      }
    }
    return http.get("/getAllItems",config);
  };

  const deleteItem = (id) => {
    const config={
      headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        Authorization:'Bearer '+localStorage.getItem("token")
      }
    }
    
    fetch('http://localhost:8080/deleteItem/'+id, { 
      method: 'delete', 
      headers: new Headers({
        'Authorization': 'Bearer '+localStorage.getItem("token"), 
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then((response) =>{ 
      console.log("asdasdasdasd")
      console.log(response.json())
    
    });
    //return http.delete("/deleteItem",config);
  //  return  axios.delete(`localhost:8080/deleteItem/`+id,config)  
  //     .then(res => {  
  //       console.log(res);  
  //     }).catch(function (error) {
  //          console.log(error);
  //        })  
    
   };

   const updateItem = (data) => {

    return fetch('http://localhost:8080/updateItems/', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem("token"),
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
      {
          "id": data.id,
                "title": data.title,
                "category":data.category,
                "description":data.description,
                "image":data.image,
                "price":data.price
      
      }
      )
    }).then(res => res.json());
    
  };



  const inventoryDataServices = {
    getAllItem,
    deleteItem,
    updateItem,
  };
  
  export default inventoryDataServices;