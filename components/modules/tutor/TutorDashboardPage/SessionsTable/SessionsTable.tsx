import { Session } from "@/types/tutor";

interface Props {
  title: string;
  sessions: Session[];
}

export default function SessionsTable({ title, sessions }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Student</th>
            <th>Date</th>
            <th>Status</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{s.studentName}</td>
              <td>{new Date(s.date).toLocaleString()}</td>
              <td>{s.status}</td>
              <td>
                {s.review
                  ? `${s.review.rating}/5 - ${s.review.comment}`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
