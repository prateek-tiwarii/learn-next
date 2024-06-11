import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { User } from "next-auth";
import mongoose from "mongoose";
import { Messages } from "@/models/user";


export async function POST(request:Request){
    await dbconnect();
 
    const {username, content} = await request.json()  

    try {
      const user =  await UserModel.findOne({username})

      if(!user){
        return Response.json({
            success:false,
            message:"User not found"
        },{
            status:404
        })
      }

      if(!user.isacceptingmessages){

        return Response.json({
            success:false,
            message:"not accepting messages"
        },{
            status:400
        })

      }



      const NewMessage ={
        content,
        createdAt:new Date()
      }

      user.messages.push(NewMessage as Messages);
      await user.save();


        return Response.json({
            success:true,
            message:"Message sent successfully"
        },{
            status:200
        })

    } catch (error) {

        return Response.json({
            success:false,
            message:"An error occurred"
        },{
            status:500
        })
        
    }
   
     

}