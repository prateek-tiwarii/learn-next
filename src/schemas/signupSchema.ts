import {z} from "zod"

 export const userNameValidation = 
z.string()
.min(3,"username must be atleast 3 characters long")
.max(20 , "username limit exceeded")
.regex(/^[a-zA-Z0-9_]+$/ , "username must contain only alphabets , numbers and underscore");


export const singnupSchemaValidation = z.object({

    username : userNameValidation,
    email: z.string().email({ message : "invalid email address"}),
    password: z.string().min(6,{message: "password must be atleast 6 characters long"}),
})
