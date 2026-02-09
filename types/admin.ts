import { RoleType } from "@/constants/roles";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  isBanned: boolean;
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
