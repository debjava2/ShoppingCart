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




  const inventoryDataServices = {
    getAllItem,
    deleteItem,
  };
  
  export default inventoryDataServices;