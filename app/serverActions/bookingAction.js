
"use server"

import { auth } from "../auth";
import DBConnection from "../utils/config/db"
import BookingModel from "../utils/models/Bookings";
import UserModel from "../utils/models/User";

export async function bookingAction(bookingDetails) {
    
    const session = await auth()

    console.log("Email check: ",session.email)


    await DBConnection();
    console.log("server bookingdetails",bookingDetails)

    //to get user id by user email 

    const user = await UserModel.findOne({email:session.email})

    try {
        if(!user){
            return {success:false, message:"user not found"}
        }
    
        const userId = user._id.toString()
    
        //This code is to send data to our model in general we do that in serverAction
    
        const userBookingDetails = await BookingModel.create({
            startDate: bookingDetails.selectedDates.startDate,
            endDate: bookingDetails.selectedDates.endDate,
            productName: bookingDetails.record.title,
            price : bookingDetails.record.price,
            offer: bookingDetails.record.offer,
            image: bookingDetails.record.image,
        })
    
        await UserModel.findByIdAndUpdate(
            userId,
            {$push:{bookings: userBookingDetails._id}},
            {new:true}
        )
         return {success:true}
    } catch (error) {
        console.log("Error is", error)
        return {success:false, message:"failed creating booking"}
        
    }

}