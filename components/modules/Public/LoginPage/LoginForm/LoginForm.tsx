"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      setLoading(false);

      if (res.error) {
        toast.error(res.error.message || "Login failed");
        return;
      }

      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
        Log in to access your SkillBridge account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 py-2.5 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
