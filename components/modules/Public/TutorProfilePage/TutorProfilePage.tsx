"use client";

import { authClient } from "@/lib/auth-client";
import TutorProfileContainer from "./TutorProfileContainer/TutorProfileContainer";

export default function TutorProfilePage() {
  const sessionQuery = authClient.useSession();
  const token = sessionQuery.data?.session?.token ?? null;

  if (sessionQuery.isPending) {
    return <p className="text-center mt-32">Loading session...</p>;
  }

  return <TutorProfileContainer token={token} />;
}
