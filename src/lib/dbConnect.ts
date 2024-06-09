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

   const db =  await mongoose.connect("mongodb+srv://tiwariprateek1976:yBA39VPL47jORApL@cluster0.nnm0doi.mongodb.net/")

   connection.isConnected = db.connections[0].readyState;

   console.log("connected to db")
    
  } catch (error) {

    console.log(error)

    process.exit(1)
    
  }
} 

export default dbconnect;