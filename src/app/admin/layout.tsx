import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Flaminco Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#111111]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto min-w-0 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
