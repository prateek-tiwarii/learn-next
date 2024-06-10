import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { User } from "next-auth";

export async function POST(request : Request){
    await dbconnect();

     const session = await getServerSession(authOptions)
       const user :User =  session?.user as User

       if(!session || !session.user){
          return Response.json({ 
                success:false,
                message:"Unauthorized"
            },{
                status:401
            })
       }

       const userId = user._id
       const {acceptMessages} = await request.json()

       try {

       const updatedUser =   await UserModel.findByIdAndUpdate(
        userId,
        {isacceptingmessages:acceptMessages},
        {new : true}
      )

         if(!updatedUser){
            return Response.json({ 
                success:false,
                message:"failed to update user status to accept messages"
            },{
                status:401
            })
         }

         else{
            return Response.json({ 
                success:true,
                message:"user status updated to accept messages"
            },{
                status:200
            })
         }
        
       } catch (error) {

        console.log("failed to change user status to accept messages")

        return Response.json({ 
            success:false,
            message:"faikled to update user status to accept messages"
        },{
            status:500
        })
        
       }
}

export async function GET(request : Request){
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

    const userId = user._id;

    const foundUser =  await UserModel.findById(userId);

    if(!foundUser){
        return Response.json({ 
            success:false,
            message:"User not found"
        },{
            status:404
        })
    }

    else{
        return Response.json({ 
            success:true,
            message:"user found",
            isAcceptingMessages:foundUser.isacceptingmessages
        },{
            status:200
        })
    }

    try {
        
    } catch (error) {

        console.log("failed to get the current status of user to accept messages")

        return Response.json({ 
            success:false,
            message:"unable to fetch user status to accept messages"
        },{
            status:404
        })
        
        
    }
}
