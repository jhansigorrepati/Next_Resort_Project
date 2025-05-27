"use client"

import React, { useState } from 'react'
import { loginAction } from '../serverActions/loginAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const UserLogin = () => {
     const[email,setemail]=useState("");
     const[password,setpassword]=useState("");
     const[error,setError]=useState("");

     const router = useRouter()

     const loginHandler = async(e)=>{
      e.preventDefault();

      const loginDetails= {email, password}
      console.log(loginDetails)

      try {
        const response=  await loginAction(loginDetails)
        if(response.success){
              router.push("/") 
        }else{
          setError(response.message || "Login failed")
        }
      } 
      catch (error) {
        setError(error.message)
        
    }
  }

  return (
    <div className='formContainer'>
        <h2>Loginform</h2>
        <form onSubmit={loginHandler} className='formSection'> 
          {error && <p style={{color:'red'}}>{error}</p>}
            <h3>Email</h3>
            <input type="text" name="email" onChange={(e)=>setemail(e.target.value)}></input>
            <h3>Password</h3>
            <input type="text" name="password" onChange={(e)=>setpassword(e.target.value)}></input>
            <br/> <br/>
            <button type="submit">Login</button>
        </form>
        <Link href="register">
          If not registerd? Register
        </Link>
    </div>
  )
}

export default UserLogin