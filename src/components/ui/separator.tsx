"use client";

import { forwardRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/utils/helpers/cn.helper";

import type { ComponentProps, ElementRef } from "react";

// ================================== //

type TSeparatorRef = ElementRef<typeof SeparatorPrimitive.Root>;
type TSeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

const Separator = forwardRef<TSeparatorRef, TSeparatorProps>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-b-secondary", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));

Separator.displayName = "Separator";

// ================================== //

export { Separator };
