"use client";

import Link from "next/link";
import { useState } from "react";

type Role = "STUDENT" | "TUTOR";

export default function RegisterForm() {
  const [role, setRole] = useState<Role>("STUDENT");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role, //  only role
    };

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registered user:", data);
      // redirect / show success later
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Join SkillBridge 🎓
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Connect with expert tutors, learn anything
        </p>
      </div>

      {/* Role Switch */}
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6">
        <button
          type="button"
          onClick={() => setRole("STUDENT")}
          className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition
            ${
              role === "STUDENT"
                ? "bg-yellow-400 text-slate-900"
                : "text-slate-600 dark:text-slate-300"
            }`}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => setRole("TUTOR")}
          className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition
            ${
              role === "TUTOR"
                ? "bg-yellow-400 text-slate-900"
                : "text-slate-600 dark:text-slate-300"
            }`}
        >
          Tutor
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:ring-2 focus:ring-yellow-400"
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
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2.5 rounded-lg transition shadow-md disabled:opacity-60"
        >
          {loading ? "Creating account..." : `Register as ${role}`}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-yellow-500 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
