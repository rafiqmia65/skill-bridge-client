export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface TutorProfile {
  name: string;
  email: string;
  image?: string | null;
  bio: string;
  pricePerHr: number;
  rating: number;
  categories: string[];
  availability: AvailabilitySlot[];
}

export interface TutorStats {
  totalSessions: number;
  upcomingSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  totalEarnings: number;
  rating: number;
}

export interface Session {
  id: string;
  studentName: string;
  date: string;
  status: string;
  review?: {
    rating: number;
    comment: string;
  } | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  studentName: string;
  date: string;
}

export interface TutorDashboardData {
  profile: TutorProfile;
  stats: TutorStats;
  upcomingSessions: Session[];
  recentSessions: Session[];
  reviews: Review[];
}
