import {z} from "zod"

const userNameValidation = 
z.string()
.min(3,"username must be atleast 3 characters long")
.max(20 , "username limit exceeded")
.regex(/^[a-zA-Z0-9_]+$/ , "username must contain only alphabets , numbers and underscore");