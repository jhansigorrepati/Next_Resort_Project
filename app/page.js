

import React from 'react'
import DBConnection from './utils/config/db'

import { auth } from './auth'
import { redirect } from 'next/navigation';
import UserNavigation from './components/UserNavigation'
import AdminPage from './admin/page'
import ProductCollection from './components/ProductCollection'

const Homepage = async() => {

  const session = await auth()
  await DBConnection()

  if(!session){
    redirect("/login")    //This line is about redirecting to login page if user does not login it makes home page not visible and only make visible when we login correctly
  }
  
  // console.log("user check",userName)

  console.log("role check",session.role)  
  console.log("username check",session.username)

  const userName= session.username;
  return (
    <div>
      
      {session.role === 'user' &&  (
        <>
        <UserNavigation userName = {userName}/>
        <h1>Welcome to Holiday Resort</h1>
        <ProductCollection />
        </>
      ) }
      {session.role === 'admin' &&
      <AdminPage /> 
    }

    </div>
  )
}

export default Homepage


// I stopped at server actions folder and i video 26 min