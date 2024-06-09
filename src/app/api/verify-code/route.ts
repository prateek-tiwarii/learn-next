import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import {z} from "zod";
import { userNameValidation } from "@/schemas/signupSchema";

export async function POST(request:Request){
   await dbconnect();
     
   try {


const {username , code} =  await request.json()


const decodedUsername = decodeURIComponent(username)

const user = await UserModel.findOne({username : decodedUsername})

if(!user){
    return Response.json({
        success:false,
        message:"User not found"
    },{
        status:404
    })

}

const isCodeValid =  user.verifycode === code
const isCodeNotExpired = new Date(user.verifycodeexpiry) > new Date()

if(isCodeValid && isCodeNotExpired){
    user.isverified = true
    await user.save()

    return Response.json({
        success:true,
        message:"User verified successfully"
    })
}

else if(!isCodeNotExpired){

    return Response.json({
        success:false,
        message:"Code is expired"
    },{
        status:400
    })

}

else{
    
        return Response.json({
            success:false,
            message:"Invalid code"
        },{
            status:400
        })
}

    
   } catch (error) {

    console.error("Errror in verifying the user", error );

    return  Response.json({
        success:false,
        message:"verification of user failed"
    },

    {
        status:500
    })
}

    
   }
