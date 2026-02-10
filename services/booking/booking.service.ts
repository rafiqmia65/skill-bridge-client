export interface User {
  id: string;
  name: string;
  email?: string;
  image?: string | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface TutorAvailability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Tutor {
  id: string; 
  user: User;
  bio?: string;
  pricePerHr?: number;
  rating: number;
  availability?: TutorAvailability[];
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  date: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  tutorProfileId?: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const bookingService = {
  createBooking: async (
    token: string,
    tutorProfileId: string,
    date: string,
  ): Promise<Booking> => {
    const body = { tutorProfileId, date };

    // 🔹 Debug: console log always
    console.log("Booking request body:", body);
    console.log("Token:", token);

    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    console.log("Raw response status:", res.status);
    console.log("Raw response ok:", res.ok);

    const data = await res.json();
    console.log("Booking response data:", data);

    if (!res.ok) throw new Error(data.message || "Booking failed");
    return data.data as Booking;
  },
};
