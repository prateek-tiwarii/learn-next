import { promises } from "dns";
import mongoose from "mongoose";




type connectionObject = {
  isConnected ?: number;
}

const connection : connectionObject = {};

async function dbconnect() :Promise<void>{
  if(connection.isConnected){
    return;
  }

  try {

   const db =  await mongoose.connect(process.env.mongoDbUri ||  '' ,  {})

   connection.isConnected = db.connections[0].readyState;

   console.log("connected to db")
    
  } catch (error) {

    console.log(error)

    process.exit(1)
    
  }
} 

export default dbconnect;