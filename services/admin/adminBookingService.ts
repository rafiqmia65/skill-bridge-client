import { env } from "@/env";
import type { Booking } from "@/types/admin";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL;

interface Options {
  token: string;
}

export const adminBookingService = {
  async getAllBookings(options: Options): Promise<Booking[]> {
    const res = await fetch(`${API_URL}/api/bookings/admin`, {
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const json = await res.json();
    return json?.data ?? [];
  },
};
