import mongoose from "mongoose";
import { Schema , Document} from "mongoose";



export interface Messages extends Document {
  content: string;
  createdAt: Date;
}


const MessageSchema : Schema<Messages> = new Schema({
 
    content: {type:String , required:true},
    createdAt: {type:Date ,required :true , default:Date.now}

})


export interface User extends Document {
    username : string;
    email: string;
    password: string;
    verifycode : string;
    verifycodeexpiry : Date;
    isacceptingmessages : boolean;
    messages : Messages[];
    
  }

  const userSchema : Schema<User> = new Schema({ 

    username : {type:String , required:true , trim:true , unique:true ,},
    email: {type:String , required:true , unique:true},
    password: {type:String , required:true},
    verifycode : {type:String , required:true},
    verifycodeexpiry : {type:Date , required:true},
    isacceptingmessages : {type:Boolean , required:true , default:true},
    messages : [MessageSchema]
  });