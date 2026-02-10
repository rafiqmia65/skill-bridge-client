import { TutorStats } from "@/types/tutor";

interface Props {
  stats: TutorStats;
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard title="Total Sessions" value={stats.totalSessions} />
      <StatCard title="Upcoming Sessions" value={stats.upcomingSessions} />
      <StatCard title="Completed Sessions" value={stats.completedSessions} />
      <StatCard title="Cancelled Sessions" value={stats.cancelledSessions} />
      <StatCard
        title="Total Earnings"
        value={`$${stats.totalEarnings}`}
        colSpan={2}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  colSpan = 1,
}: {
  title: string;
  value: string | number;
  colSpan?: number;
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center sm:col-span-${colSpan}`}
    >
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
