"use client"
import { useDebounceValue } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useState } from "react"

const Page = () => {

  const [username , setUsername] = useState("")
  const [usernameMessage ,  setUsernameMessage] = useState("")
  const [isSubmiting , setIsSubmiting] = useState(false);
  const [ isCheckingUsername , setIsCheckingUsername] = useState(false)

  return (
    <div>Page</div>
  )
}

export default Page

