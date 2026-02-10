"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { tutorService } from "@/services/tutor/tutor.service";
import { TutorDashboardData } from "@/types/tutor";

import ProfileCard from "./ProfileCard/ProfileCard";
import StatsCards from "./StatsCards/StatsCards";
import ReviewsList from "./ReviewsList/ReviewsList";
import SessionsTable from "./SessionsTable/SessionsTable";

export default function TutorDashboardPage() {
  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;

  const [dashboard, setDashboard] = useState<TutorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchDashboard = async () => {
      try {
        const data = await tutorService.getDashboard(token);
        setDashboard(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (sessionQuery.isPending || loading)
    return <p className="text-gray-500 text-center mt-20">Loading...</p>;

  if (!token)
    return (
      <p className="text-red-500 text-center mt-20">Unauthorized access</p>
    );

  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  if (!dashboard)
    return <p className="text-gray-500 text-center mt-20">No dashboard data</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Profile + Availability */}
      <ProfileCard profile={dashboard.profile} />

      {/* Stats */}
      <StatsCards stats={dashboard.stats} />

      {/* Upcoming Sessions */}
      {dashboard.upcomingSessions.length > 0 && (
        <SessionsTable
          title="Upcoming Sessions"
          sessions={dashboard.upcomingSessions}
        />
      )}

      {/* Recent Sessions */}
      {dashboard.recentSessions.length > 0 && (
        <SessionsTable
          title="Recent Sessions"
          sessions={dashboard.recentSessions}
        />
      )}

      {/* Reviews */}
      {dashboard.reviews.length > 0 && (
        <ReviewsList reviews={dashboard.reviews} />
      )}
    </div>
  );
}
