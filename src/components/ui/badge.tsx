import { forwardRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/helpers/cn.helper";

import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

// ================================== //

const badgeVariants = cva("flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium text-t-secondary", {
  variants: {
    variant: {
      default: "border border-b-primary bg-bg-primary text-t-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TBadgeRef = HTMLDivElement;
type TBadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

const Badge = forwardRef<TBadgeRef, TBadgeProps>(({ variant, className, children, ...props }, ref) => {
  const badgeClasses = cn(badgeVariants({ variant, className }));
  return (
    <div ref={ref} className={badgeClasses} {...props}>
      {children}
    </div>
  );
});

Badge.displayName = "Badge";

// ================================== //

export { Badge };
