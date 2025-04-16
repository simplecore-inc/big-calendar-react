import { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/utils/helpers/cn.helper";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

// ================================== //

type TLabelRef = ElementRef<typeof LabelPrimitive.Root>;
type TLabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean };

const Label = forwardRef<TLabelRef, TLabelProps>(({ className, required = false, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    aria-required={required}
    className={cn("w-fit select-none text-sm font-semibold peer-disabled:cursor-not-allowed peer-disabled:text-t-disabled", className)}
    {...props}
  >
    {children}
    {required && <span className="text-error-600">*</span>}
  </LabelPrimitive.Root>
));

Label.displayName = "Label";

// ================================== //

export { Label };
