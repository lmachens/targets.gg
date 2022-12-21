import type { Tactic } from '@prisma/client';
import Link from 'next/link';

import { formatDate } from 'lib/utils';
import Skeleton from 'components/Skeleton';
import TacticOperations from './TacticOperations';

type TacticItemProps = {
  tactic: Pick<Tactic, 'id' | 'title' | 'published' | 'createdAt'>;
};

export default function TacticItem({ tactic }: TacticItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${tactic.id}`}
          className="font-semibold hover:underline"
        >
          {tactic.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(tactic.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <TacticOperations tactic={{ id: tactic.id, title: tactic.title }} />
      {/* <TacticDeleteButton tactic={{ id: tactic.id, title: tactic.title }} /> */}
    </div>
  );
}

TacticItem.Skeleton = function TacticItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
