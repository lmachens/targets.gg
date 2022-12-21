'use client';

import Whiteboard from 'components/editor/Whiteboard';
import Controls from 'components/editor/Controls';
import { useForm } from 'react-hook-form';
import { postPatchSchema } from 'lib/validations/tactic';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import Icons from 'components/Icons';
import type { Tactic } from '@prisma/client';

type FormData = z.infer<typeof postPatchSchema>;

interface EditorProps {
  tactic: Pick<Tactic, 'id' | 'title' | 'content' | 'published'>;
}
export default function Editor({ tactic }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });
  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    console.log({
      gameClassId: '',
      title: '',
      background: 'background',
      data: JSON.stringify('canvas'),
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg border border-transparent bg-transparent py-2 pl-3 pr-5 text-sm font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-700"
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-slate-600">Draft</p>
          </div>
          <button
            type="submit"
            className="relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px]">
          <Whiteboard />
          <Controls />
        </div>
      </div>
    </form>
  );
}
