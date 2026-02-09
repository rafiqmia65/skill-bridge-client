import { RoleType } from "@/constants/roles";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: RoleType;
  isBanned: boolean; // backend returns string, but we can convert it to boolean on frontend
}

export interface Booking {
  id: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  tutorProfile: {
    id: string;
    user: {
      name: string;
      image: string | null;
    };
    bio: string;
    pricePerHr: number;
    rating: number;
    categories: { id: string; name: string }[];
  };
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface AdminOverviewResponse {
  stats: {
    totalUsers: number;
    totalTutors: number;
    totalStudents: number;
    totalBookings: number;
    totalCategories: number;
  };
  recentBookings: Booking[];
}
