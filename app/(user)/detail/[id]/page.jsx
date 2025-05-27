"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import UserNavigation from '../../../components/UserNavigation'
import CalenderComponent from '../../../components/CalenderComponent'
import { bookingAction } from '../../../serverActions/bookingAction'
import { set } from 'date-fns'





const DynamicProduct = () => {
const [record,setRecord]= useState("")
const [selectedDates,setSelectedDates]= useState(null)
const params = useParams();
const {id}=params

console.log("dynamic CLientId",id)

const dynamicProductHandler = async()=>{
    const response = await fetch(`http://localhost:3000/api/admin/product/${id}`)
    const newData = await response.json()
    console.log("Dynamic Data",newData)
    setRecord(newData.data)
}

useEffect(()=>{
    dynamicProductHandler()
},[])

const bookingHandler = async()=>{

if(!selectedDates){
  alert("please select booking dates")
  return
}

  const bookingDetails ={record, selectedDates}
  try {
    const response = await bookingAction(bookingDetails)
    if(response.success){
      alert("Booking is successfull")
    }
  } catch (error) {
    
  }

}

const handleDateSelect= (dates)=>{
  setSelectedDates(dates)
  console.log("dates coming from calender component: ",dates)
}

  return (
    <div>
      <UserNavigation />
      <CalenderComponent onDatesSelect={handleDateSelect}/>
        <Link href="/">
        <p align="center">Go Back</p>
        </Link>
      {record? 
         (<div className="">
            <div className="singleSection">
            <div className="singleLeft">
              <div className="">
               <h2>{record.title}</h2>
              </div>
              <img src={record.image} alt={record.title} className="singleImage"/>
              </div>
              <div className="singleCenter">
               <div className="singlePrice">Rs.{record.price}</div>
               <p className="singleDesc">{record.desc}</p>
               <div className="">
                   {record.amen.map((item, i)=>{
                       return(
                           <div className="singleAmen"  key={i}>
                              <span>*</span> {item}
                           </div>
                       )
                   })}
               </div>
               <div className="offer">
               <span>*</span>
                  <button>  Discount {record.offer}</button>
               </div>
               <div className="singleBtn">
                   <button className="" onClick={bookingHandler}>Book Now</button>
               </div>
              </div>
            </div>

           </div>)
        :<h1 style={{position:'absolute', top:'50%', left:'50%'}}>    
        </h1>}
</div>
  )
}

export default DynamicProduct