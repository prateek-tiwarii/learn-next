import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { use } from 'react'
import { useForm } from 'react-hook-form';
import { singnupSchemaValidation } from '@/schemas/signupSchema'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyMessageSchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';

const VerifyAccount = () => {

    const router = useRouter();
    const params =  useParams<{username : string}>();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof verifyMessageSchema>>({
        resolver: zodResolver(verifyMessageSchema),
      });

      const onSubmit = async(data : z.infer<typeof verifyMessageSchema>) =>{

        try {
            const response =  await axios.post(`/api/verify/ `,{
                username : params.username,
                code : data.code
            });

            toast({
                title : "Success",
                description : response.data.message
            })

            router.replace(`/sign-in`);


        } catch (error) {

            console.error('Error during sign-up:', error);

             const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

            
        }

      }



  return (
    <div>VerifyAccount</div>
  )
}

export default VerifyAccount