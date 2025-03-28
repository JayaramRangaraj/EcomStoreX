"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  userName: z.string().min(1, { message: "Username is required." }),
  email: z.string().min(1, { message: "email is required." }),
  password: z.string().min(1, { message: "password is required." }),
});

interface RegisterFormProps {
  toggleLoginForm: () => void;
}

export default function RegisterForm({ toggleLoginForm }: RegisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.userName || !values.email || !values.password)
      return alert("name , email and password are required")
    const name = values.userName;
    const email = values.email;
    const password = values.password;

    try {
      const response = await fetch("http://localhost:5000/account/login?signup=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Register Failed : ", data.error);
        return false;
      }
      console.log("Register Successfully")
    }
    catch (e)
    {
      console.error("Login error:", e);
      alert("An error occurred while registering in");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p
          className="text-sm cursor-pointer text-blue-500"
          onClick={toggleLoginForm}
        >
          Already have an account? Login
        </p>
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
