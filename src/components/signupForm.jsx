import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    try {
      const res = await fetch(
        "https://inventory-management-backened-1.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);

        alert("Signup Successful ✅");
        navigate("/home");
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
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
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">

            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                {...register("name", { required: "Name is required" ,})}
                type="text"
                placeholder="Enter your name"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                type="email"
                placeholder="Enter your email"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  {...register("password", {
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters",
                    },
                  })}
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
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                {...register("confirmPassword", {
                  required: "Confirm password required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Re-enter password"
                className="h-11"
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
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
