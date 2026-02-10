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

  if (loading) return <p className="text-center mt-32">Loading...</p>;
  if (error || !tutor)
    return (
      <p className="text-center mt-32 text-red-500">
        {error || "Tutor not found"}
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <TutorHeader tutor={tutor} token={token} />
      <AvailabilityTable availability={tutor.availability ?? []} />
      <ReviewsSection />
    </div>
  );
}
