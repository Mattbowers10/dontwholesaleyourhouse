import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-cream-100">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-7xl px-8 py-10">{children}</div>
      </div>
    </div>
  );
}
