import type { Tactic, User } from '@prisma/client';
import { db } from 'lib/db';
import { getCurrentUser } from 'lib/session';
import { notFound, redirect } from 'next/navigation';
import { authOptions } from 'lib/auth';
import Editor from 'components/editor/Editor';

async function getTacticForUser(tacticId: Tactic['id'], userId: User['id']) {
  return await db.tactic.findFirst({
    where: {
      id: tacticId,
      authorId: userId,
    },
  });
}

type EditorPageProps = {
  params: {
    tacticId: string;
  };
};
export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages!.signIn!);
  }

  const tactic = await getTacticForUser(params.tacticId, user.id);

  if (!tactic) {
    notFound();
  }

  return (
    <Editor
      tactic={{
        id: tactic.id,
        title: tactic.title,
        content: tactic.content,
        published: tactic.published,
      }}
    />
  );
}
