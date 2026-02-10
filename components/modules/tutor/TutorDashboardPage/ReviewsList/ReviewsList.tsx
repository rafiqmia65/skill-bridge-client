import { Review } from "@/types/tutor";

interface Props {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="border p-4 rounded">
              <p className="font-semibold">{r.studentName}</p>
              <p className="text-gray-500 text-sm">
                {new Date(r.date).toLocaleDateString()}
              </p>
              <p>Rating: {r.rating}/5</p>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
