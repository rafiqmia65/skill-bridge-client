"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);
    try {
      const { data, error } = await authService.login(payload);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      // Show success message
      setSuccess("Login successful! Redirecting...");
      console.log("Logged in user:", data);

      // Redirect to home page after short delay
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mx-auto mt-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Log in to access your SkillBridge account
        </p>
      </div>

      {/* Success / Error Messages */}
      {error && (
        <p className="mb-4 text-sm text-red-500 text-center font-medium">
          {error}
        </p>
      )}
      {success && (
        <p className="mb-4 text-sm text-green-500 text-center font-medium">
          {success}
        </p>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2.5 rounded-lg transition shadow-md disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-yellow-500 font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
