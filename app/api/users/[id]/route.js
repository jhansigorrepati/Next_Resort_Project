
//This is about getting indiviual data

import DBConnection from '@/app/utils/config/db';
import { NextResponse } from 'next/server';
import UserModel from '@/app/utils/models/User'; 
import BookingModel from '@/app/utils/models/Bookings';
export async function GET(request,{params}) {
    await DBConnection();
     
    const {id}= params

    console.log("Dynamic id",id)
 
    try {
        if(!id){
            return NextResponse.json({success:false, msg:'no user found'},{status:404})
        }
        const user = await UserModel.findById(id).populate('bookings')
        return NextResponse.json({success:true, data:user})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, msg:'id is missing'})
    }

}