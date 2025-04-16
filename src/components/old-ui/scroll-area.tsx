"use client";

import { forwardRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/utils/helpers/cn.helper";

import type { ComponentPropsWithoutRef, ElementRef, RefObject } from "react";

// ================================== //

type TScrollBarRef = ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;
type TScrollBarProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

const ScrollBar = forwardRef<TScrollBarRef, TScrollBarProps>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "z-50 flex touch-none select-none p-0.5 transition-colors",
      "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent",
      "data-[orientation=horizontal]:-mb-2 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={cn("relative flex-1 rounded-full bg-gray-400 dark:bg-gray-500")} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = "ScrollBar";

// ================================== //

type TScrollAreaRef = ElementRef<typeof ScrollAreaPrimitive.Root>;
type TScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  orientation?: "vertical" | "horizontal" | "both";
  viewportRef?: RefObject<HTMLDivElement>;
};

const ScrollArea = forwardRef<TScrollAreaRef, TScrollAreaProps>(({ className, children, viewportRef, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="size-full" ref={viewportRef}>
      {children}
    </ScrollAreaPrimitive.Viewport>

    {orientation === "both" ? (
      <>
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
      </>
    ) : (
      <ScrollBar orientation={orientation} />
    )}

    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = "ScrollAreaRoot";

// ================================== //

export { ScrollArea };
