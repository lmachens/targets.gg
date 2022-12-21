import { getCurrentUser } from "lib/session";
import DashboardShell from "components/dashboard/Shell";
import DashboardHeader from "components/dashboard/Header";
import Link from "next/link";

export default async function Dashboard() {
  const user = await getCurrentUser();

  return (
    <DashboardShell>
      <DashboardHeader heading="Discover" text="Discover tactics">
        <Link
          href="/editor"
          className="inline-flex h-8 items-center rounded-md border border-transparent bg-brand-700 px-6 py-1 text-sm font-medium text-white hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Create
        </Link>
      </DashboardHeader>
      {user?.name}
    </DashboardShell>
  );
}
