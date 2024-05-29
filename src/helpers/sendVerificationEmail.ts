import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/verificationEmial";

import { ApiResponse } from "@/types/apiResponse";


export async function sendVerificationEmail(
    username: string,
    password: string,
    verifycode: string
): Promise<ApiResponse>{
   
   try {
    
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject: 'verification satus',
        react: VerificationEmail({ username ,  otp: verifycode}),
      });


    return{sucess:true , message:"Email sent successfully"}

   

   } catch (emailError) {

    console.error("Error sending email: ", emailError);
    return {sucess:false , message:"Error sending email"};
   }

}

