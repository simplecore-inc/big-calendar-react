import { cn } from "@/utils/helpers/cn.helper";

import type { HTMLAttributes } from "react";

// ================================== //

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-bg-quaternary", className)} {...props} />;
}

// ================================== //

export { Skeleton };
