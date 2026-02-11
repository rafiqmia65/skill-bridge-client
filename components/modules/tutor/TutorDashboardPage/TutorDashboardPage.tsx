"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { tutorService } from "@/services/tutor/tutor.service";
import { TutorDashboardData } from "@/types/tutor";

import ProfileCard from "./ProfileCard/ProfileCard";
import StatsCards from "./StatsCards/StatsCards";
import ReviewsList from "./ReviewsList/ReviewsList";
import SessionsTable from "./SessionsTable/SessionsTable";
import { FiUser, FiCalendar, FiStar } from "react-icons/fi";

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

  if (sessionQuery.isPending || loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 h-24"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-red-500 dark:text-red-400">Unauthorized access</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">No dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiUser className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Tutor Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Here&apos;s your teaching overview
          </p>
        </div>
      </div>

      {/* Profile + Stats */}
      <ProfileCard profile={dashboard.profile} />
      <StatsCards stats={dashboard.stats} />

      {/* Upcoming Sessions */}
      {dashboard.upcomingSessions.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <FiCalendar
                className="text-gray-500 dark:text-gray-400"
                size={16}
              />
              <h2 className="font-medium text-gray-900 dark:text-white">
                Upcoming Sessions
              </h2>
            </div>
          </div>
          <div className="p-4">
            <SessionsTable sessions={dashboard.upcomingSessions} />
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      {dashboard.recentSessions.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <FiCalendar
                className="text-gray-500 dark:text-gray-400"
                size={16}
              />
              <h2 className="font-medium text-gray-900 dark:text-white">
                Recent Sessions
              </h2>
            </div>
          </div>
          <div className="p-4">
            <SessionsTable sessions={dashboard.recentSessions} />
          </div>
        </div>
      )}

      {/* Reviews */}
      {dashboard.reviews.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <FiStar className="text-gray-500 dark:text-gray-400" size={16} />
              <h2 className="font-medium text-gray-900 dark:text-white">
                Recent Reviews
              </h2>
            </div>
          </div>
          <div className="p-4">
            <ReviewsList reviews={dashboard.reviews} />
          </div>
        </div>
      )}
    </div>
  );
}
