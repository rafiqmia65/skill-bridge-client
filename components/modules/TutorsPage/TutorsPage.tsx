import TutorsList from "@/components/modules/TutorsPage/TutorsList";
import { tutorService } from "@/services/tutor.service";
import TutorsBanner from "./TutorsBanner/TutorsBanner";

interface PageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function TutorsPage({ searchParams }: PageProps) {
  // Build filters from query params
  const filters: Record<string, string> = {};
  if (searchParams?.search) filters.search = searchParams.search;
  if (searchParams?.category) filters.category = searchParams.category;
  if (searchParams?.minPrice) filters.minPrice = searchParams.minPrice;
  if (searchParams?.maxPrice) filters.maxPrice = searchParams.maxPrice;
  if (searchParams?.rating) filters.rating = searchParams.rating;
  filters.page = searchParams?.page || "1";
  filters.limit = "12";

  // Fetch tutors
  const { data, error } = await tutorService.getTutors(filters);
  const tutors = data?.tutors || [];
  const meta = data?.meta || {};

  return (
    <main>
      {/* Banner Section */}
      <TutorsBanner />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          All Tutors
        </h2>

        {/* Tutors List */}
        <TutorsList tutors={tutors} meta={meta} />

        {/* TODO: Pagination component */}
      </section>
    </main>
  );
}
