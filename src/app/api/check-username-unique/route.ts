import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import {z} from "zod";
import { userNameValidation } from "@/schemas/signupSchema";
import { use } from "react";


const userNameQuerySchema =  z.object({

    username : userNameValidation
})

export async function GET (request: Request){
    
    await dbconnect();

    try {
     
        const {searchParams} = new URL(request.url)
        const querryParam = {
            username : searchParams.get("username")

        }

        //validate with zod

       const result = userNameQuerySchema.safeParse(querryParam)

       if( !result.success){
         const usernameError = result.error.format().username?._errors || []
       }



        
    } catch (error) {
        console.error("Errror in checkin username unique", error );

        return  Response.json({
            success:false,
            message:"Error in checkin username unique"
        },

        {
            status:500
        })
    }



}