"use client";

import { authClient } from "@/lib/auth-client";
import TutorProfileForm from "./TutorProfileForm/TutorProfileForm";

export default function TutorProfilePage() {
  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;

  // loading state
  const loading = sessionQuery?.isPending || !session;

  if (loading) {
    return (
      <p className="text-gray-500 text-center mt-20">Loading session...</p>
    );
  }

  if (!token) {
    return (
      <p className="text-red-500 text-center mt-20">Unauthorized access</p>
    );
  }

  return <TutorProfileForm token={token} />;
}
