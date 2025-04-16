import { forwardRef } from "react";
import { Info } from "lucide-react";

import { DateInput, DateSegment, TimeField } from "react-aria-components";

import { cn } from "@/utils/helpers/cn.helper";

import type { TimeFieldProps, TimeValue } from "react-aria-components";

// ================================== //

type TTimeInputRef = HTMLDivElement;
type TTimeInputProps = Omit<TimeFieldProps<TimeValue>, "isDisabled" | "isInvalid"> & {
  readonly dateInputClassName?: string;
  readonly segmentClassName?: string;
  readonly disabled?: boolean;
  readonly "data-invalid"?: boolean;
};

const TimeInput = forwardRef<TTimeInputRef, TTimeInputProps>(
  ({ className, dateInputClassName, segmentClassName, disabled, "data-invalid": dataInvalid, ...props }, ref) => {
    return (
      <TimeField
        ref={ref}
        className={cn("relative", className)}
        isDisabled={disabled}
        isInvalid={dataInvalid}
        {...props}
        aria-label="Time"
        shouldForceLeadingZeros
      >
        <DateInput
          className={cn(
            "peer inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-b-primary bg-bg-primary px-3 py-2 text-sm",
            "data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-1 data-[focus-within]:ring-offset-bg-primary",
            "data-[disabled]:cursor-not-allowed data-[disabled]:bg-bg-disabled data-[disabled]:text-t-disabled",
            "data-[invalid=true]:border-error-500 data-[invalid=true]:bg-error-50 data-[invalid=true]:pr-9 data-[invalid=true]:data-[focus-within]:ring-error-300",
            "dark:data-[invalid=true]:border-error-900 dark:data-[invalid=true]:bg-red-950/20 dark:data-[invalid=true]:data-[focus-within]:ring-error-950",
            dateInputClassName
          )}
        >
          {segment => (
            <DateSegment
              segment={segment}
              className={cn(
                "inline rounded p-0.5 caret-transparent outline outline-0",
                "data-[focused]:bg-bg-tertiary data-[focused]:text-t-primary",
                "data-[invalid=true]:data-[focused]:bg-error-200 dark:data-[invalid=true]:data-[focused]:bg-error-950",
                "data-[placeholder]:text-t-placeholder",
                "data-[focused]:outline-none data-[focused]:ring-0",
                "data-[disabled]:cursor-not-allowed data-[disabled]:bg-bg-disabled data-[disabled]:text-t-disabled",
                segmentClassName
              )}
            />
          )}
        </DateInput>

        <div className="pointer-events-none absolute inset-y-0 end-0 hidden items-center justify-center pr-3 text-error-600 peer-data-[invalid=true]:flex">
          <Info className="size-4" aria-hidden="true" />
        </div>
      </TimeField>
    );
  }
);

TimeInput.displayName = "TimeInput";

// ================================== //

export { TimeInput };
