import {z} from "zod"

export const verifyMessageSchema = z.object({
    code : z.string()
    .length(6,{message:"cant be less than 6 characters"})
   
})
 