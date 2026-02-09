import type { Booking } from "@/types/admin";

interface Props {
  bookings: Booking[];
}

export default function RecentBookings({ bookings }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold mb-4">Recent Bookings</h3>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left py-2">Student</th>
            <th className="text-left py-2">Tutor</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b last:border-none">
              {/* optional chaining + fallback */}
              <td className="py-2">{booking.student?.name || "N/A"}</td>
              <td className="py-2">
                {booking.tutorProfile?.user?.name || "N/A"}
              </td>
              <td className="py-2">{booking.status || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
