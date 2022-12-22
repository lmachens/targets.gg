'use client';

import { useForm } from 'react-hook-form';
import { tacticPatchSchema } from 'lib/validations/tactic';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Icons from 'components/Icons';
import type { Tactic } from '@prisma/client';
import {
  initializeWhiteboard,
  initializeWindowEvents,
  loadData,
  switchBackgroundImage,
  switchTool,
} from 'lib/whiteboard';
import type { Tool } from 'types';
import ToolRadio from './ToolRadio';
import ColorRadio from './ColorRadio';
import ShapeRadio from './ShapeRadio';
import { toast } from 'components/Toast';
import { useRouter } from 'next/navigation';
import { getGame, POPULAR_GAMES } from 'lib/games';
import GameRadio from './GameRadio';
import BackgroundImageRadio from './BackgroundImageRadio';

type FormData = z.infer<typeof tacticPatchSchema>;

interface EditorProps {
  tactic: Pick<Tactic, 'id' | 'title' | 'content' | 'published'>;
}
export default function Editor({ tactic }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(tacticPatchSchema),
    defaultValues: {
      title: tactic.title ?? '',
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const ref = useRef<fabric.Canvas>();
  const [gameClassId, setGameClassId] = useState(POPULAR_GAMES[0].gameClassId);
  const game = useMemo(
    () => getGame(gameClassId) ?? POPULAR_GAMES[0],
    [gameClassId]
  );
  const [backgroundImage, setBackgroundImage] = useState(
    game.backgroundImages[0].value
  );
  const [tool, setTool] = useState<Tool>('Brush');
  const [color, setColor] = useState('cyan');
  const router = useRouter();

  const whiteboardRef = useCallback((container: HTMLDivElement) => {
    const canvas = initializeWhiteboard(container);
    const removeEvents = initializeWindowEvents(canvas);

    const body = tacticPatchSchema.parse(tactic);
    if (body.content) {
      loadData(canvas, body.content);
    }
    switchTool(canvas, tool, color);

    ref.current = canvas;

    return () => {
      canvas.clear();
      removeEvents();
    };
  }, []);

  useEffect(() => {
    switchTool(ref.current!, tool, color);
  }, [tool, color]);

  useEffect(() => {
    switchBackgroundImage(ref.current!, backgroundImage);
  }, [backgroundImage]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/tactics/${tactic.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: JSON.stringify(ref.current),
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        message: 'Your tactoc was not saved. Please try again.',
        type: 'error',
      });
    }

    router.refresh();

    return toast({
      message: 'Your tactic has been saved.',
      type: 'success',
    });
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
            <p className="text-sm text-slate-600">
              {tactic.published ? 'Published' : 'Draft'}
            </p>
            <button
              onClick={() => {
                ref.current!.clear();
                switchBackgroundImage(ref.current!, backgroundImage);
              }}
            >
              Clear
            </button>
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
        <div className="mx-auto w-[800px] grid gap-5">
          <input
            autoFocus
            type="text"
            className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-5xl font-bold focus:outline-none"
            placeholder="Tactic title"
            {...register('title')}
          />
          <GameRadio value={gameClassId} onChange={setGameClassId} />
          <BackgroundImageRadio
            game={game}
            value={backgroundImage}
            onChange={setBackgroundImage}
          />
          <ToolRadio value={tool} onChange={setTool} />
          <ColorRadio value={color} onChange={setColor} />
          <ShapeRadio value={tool} onChange={setTool} />
          <div ref={whiteboardRef} className="min-h-[500px] border" />
        </div>
      </div>
    </form>
  );
}
