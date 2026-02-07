"use client";

import { useEffect, useState } from "react";
import Filters from "./Filters/Filters";
import TutorsList from "./TutorsList/TutorsList";
import Pagination from "./Pagination/Pagination";
import { tutorService, Tutor } from "@/services/tutor.service";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function TutorsSection() {
  const [filters, setFilters] = useState<Record<string, string>>({
    page: "1",
    limit: "12",
  });
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const { data } = await tutorService.getTutors(filters);
        setTutors(data?.tutors ?? []);
        setMeta(data?.meta ?? { total: 0, page: 1, limit: 12, totalPages: 1 });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page: page.toString() });
  };

  return (
    <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left Filters */}
      <Filters
        onFilterChange={(f) => setFilters({ ...filters, ...f, page: "1" })}
      />

      {/* Right Tutors List */}
      <div className="md:col-span-3">
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        ) : (
          <>
            <TutorsList tutors={tutors} meta={meta} />
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
