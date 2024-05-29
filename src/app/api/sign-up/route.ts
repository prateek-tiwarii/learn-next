import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request :Request){
    await dbconnect();
    
    try {
        
         const {username , email , password} = await request.json()
   

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