import { X } from "lucide-react";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Button } from "@/components/old-ui/button";

import { cn } from "@/utils/helpers/cn.helper";

import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";

// ================================== //

function DialogPortal({ children }: DialogPrimitive.DialogPortalProps) {
  return (
    <DialogPrimitive.Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">{children}</div>
    </DialogPrimitive.Portal>
  );
}

// ================================== //

type TDialogOverlayRef = ElementRef<typeof DialogPrimitive.Overlay>;
type TDialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { disableAnimation?: boolean };

const DialogOverlay = forwardRef<TDialogOverlayRef, TDialogOverlayProps>(({ className, disableAnimation = false, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 grid place-items-center overflow-auto bg-black/80 py-10 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        disableAnimation && "data-[state=closed]:duration-0 data-[state=open]:duration-0",
        className
      )}
      {...props}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

// ================================== //

type TDialogCloseRef = ElementRef<typeof DialogPrimitive.Close>;
type TDialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

const DialogClose = forwardRef<TDialogCloseRef, TDialogCloseProps>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} className={cn("", className)} asChild {...props}>
    {children || (
      <Button variant="ghost" size="icon-xxxs" className="absolute right-2.5 top-2.5">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </Button>
    )}
  </DialogPrimitive.Close>
));

DialogClose.displayName = "DialogClose";

// ================================== //

// DO NOT ADD OVERFLOW HIDDEN HERE!
const dialogVariants = cva("relative z-50 w-full rounded-xl border border-b-primary bg-bg-primary p-0.5 dark:border-b-secondary", {
  variants: {
    size: {
      xxs: "max-w-[380px]",
      xs: "max-w-screen-xs",
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type TDialogContentRef = ElementRef<typeof DialogPrimitive.Content>;
type TDialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & VariantProps<typeof dialogVariants> & { disableAnimation?: boolean };

const DialogContent = forwardRef<TDialogContentRef, TDialogContentProps>(({ className, children, size, disableAnimation = false, ...props }, ref) => {
  const dialogContentClasses = cn(
    dialogVariants({ size }),
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    disableAnimation && "data-[state=closed]:duration-0 data-[state=open]:duration-0",
    className
  );

  return (
    <DialogPortal>
      <DialogOverlay disableAnimation={disableAnimation}>
        <div className="flex w-full items-center justify-center px-2">
          <DialogPrimitive.Content ref={ref} className={cn(dialogContentClasses)} {...props}>
            <div className="flex flex-col gap-4 rounded-[10px] border border-b-primary p-4 dark:border-b-secondary">{children}</div>
          </DialogPrimitive.Content>
        </div>
      </DialogOverlay>
    </DialogPortal>
  );
});

DialogContent.displayName = "DialogContent";

// ================================== //

type TDialogHeaderRef = HTMLHeadElement;
type TDialogHeaderProps = HTMLAttributes<HTMLHeadElement>;

const DialogHeader = forwardRef<TDialogHeaderRef, TDialogHeaderProps>(({ className, children, ...props }, ref) => (
  <header ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
    {children}
  </header>
));

DialogHeader.displayName = "DialogHeader";

// ================================== //

type TDialogTitleRef = ElementRef<typeof DialogPrimitive.Title>;
type TDialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

const DialogTitle = forwardRef<TDialogTitleRef, TDialogTitleProps>(({ className, children }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)}>
    {children}
  </DialogPrimitive.Title>
));

DialogTitle.displayName = "DialogTitle";

// ================================== //

type TDialogDescriptionRef = ElementRef<typeof DialogPrimitive.Description>;
type TDialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

const DialogDescription = forwardRef<TDialogDescriptionRef, TDialogDescriptionProps>(({ className, children }, ref) => {
  return (
    <DialogPrimitive.Description ref={ref} className={cn("text-sm text-t-secondary", className)}>
      {children}
    </DialogPrimitive.Description>
  );
});

DialogDescription.displayName = "DialogDescription";

// ================================== //

type TDialogBodyRef = HTMLDivElement;
type TDialogBodyProps = HTMLAttributes<HTMLDivElement>;

const DialogBody = forwardRef<TDialogBodyRef, TDialogBodyProps>(({ className, children }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-3", className)}>
      {children}
    </div>
  );
});

DialogBody.displayName = "DialogBody";

// ================================== //

type TDialogFooterRef = HTMLDivElement;
type TDialogFooterProps = HTMLAttributes<HTMLDivElement>;

const DialogFooter = forwardRef<TDialogFooterRef, TDialogFooterProps>(({ className, children }, ref) => {
  return (
    <footer ref={ref} className={cn("-mx-4 flex flex-col-reverse gap-2 border-t px-4 pt-4 sm:flex-row sm:justify-end [&>button]:w-full", className)}>
      {children}
    </footer>
  );
});

DialogFooter.displayName = "DialogFooter";

// ================================== //

export const Dialog = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Close: DialogClose,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
};
