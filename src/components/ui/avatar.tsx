import { forwardRef } from "react";
import { User } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/utils/helpers/cn.helper";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

// ================================== //

type TAvatarRootRef = ElementRef<typeof AvatarPrimitive.Root>;
type TAvatarRootProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const AvatarRoot = forwardRef<TAvatarRootRef, TAvatarRootProps>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));

AvatarRoot.displayName = "AvatarRoot";

// ================================== //

type TAvatarImageRef = ElementRef<typeof AvatarPrimitive.Image>;
type TAvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

const AvatarImage = forwardRef<TAvatarImageRef, TAvatarImageProps>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square size-full object-cover", className)} {...props} />
));

AvatarImage.displayName = "AvatarImage";

// ================================== //

type TAvatarFallbackRef = ElementRef<typeof AvatarPrimitive.Fallback>;
type TAvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  type?: "default" | "icon";
};

const AvatarFallback = forwardRef<TAvatarFallbackRef, TAvatarFallbackProps>(({ className, type = "default", children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex size-full items-center justify-center rounded-full bg-primary-50 dark:bg-primary-1000 [&>svg]:text-primary-600 dark:[&>svg]:text-primary-500",
      type === "default" && "relative bg-bg-tertiary dark:bg-bg-tertiary",
      className
    )}
    {...props}
  >
    {type === "default" ? (
      <p className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2">{children}</p>
    ) : (
      <User className="size-3/5 text-t-tertiary" />
    )}
  </AvatarPrimitive.Fallback>
));

AvatarFallback.displayName = "AvatarFallback";

// ================================== //

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
};
