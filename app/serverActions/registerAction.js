"use server"
import DBConnection from "../utils/config/db.js"
import UserModel from "../utils/models/User.js";

export async function registerAction(registerDetails) {
    await DBConnection();
    console.log("register Actions: ", registerDetails);

    //registerDetails are come from registerform handler function pls cehck it for uderstanding
    
    // This is to create a database in mongodb
    try {
        await UserModel.create({
            username:registerDetails.username,
            email:registerDetails.email,
            password:registerDetails.password
        })
        return{success:true}
    } catch (error) {
        console.log("The error is ",error)
    }
}