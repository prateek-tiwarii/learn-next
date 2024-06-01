import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbconnect from "@/lib/dbConnect"
import UserModel from "@/models/user"

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id: "credentials",
            name : "credentials",
            credentials :{
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials : any): Promise<any>{
               
              await dbconnect();

              try {

           const user = await UserModel.findOne({
                    $or: [
                        { email: credentials.identifier.email },
                        { username: credentials.identifier.username }
                    ]
                })
                

                if (!user) {
                    throw new Error("No user found")
                }

                if(!user.isverified){
                    throw new Error("User not verified")
                }

             const isPasswordCorrect  = await bcrypt.compare(credentials.password, user.password)
                     
             if(!isPasswordCorrect){
                    throw new Error("Password is incorrect")
             }

                return { email: user.email, username: user.username, id: user._id }

              } catch (error : any) {

                     throw new Error(error)
                
              }

            }
        })
    ]
}