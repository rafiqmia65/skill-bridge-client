"use client";

import { useEffect, useState } from "react";
import Filters from "./Filters/Filters";
import TutorsList from "./TutorsList/TutorsList";
import Pagination from "./Pagination/Pagination";
import { tutorService, Tutor } from "@/services/tutor/tutor.service";

interface Meta {
  total: number;
  page: number;
  totalPages: number;
}

export default function TutorsSection() {
  const [filters, setFilters] = useState({
    page: "1",
    limit: "12",
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const { data } = await tutorService.getTutors(filters);
        setTutors(data?.tutors ?? []);
        setMeta(data?.meta ?? { total: 0, page: 1, totalPages: 1 });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: "1" }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page: page.toString() }));
  };

  return (
    <section
      className="relative overflow-hidden 
                 bg-linear-to-br from-yellow-50 via-white to-yellow-100 
                 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-5">
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 animate-pulse"
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-1" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4" />
                    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Results count */}
                {meta.total > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {meta.total} tutor{meta.total !== 1 ? "s" : ""} found
                  </p>
                )}
                <TutorsList tutors={tutors} />
                <Pagination
                  page={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
