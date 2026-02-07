"use client";

import Link from "next/link";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { Role } from "@/types/auth";

export default function RegisterForm() {
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const roles: Role[] = [Role.STUDENT, Role.TUTOR];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role,
    };

    setLoading(true);

    const { data, error } = await authService.register(payload);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    if (data) {
      setSuccess(
        "Your account has been created successfully. You can now log in.",
      );
      // optional: form reset
      (e.target as HTMLFormElement).reset();
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
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition
              ${
                role === r
                  ? "bg-yellow-400 text-slate-900"
                  : "text-slate-600 dark:text-slate-300"
              }`}
          >
            {r === Role.STUDENT ? "Student" : "Tutor"}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          <p className="font-medium">Account created successfully 🎉</p>
          <p className="mt-1">
            You can now{" "}
            <Link
              href="/login"
              className="text-green-700 font-semibold underline"
            >
              login
            </Link>{" "}
            with your credentials.
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            minLength={6}
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2.5 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Creating account..." : `Register as ${role}`}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-yellow-500 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}
