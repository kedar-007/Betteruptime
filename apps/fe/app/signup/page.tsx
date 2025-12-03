"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import request from 'supertest';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   try {
      const {data,status} = await axios.post(`${BACKEND_URL}/signup`,{
        username,
        password
      },{
        timeout:12000
      })

      console.log("THe Signup data",data);
      //checking the request response

      if(status !== 201 || !data.token){
        throw new Error("Inavalid Credentials")
      }

      const token = data.token;
      localStorage.setItem("auth_token",token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/dashboard")

   } catch (error:any) {
    if(error.response){
      const msg = error.response.data?.message ?? "Signup Failed ,Try again";
      alert(msg);
    }
    else if(error.request){
      alert("Unable to reach server ,Check connectivity");
    }
    else{
      alert("Unexpected error during signup")
    }
   } finally{
    setLoading(false);
   }
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-green-50 to-white">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Create your account
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Start monitoring your websites and get instant alerts when downtime occurs.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <Input placeholder="Enter username" onChange={(e) =>{
                setUsername(e.target.value);
              }}required />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <Input type="password" placeholder="••••••••"  onChange={(e) =>{
                setPassword(e.target.value);
              }}required />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-green-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
