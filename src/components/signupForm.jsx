import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Signup() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.password.trim() ||
      !user.confirmPassword.trim()
    ) {
      alert("Sab fields required hai");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Password match nahi kar raha");
      return;
    }

    try {
      const res = await fetch(
        "https://inventory-management-backened.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
      
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);

        alert("Signup Successful ✅");
        navigate("/home");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error, baad me try karo");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <Card className="w-[550px] max-w-md rounded-2xl shadow-2xl border border-slate-200">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Create your account
          </CardTitle>
          <CardDescription className="text-slate-500">
            Start your journey with us today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
          
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                value={user.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="h-11"
              />
            </div>

           
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                value={user.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="h-11"
              />
            </div>

           
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type={show ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Re-enter password"
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-base font-medium bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="text-xs text-slate-400">
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
