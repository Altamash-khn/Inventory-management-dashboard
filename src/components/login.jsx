import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export function Login() {

  const [show , setShow]= useState(true)

 const handleClick= ()=>{
  setShow(!show)
 }

  return (
    <div className="flex justify-center mt-40 ">
      <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter a email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <div className="flex justify-center items-center  ">
                <Input  id="password" type={show ? "password" : "text"} required placeholder="Enter a password"/>
                {show ?  <FaEyeSlash className="relative right-8" onClick={handleClick} /> :<FaEye onClick={handleClick} className="relative right-8"/>}
              
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p variant="outline" className="w-full text-gray-600  text-center">
          Don't have an account? <span className="text-black hover:underline cursor-pointer">Sign Up</span>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}
