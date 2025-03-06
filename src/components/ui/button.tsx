import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Children, cloneElement, forwardRef, isValidElement } from "react";

import { cn } from "@/utils/helpers/cn.helper";

import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

// ================================== //

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "h-8 px-3 text-sm [&>svg]:size-3.5",
        sm: "h-9 px-3 text-sm [&>svg]:size-4",
        md: "h-10 px-3.5 text-sm [&>svg]:size-5",
        lg: "h-11 px-4 text-base [&>svg]:size-5",
        xl: "h-12 rounded-lg px-4.5 text-base [&>svg]:size-5",
        "2xl": "h-14 rounded-lg px-5.5 text-lg [&>svg]:size-7",
        "icon-xxxs": "size-6 [&>svg]:size-4.5",
        "icon-xxs": "size-7 [&>svg]:size-4.5",
        "icon-xs": "size-8 [&>svg]:size-4.5",
        "icon-sm": "size-9 [&>svg]:size-5",
        "icon-md": "size-10 [&>svg]:size-5",
        "icon-lg": "size-11 [&>svg]:size-5",
        "icon-xl": "size-12 [&>svg]:size-6",
        "icon-2xl": "size-14 [&>svg]:size-7",
      },
      variant: {
        unstyled: "gap-0 px-0 text-base font-normal",
        primary: "bg-primary-600 text-white hover:bg-primary-700 disabled:bg-bg-disabled disabled:text-t-disabled",
        outline: "border border-b-primary hover:bg-bg-primary-hover disabled:text-t-disabled disabled:opacity-50 disabled:hover:bg-transparent",
        ghost: "hover:bg-bg-primary-hover disabled:text-t-disabled disabled:opacity-50 disabled:hover:bg-transparent",
        link: "h-fit rounded-sm px-0 hover:underline disabled:text-t-disabled disabled:opacity-50 disabled:hover:no-underline",
        destructive:
          "bg-error-600 text-white hover:bg-error-700 focus-visible:outline-error-300 disabled:bg-bg-disabled disabled:text-t-disabled dark:focus-visible:outline-error-800",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

type TButtonRef = HTMLButtonElement;
type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean; isLoading?: boolean };

const Button = forwardRef<TButtonRef, TButtonProps>(({ className, variant, size, asChild = false, children, isLoading = false, disabled, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const buttonClasses = cn(buttonVariants({ variant, size, className }));

  const isDisabled = isLoading || disabled;

  return (
    <Comp ref={ref} className={buttonClasses} disabled={isDisabled} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" /> Carregando...
        </>
      ) : (
        children
      )}
    </Comp>
  );
});

Button.displayName = "Button";

// ================================== //

const buttonGroupVariants = cva("inline-flex", {
  variants: {
    variant: {
      primary: "",
      destructive: "",
      outline: "",
      ghost: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "sm",
  },
});

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({ className, variant = "outline", size = "sm", children, ...props }, ref) => {
  const groupClasses = cn(buttonGroupVariants({ variant, size, className }));

  return (
    <div ref={ref} className={groupClasses} {...props}>
      {Children.map(children, (child, index) => {
        if (isValidElement<TButtonProps>(child) && child.type === Button) {
          const isIconOnly = Children.count(child.props.children) === 1 && isValidElement(child.props.children);

          return cloneElement(child, {
            variant,
            size: isIconOnly && (index === 0 || index === Children.count(children) - 1) ? `icon-${size!}` : size,
            className: cn(
              child.props.className,
              "first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none",
              index !== 0 && "-ml-px"
            ),
          });
        }
        return child;
      })}
    </div>
  );
});

ButtonGroup.displayName = "ButtonGroup";

// ================================== //

export { Button, ButtonGroup, buttonVariants };
