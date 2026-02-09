"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tutorService, Tutor } from "@/services/tutor/tutor.service";
import TutorHeader from "./TutorHeader/TutorHeader";
import AvailabilityTable from "./AvailabilityTable/AvailabilityTable";
import ReviewsSection from "./ReviewsSection/ReviewsSection";

export default function TutorProfilePage() {
  const params = useParams();
  const tutorId = params?.id as string;

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutor = async () => {
      setLoading(true);
      const { data, error } = await tutorService.getTutorById(tutorId);
      if (error) {
        setError(error.message);
        setTutor(null);
      } else {
        setTutor(data);
      }
      setLoading(false);
    };

    if (tutorId) fetchTutor();
  }, [tutorId]);

  if (loading)
    return (
      <p className="text-center mt-32 text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-32 text-red-500 font-medium">{error}</p>
    );
  if (!tutor) return null;

  return (
    <div className="container mx-auto px-4 py-16 space-y-10">
      <TutorHeader tutor={tutor} />
      <AvailabilityTable availability={tutor.availability ?? []} />
      <ReviewsSection />
    </div>
  );
}
