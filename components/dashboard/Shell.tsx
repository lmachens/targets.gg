import { cn } from "lib/utils";
import type { HTMLAttributes } from "react";

type DashboardShellProps = HTMLAttributes<HTMLDivElement>;

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
}
