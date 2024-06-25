"use client"
import { ApiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { singnupSchemaValidation } from '@/schemas/signupSchema'
import { signinSchemaValidation } from '@/schemas/signinSchema';
import { signIn } from 'next-auth/react';


const SigninUser = () => {
  
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signinSchemaValidation>>({
    resolver: zodResolver(signinSchemaValidation),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

 
  const onSubmit = async (data: z.infer<typeof signinSchemaValidation>) => {
   const result =  await signIn("credentials",{
    redirect: false,
    identifier : data.identifier,
    password : data.password,
   })
   if(result?.error){
    toast({
      title: "Login failed",
      description: "Incorrect Username Or Password",
      variant: "destructive",
    })
   }
   if(result?.url){
    router.replace("/dashboard")
   }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">SignIn to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full'>
              SignIn
            </Button>
          </form>
        </Form>

      </div>
    </div>
  );
}

export default SigninUser