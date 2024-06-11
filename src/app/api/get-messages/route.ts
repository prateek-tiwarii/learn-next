import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request){
    await dbconnect();

    const session = await getServerSession(authOptions)
    const user :User = session?.user as User

    if(!session || !session.user){
       return Response.json({ 
             success:false,
             message:"Unauthorized"
         },{
             status:401
         })
    }

    const userId = new mongoose.Types.ObjectId(user.id)

    try {
        
        const user = await UserModel.aggregate([
            {$match:{_id:userId}},
            {$unwind:"$messages"},
            {$sort:{"messages.createdAt":-1}},
            {$group:{_id:"$_id",messages:{$push:"$messages"}}}
        ])

        if(!user || user.length === 0){

            return Response.json({ 
                success:false,
                message:"Unauthorized"
            },{
                status:401
            })

        }


        return Response.json({ 
            success:true,
            message: user[0].messages
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