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
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/apiResponse'
import { set } from 'mongoose'


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
        const response =  await axios.get(`/api/check-username-unique?username=${debouncedUserName}`)
        setUsernameMessage(response.data.message)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        setUsernameMessage(axiosError.response?.data.message??"An error has occured")
      }
      finally{
        setIsCheckingUsername(false)
      }

    }
   
    checkUserNameUnique();
  
  },[debouncedUserName])

  const onSubmit = async(data : z.infer<typeof singnupSchemaValidation >)=>{
     setIsSubmiting(true)

     try {

      const response = await axios.post("/api/sign-up", data);

      toast({
        title : "success",
        description : response.data.message,
      })
      router.replace(`/verify/${username}`)
      setIsSubmiting(false)
      
     } catch (error) {
      console.error("error in signup of user ", error);

      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message ?? "An error has occured"

      toast({
        title : "sign-up failed",
        description : errorMessage,
        variant : "destructive"
      })

      setIsSubmiting(false)

     }
  }

  return (
    <div>

    </div>
  )
}

export default Page

