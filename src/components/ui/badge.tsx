import { forwardRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/helpers/cn.helper";

import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

// ================================== //

const badgeVariants = cva("flex w-fit items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium text-t-secondary", {
  variants: {
    variant: {
      default: "border border-b-primary bg-bg-primary text-t-primary [&>svg:first-child]:hidden",

      // Border variant
      "blue-border": "border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400 [&>svg:first-child]:hidden",
      "green-border":
        "border border-green-200 bg-green-50 text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400 [&>svg:first-child]:hidden",
      "red-border": "border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400 [&>svg:first-child]:hidden",
      "yellow-border":
        "border border-yellow-200 bg-yellow-50 text-yellow-600 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400 [&>svg:first-child]:hidden",
      "purple-border":
        "border border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-400 [&>svg:first-child]:hidden",
      "orange-border":
        "border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400 [&>svg:first-child]:hidden",

      // Dot variants
      "blue-dot": "border border-b-primary text-t-primary [&>svg]:fill-blue-600",
      "green-dot": "border border-b-primary text-t-primary [&>svg]:fill-green-600",
      "red-dot": "border border-b-primary text-t-primary [&>svg]:fill-red-600",
      "orange-dot": "border border-b-primary text-t-primary [&>svg]:fill-orange-600",
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
      <svg width="8" height="8" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="4" />
      </svg>

      {children}
    </div>
  );
});

Badge.displayName = "Badge";

// ================================== //

export { Badge };
