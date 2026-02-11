"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tutor } from "@/services/booking/booking.service";
import TutorHeader from "./TutorHeader/TutorHeader";
import AvailabilityTable from "./AvailabilityTable/AvailabilityTable";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import { tutorService } from "@/services/tutor/tutor.service";

interface Props {
  token: string | null;
}

export default function TutorProfileContainer({ token }: Props) {
  const { id } = useParams();
  const tutorId = id as string;

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutor = async () => {
      const { data, error } = await tutorService.getTutorById(tutorId);
      if (error) setError(error.message);
      else setTutor(data);
      setLoading(false);
    };

    if (tutorId) fetchTutor();
  }, [tutorId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500 dark:text-red-400">
          {error || "Tutor not found"}
        </p>
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden 
                 bg-linear-to-br from-yellow-50 via-white to-yellow-100 
                 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-8">
          <TutorHeader tutor={tutor} token={token} />
          <AvailabilityTable availability={tutor.availability ?? []} />
          <ReviewsSection />
        </div>
      </div>
    </section>
  );
}
