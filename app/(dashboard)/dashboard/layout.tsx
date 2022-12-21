import { notFound } from "next/navigation";
import { getCurrentUser } from "lib/session";
import type { ReactNode } from "react";
import MainNav from "components/MainNav";
import dashboardConfig from "config/dashboard";
import DashboardNav from "components/dashboard/Nav";
import UserAccountNav from "components/dashboard/UserAccountNav";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
