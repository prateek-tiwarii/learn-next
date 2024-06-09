import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import {z} from "zod";
import { userNameValidation } from "@/schemas/signupSchema";



const userNameQuerySchema =  z.object({

    username : userNameValidation
})

export async function GET (request: Request){

    if(request.method !== "GET"){
          return Response.json({
            success :false,
            message:"Invalid method"
          },{
            status:405
          })
    }
    
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

         return Response.json({
            success : false,
            message : "Invalid username",
         },
        {
            status:400
        })
       }

       const {username} = result.data

     const existingVerifiedUser = await UserModel.findOne({username , isverified :true})

     if(existingVerifiedUser){
         return Response.json({
             success : false,
             message : "Username already exists"
         },
         {
             status:400
         })
     }
      

        return Response.json({
            success:true,
            message:"Username is unique"
        })


        
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