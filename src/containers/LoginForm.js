import React, { useEffect, useCallback, useMemo ,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/actions/productsActions";
import { useForm } from "react-hook-form";
import { useHistory} from "react-router-dom";
import axios from "axios";
import "../css/style.css";
import Spinner from './Spinner'
function LoginForm() {
  const[message,setMessage]=useState(false)
  const[wait,setWait]=useState(false)
  let history = useHistory();
  const url="http://localhost:8080/"
    const loginUser=(username,password)=>{
      setMessage(false);
      setWait(true);
      axios.post(url+'api/authenticate', {
        "username": username,
        "password": password
      })
      .then(function (response) {
        setWait(false);
        localStorage.setItem("token",response.data.jwt);
        console.log(response);
        history.push(`/ProductListing`);
      })
      .catch(function (error) {
        setWait(false);
        setMessage(true);
        console.log(error);
      });
    }


    const products = useSelector((state) => state);
    const dispatch = useDispatch();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data) => {
        loginUser(data.email,data.Password);
        // alert(JSON.stringify(data));
        // dispatch(setLogin("SUCCESS"));

      }; // your form submit function which will invoke after successful validation
    
    return (
      <>
     {wait ? <Spinner />: ""}
     
        <div style={{ background: "#0e101c"}}>
          
            {
              message && <div className="isa_warning">
              <i className="fa fa-warning"></i>
              UserName or password is wrong.
               </div>
            }
            
        <form onSubmit={handleSubmit(onSubmit)} style={{height: "500px"}}>
        <label>Email</label>
        <input
          {...register("email", {
            required: true,
            maxLength: 20,
            pattern: re
          })}
        />
        {errors?.email?.type === "required" && <p>This field is required</p>}
        {errors?.firstName?.type === "maxLength" && (
          <p>Email cannot exceed 20 characters</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p>Plese provide Proper email id</p>
        )}
        <label>Password</label>
        <input {...register("Password",{
               required: true,
        })} type="password" />
        {errors?.Password?.type === "required" && <p>This field is required</p>}
        <input type="submit" />
      </form>
      </div>
      </>
    )
}

export default LoginForm
