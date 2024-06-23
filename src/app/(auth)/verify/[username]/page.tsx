"use client"

import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import React, { use } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyMessageSchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';
import { FormItem, FormLabel, FormMessage , Form, FormField} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const VerifyAccount = () => {

    const router = useRouter();
    const params =  useParams<{username : string}>();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof verifyMessageSchema>>({
        resolver: zodResolver(verifyMessageSchema),
      });

      const onSubmit = async(data : z.infer<typeof verifyMessageSchema>) =>{

        try {
            const response =  await axios.post(`/api/verify-code/ `,{
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
    <div>

<div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
    </div>
  )
}

export default VerifyAccount