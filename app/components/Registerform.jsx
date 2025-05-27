'use client'
import React, { useState } from 'react'
import { registerAction } from '../serverActions/registerAction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Registerform = () => {
    const[username,setusername]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const router = useRouter()

    const registerHandler =async(e)=>{
        e.preventDefault();

        const userRegisterDetails = {username,email,password}
        console.log(userRegisterDetails);

        try{

          const response= await registerAction(userRegisterDetails)
          if(response.success){
            // alert("Registeration is sucessfull")
             router.push("/login")   //It is not redirecting here don't know why 

          }
        }
        catch (error){
          console.log("The error is ",error)
        }
    }

  return (
    <div className='formContainer'>   
        <h2>Registerform</h2>
        <form onSubmit={registerHandler} className='formSection'> 
            <h3>Username</h3>
            <input type="text" name="username" onChange={(e)=>setusername(e.target.value)}></input>
            <h3>Email</h3>
            <input type="text" name="email" onChange={(e)=>setemail(e.target.value)}></input>
            <h3>Password</h3>
            <input type="text" name="password" onChange={(e)=>setpassword(e.target.value)}></input>
            <br/> <br/>
            <button type="submit">Submit</button>
        </form>
        <Link href="login">
        Aleardy Registered? Login
        </Link>
    </div>
  )

}

export default Registerform