import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

// Admin pages are auth-gated and read live data on every request — never prerender.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--primary)_30%,_transparent),_transparent)] blur-3xl" />
      </div>
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="px-4 md:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
