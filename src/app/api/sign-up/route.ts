import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { use } from "react";

export async function POST(request :Request){
    await dbconnect();
    
    try {
        
         const {username , email , password} = await request.json()

         const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isverified : true
         })

         if(existingUserVerifiedByUsername){
                return Response.json({
                    sucess : false,
                    message : "User already exists" }
                ,
            {
                status : 400
            }
            )}

            const existingUserByEmail =  await UserModel.findOne({email})

            const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

            if(existingUserByEmail){
                true
            }

            else{
                const hashedPassword = await bcrypt.hash(password, 10);

                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);

                
            const newUser = new UserModel({
                 
                username , 
                email,
                password: hashedPassword , 
                verifycode , 
                verifycodeexpiry : expiryDate,
                isverified : false,
                isacceptingmessages : true,
                messages : [],

            })

            await newUser.save();
            }



   

    } catch (error) {
        console.error("Error connecting to database: ", error);

        return Response.json({
            sucess : false,
            message : "Error connecting to database"
        },
    {
        status : 500
    }
    )
    }
}