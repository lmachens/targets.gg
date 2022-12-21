import DashboardHeader from 'components/dashboard/Header';
import DashboardShell from 'components/dashboard/Shell';
import TacticCreateButton from 'components/dashboard/TacticCreateButton';
import TacticItem from 'components/dashboard/TacticItem';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <TacticCreateButton />
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <TacticItem.Skeleton />
        <TacticItem.Skeleton />
        <TacticItem.Skeleton />
        <TacticItem.Skeleton />
        <TacticItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
