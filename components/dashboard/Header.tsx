import type { ReactNode } from 'react';

type DashboardHeaderProps = {
  heading: string;
  text?: string;
  children?: ReactNode;
};

export default function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
        {text && <p className="text-neutral-500">{text}</p>}
      </div>
      {children}
    </div>
  );
}
