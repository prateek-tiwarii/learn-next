import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { User } from "next-auth";

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

    const userId = user._id;


}