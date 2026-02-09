// src/components/admin/StatCard.tsx
export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border p-4 bg-background">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
