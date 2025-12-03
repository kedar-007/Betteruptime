"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //Handle api call
    const {data,status} = await axios.post(`${BACKEND_URL}/signin`,{
        username,
        password
    },{
      timeout:12000
    })

    if(status !== 200|| !data?.token ){
      throw new Error("Invalid username")
    }

    const token = data.token;

    localStorage.setItem("auth_token",token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    window.dispatchEvent(new Event("auth-changed"));
    console.info("User authenticated Successfully");

    // Navigate to the dashboard
    router.push("/dashboard")
    setLoading(false)

    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-green-50 to-white">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Welcome back
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Sign in and continue monitoring your websites effortlessly.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Sign In</h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <Input placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <Input type="password" placeholder="••••••••"  onChange={(e) => setPassword(e.target.value)}required />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
