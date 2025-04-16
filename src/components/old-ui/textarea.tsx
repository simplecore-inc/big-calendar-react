import { forwardRef } from "react";

import { cn } from "@/utils/helpers/cn.helper";

import type { TextareaHTMLAttributes } from "react";

// ================================== //

type TTextareaRef = HTMLTextAreaElement;
type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<TTextareaRef, TTextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cn(
        "peer min-h-20 w-full rounded-md border border-b-primary bg-bg-primary px-3 py-2 text-sm",
        "placeholder:text-t-placeholder",
        "disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-t-disabled",
        "data-[invalid=true]:border-red-500 data-[invalid=true]:bg-red-50 data-[invalid=true]:pr-9 data-[invalid=true]:focus-visible:outline-error-300",
        "dark:data-[invalid=true]:border-error-900 dark:data-[invalid=true]:bg-red-950/20 dark:data-[invalid=true]:focus-visible:outline-red-800",
        className
      )}
    />
  );
});

Textarea.displayName = "Textarea";

// ================================== //

export { Textarea };
