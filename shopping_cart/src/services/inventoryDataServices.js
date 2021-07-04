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
    

   return  axios.delete(`localhost:8080/deleteItem/${id}`,config)  
      .then(res => {  
        console.log(res);  
       
      }).catch(function (error) {
          // handle error
           console.log(error);
         })  


    // return http.delete("/deleteItem/"+id,config) .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // return http.post("/getAllItems2",{
    //   params: {
    //     id: id
    //   }
    // },config)
  };




  const inventoryDataServices = {
    getAllItem,
    deleteItem,
  };
  
  export default inventoryDataServices;