import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-4">Analytics & Reports</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">View detailed platform analytics.</p>
      </div>
    </div>
  );
}
