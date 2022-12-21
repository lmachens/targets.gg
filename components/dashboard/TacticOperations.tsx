'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Tactic } from '@prisma/client';

import DropdownMenu from 'components/DropdownMenu';
import Icons from 'components/Icons';
import { Alert } from 'components/Alert';
import { toast } from 'components/Toast';

async function deleteTactic(tacticId: string) {
  const response = await fetch(`/api/tactics/${tacticId}`, {
    method: 'DELETE',
  });

  if (!response?.ok) {
    toast({
      title: 'Something went wrong.',
      message: 'Your tactic was not deleted. Please try again.',
      type: 'error',
    });
  }

  return true;
}

type TacticOperationsProps = {
  tactic: Pick<Tactic, 'id' | 'title'>;
};

export default function TacticOperations({ tactic }: TacticOperationsProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
          <Icons.dotsVertical className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Link href={`/editor/${tactic.id}`} className="flex w-full">
                Edit
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
              onSelect={() => setShowDeleteAlert(true)}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
      <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>
              Are you sure you want to delete this tactic?
            </Alert.Title>
            <Alert.Description>This action cannot be undone.</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deleteTactic(tactic.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  );
}
