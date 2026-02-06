"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex justify-center gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg border ${
            p === page
              ? "bg-yellow-400 text-white border-yellow-400"
              : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
