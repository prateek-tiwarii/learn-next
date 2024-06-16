"use client"
import { useDebounceValue } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { singnupSchemaValidation } from '@/schemas/signupSchema'
import axios from "axios"


const Page = () => {

  const [username , setUsername] = useState("")
  const [usernameMessage ,  setUsernameMessage] = useState("")
  const [isSubmiting , setIsSubmiting] = useState(false);
  const [ isCheckingUsername , setIsCheckingUsername] = useState(false)
  const { toast } = useToast()
   const router = useRouter()
  const debouncedUserName  = useDebounceValue(username, 500)

  const form = useForm ({
    resolver : zodResolver(singnupSchemaValidation),
    defaultValues : {
      username : "",
      email : "",
      password : ""
    }
  })

  useEffect(()=>{
    const checkUserNameUnique = async() =>{
     

      if(debouncedUserName){
        setIsCheckingUsername(true)
        setUsernameMessage("")
      }

      try {
        await axios.get(`/api/check-username-unique`)
      } catch (error) {
        
      }

    }
   
  
  },[debouncedUserName])

  return (
    <div>

    </div>
  )
}

export default Page

