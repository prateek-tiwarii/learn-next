"use client"

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react"
import { Messages } from "@/models/user";
import { useSession } from "next-auth/react";

const Dashboard = () => {

  const[messages , setMessages] = useState<Messages[]>([]);
  const[loading , setIsLoading] = useState(false);
  const [isSwitchLoading , setIsSwitchLoading] = useState(false);
  const {toast} = useToast();

  const handelDeleteMessage = (messageID :string) =>{
     
     setMessages(messages.filter((message) => message._id !== messageID))
  }

  const {data:session} =useSession();

  return (
    <div>
        dashboard
    </div>
  )
}

export default Dashboard