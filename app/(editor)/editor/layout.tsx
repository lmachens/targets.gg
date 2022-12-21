import type { ReactNode } from 'react';

type EditorProps = {
  children?: ReactNode;
};

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  );
}
