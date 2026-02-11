"use client";

import { authClient } from "@/lib/auth-client";
import TutorProfileContainer from "./TutorProfileContainer/TutorProfileContainer";

export default function TutorProfilePage() {
  const sessionQuery = authClient.useSession();
  const token = sessionQuery.data?.session?.token ?? null;

  if (sessionQuery.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <TutorProfileContainer token={token} />;
}
