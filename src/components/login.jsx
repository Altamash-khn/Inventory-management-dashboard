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
import { useNavigate } from "react-router-dom";

export function Login() {
const navigate = useNavigate();
  const [show , setShow]= useState(true)
  const [user , setUser] = useState({
    email: "",
    password: ""
  })
  
 const handleLogin = async (e) => {

  e.preventDefault();

  if (!user.email.trim() || !user.password.trim()) {
    alert("Username aur Password required hai");
    return;
  }

  try {
    const res = await fetch(
      "https://inventory-management-backened.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token",data.token)
      navigate("/home");

    } 
    else if (res.status === 404) {
      alert("User signup nahi hai, pehle signup karo");
      navigate("/signup");
    } 
    else {
      alert(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    alert("Server error, baad me try karo");
  }
};
    
  
  
const handleChange = (e)=>{
  setUser(prev => {
    return{
      ...prev,
      [e.target.name]: e.target.value
    }
  } )
  
}

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
                name='email'
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <div className="flex justify-center items-center  ">
                <Input  id="password"   value={user.password} name="password" type={show ? "password" : "text"} required placeholder="Enter a password"  onChange={handleChange}/>
                {show ?  <FaEyeSlash className="relative right-8" onClick={handleClick} /> :<FaEye onClick={handleClick} className="relative right-8"/>}
              
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleLogin}>
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