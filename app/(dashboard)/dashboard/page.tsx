import { getCurrentUser } from 'lib/session';
import DashboardShell from 'components/dashboard/Shell';
import DashboardHeader from 'components/dashboard/Header';
import Link from 'next/link';
import { cache } from 'react';
import type { User } from '@prisma/client';
import { db } from 'lib/db';
import { redirect } from 'next/navigation';
import { authOptions } from 'lib/auth';
import TacticItem from 'components/dashboard/TacticItem';
import EmptyPlaceholder from 'components/dashboard/EmptyPlaceholder';
import TacticCreateButton from 'components/dashboard/TacticCreateButton';

const getTacticsForUser = cache(async (userId: User['id']) => {
  return await db.tactic.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
});

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages!.signIn!);
  }

  const tactics = await getTacticsForUser(user.id);

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
      <div>
        {tactics?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {tactics.map((tactic) => (
              <TacticItem key={tactic.id} tactic={tactic} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="tactic" />
            <EmptyPlaceholder.Title>No tactics created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any tactics yet. Start creating content.
            </EmptyPlaceholder.Description>
            <TacticCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
