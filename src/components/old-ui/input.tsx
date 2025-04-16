import { forwardRef } from "react";
import { Info } from "lucide-react";

import { cn } from "@/utils/helpers/cn.helper";

import type { HTMLAttributes, InputHTMLAttributes } from "react";

// ================================== //

type TInputRef = HTMLInputElement;
type TInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<TInputRef, TInputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "peer h-9 w-full rounded-md border border-b-primary bg-bg-primary px-3 py-2 text-sm",
          "placeholder:text-t-placeholder",
          "disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-t-disabled",
          "data-[invalid=true]:border-error-500 data-[invalid=true]:bg-error-50 data-[invalid=true]:pr-9 data-[invalid=true]:focus-visible:outline-error-300",
          "dark:data-[invalid=true]:border-error-900 dark:data-[invalid=true]:bg-red-950/20 dark:data-[invalid=true]:focus-visible:outline-error-950",
          type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none", //prettier-ignore
          className
        )}
        ref={ref}
        {...props}
      />

      <div className="pointer-events-none absolute inset-y-0 end-0 hidden items-center justify-center pr-3 text-error-600 peer-data-[invalid=true]:flex">
        <Info className="size-4" aria-hidden="true" />
      </div>
    </div>
  );
});

Input.displayName = "Input";

// ================================== //

type TInputContainerRef = HTMLDivElement;
type TInputContainerProps = HTMLAttributes<HTMLDivElement>;

const InputContainer = forwardRef<TInputContainerRef, TInputContainerProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn("relative flex flex-col gap-1.5", className)}>
      {children}
    </div>
  );
});

InputContainer.displayName = "InputContainer";

// ================================== //

export { Input, InputContainer };
