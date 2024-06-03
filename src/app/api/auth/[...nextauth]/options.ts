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
                     
             if(isPasswordCorrect){
                   return user;
             }
                else{
                    throw new Error("Password is incorrect")
                }
                

              } catch (error : any) {

                     throw new Error(error)
                
              }

            }
        })
    ],

    callbacks:{
       
        async jwt({token , user}){

            if(user){
                token._id = user._id?.toString()
                token.isverified = user.isverified;
                token.isacceptingmessages = user.isacceptingmessages;
                token.username =  user.username;
                

            }
            return  token;
        },

        async session({session , token}){

            if(token){

                session.user._id = token._id
                session.user.isverified = token.isverified
                session.user.isacceptingmessages = token.isacceptingmessages
                session.user.username = token.username

            }
            return session;
        }
    },

    pages:{

        signIn : "/sign-in",
        
    },
    session:{
        strategy : "jwt",

    },

    secret: process.env.NEXT_AUTH_SECRET


}