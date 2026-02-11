"use client";

import { authClient } from "@/lib/auth-client";
import StudentProfileForm from "./StudentProfileForm/StudentProfileForm";

export default function StudentProfilePage() {
  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;

  const loading = sessionQuery?.isPending || !session;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500 dark:text-red-400">Unauthorized access</p>
      </div>
    );
  }

  return <StudentProfileForm token={token} />;
}
