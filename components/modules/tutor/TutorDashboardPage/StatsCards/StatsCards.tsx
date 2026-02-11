import { TutorStats } from "@/types/tutor";
import {
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
} from "react-icons/fi";

interface Props {
  stats: TutorStats;
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Sessions"
        value={stats.totalSessions}
        icon={FiCalendar}
        color="blue"
      />
      <StatCard
        title="Upcoming"
        value={stats.upcomingSessions}
        icon={FiCalendar}
        color="yellow"
      />
      <StatCard
        title="Completed"
        value={stats.completedSessions}
        icon={FiCheckCircle}
        color="green"
      />
      <StatCard
        title="Cancelled"
        value={stats.cancelledSessions}
        icon={FiXCircle}
        color="red"
      />
      <StatCard
        title="Total Earnings"
        value={`$${stats.totalEarnings}`}
        icon={FiDollarSign}
        color="purple"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: "blue" | "yellow" | "green" | "red" | "purple";
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${colorClasses[color]}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
