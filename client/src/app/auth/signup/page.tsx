"use client";

import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ModeToggle } from "@/helper/darkmode";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from '@/components/ui/loading-button';
import { register } from "@/services/auth";
import UploadProfilePicture from "@/components/user/UploadProfilePicture";

// Define the form validation schema using Zod
const signUpFormSchema = z.object({
  name: z.string().nonempty({ message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  phone_number: z.string().nonempty({ message: "Phone number is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  role: z.string().optional(),
});

type ApiErrorResponse = {
  message: string;
};

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
      role: "user"
    }
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const payload = {
      ...data,
      role: 'user'
    };

    try {
      const response = await register(payload);
      console.log(response)
      toast({
        title: "Success!",
        description: "Account created successfully!",
        variant: "default",
      });
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        try {
          const errorDetails = JSON.parse(error.message);
          const message = Array.isArray(errorDetails.message) ? errorDetails.message.join(", ") : errorDetails.message;
          toast({
            title: "Error",
            description: message || 'Failed to create an account',
            variant: "destructive",
          });
        } catch (jsonError) {
          toast({
            title: "Error",
            description: 'Failed to create an account',
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: 'An unexpected error occurred',
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-full">
        <div className="self-start mb-16 mt-3 flex justify-between w-full">
          <Link href="/">
            <Button className="mx-3">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <div className="mx-3">
            <ModeToggle />
          </div>
        </div>
        <Card className="mx-auto max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="John Doe" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="john@example.com" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Password" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="+23057901383" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Medine Camp Des Masque" />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
         
         
                <div className="flex justify-center">
                  <LoadingButton type="submit" className="w-full" loading={false}>Create Account</LoadingButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
