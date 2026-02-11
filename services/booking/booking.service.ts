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
export interface Tutor {
  id: string;
  user: {
    name: string;
    image?: string | null;
  };
  rating: number;
  pricePerHr?: number;
  bio?: string;

  categories?: Category[];
  availability?: TutorAvailability[];
}

export interface TutorAvailability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface TutorProfile {
  id: string;
  user: User;
  bio?: string;
  pricePerHr?: number;
  rating: number;
  categories?: Category[];
}

export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  date: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  tutorProfileId?: string;
  tutorProfile?: TutorProfile;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * Booking service for frontend API calls
 */
export const bookingService = {
  // Create a new booking
  createBooking: async (
    token: string,
    tutorProfileId: string,
    date: string,
  ): Promise<Booking> => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ tutorProfileId, date }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Booking failed");

    return data.data as Booking;
  },

  // Get all bookings of logged-in student
  getMyBookings: async (token: string): Promise<Booking[]> => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");

    return data.data as Booking[];
  },

  // Get a single booking by ID
  getBookingById: async (
    token: string,
    bookingId: string,
  ): Promise<Booking> => {
    const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch booking");

    return data.data as Booking;
  },
};
