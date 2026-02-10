// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  studentProfileService,
  StudentProfile,
} from "@/services/student/StudentProfileService";
import { bookingService, Booking } from "@/services/booking/booking.service";
import ProfileCard from "./ProfileCard/ProfileCard";
import BookingsTable from "./BookingsTable/BookingsTable";

const StudentOverviewPage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileData, bookingsData] = await Promise.all([
          studentProfileService.getProfile(token),
          bookingService.getMyBookings(token),
        ]);
        setProfile(profileData);
        setBookings(bookingsData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to load dashboard data");
        } else {
          toast.error("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!session) return <p>Please log in to view your dashboard.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {profile && <ProfileCard profile={profile} />}
          <div>
            <h2 className="text-2xl font-semibold mt-4 mb-2">My Bookings</h2>
            <BookingsTable bookings={bookings} />
          </div>
        </>
      )}
    </div>
  );
};

export default StudentOverviewPage;
