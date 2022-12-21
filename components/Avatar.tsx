import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "lib/utils";

type AvatarProps = AvatarPrimitive.AvatarProps;

export default function Avatar({ className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex h-[32px] w-[32px] items-center justify-center align-middle overflow-hidden rounded-full bg-slate-100",
        className
      )}
      {...props}
    />
  );
}
Avatar.Image = function AvatarImage({
  src,
  className,
  alt,
  width = "100%",
  height = "100%",
  ...props
}: AvatarPrimitive.AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      src={src}
      className={cn("h-full w-full object-cover", className)}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
};

Avatar.Fallback = function AvatarFallback({
  className,
  children,
  ...props
}: AvatarPrimitive.AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      delayMs={500}
      className={cn(
        "flex h-full w-full items-center justify-center text-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
};
