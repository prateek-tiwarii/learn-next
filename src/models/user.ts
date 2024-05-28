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
    isverified : boolean;
    isacceptingmessages : boolean;
    messages : Messages[];
    
  }

  const userSchema : Schema<User> = new Schema({ 

    username : {type:String , required:true , trim:true , unique:true ,},
    email: {type:String , required:true , unique:true , match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']},
    password: {type:String , required:[true , "password is required" ]},
    verifycode : {type:String , required:true},
    verifycodeexpiry : {type:Date , required:true},
    isverified : {type:Boolean , required:true , default:false},
    isacceptingmessages : {type:Boolean , required:true , default:true},
    messages : [MessageSchema]
    
  });

  const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",userSchema)

  export default UserModel;

