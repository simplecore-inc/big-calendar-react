"use client";

import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, Info } from "lucide-react";

import { cn } from "@/utils/helpers/cn.helper";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

// ================================== //

type TSelectTriggerRef = ElementRef<typeof SelectPrimitive.Trigger>;
type TSelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

const SelectTrigger = forwardRef<TSelectTriggerRef, TSelectTriggerProps>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex h-9 w-full items-center justify-between rounded-md border border-b-primary bg-bg-primary px-3 py-2 text-sm",
      "data-[placeholder]:text-t-placeholder",
      "[&_span]:line-clamp-1 [&_span]:text-start",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[invalid=true]:border-error-500 data-[invalid=true]:bg-error-50 data-[invalid=true]:focus-visible:outline-error-300",
      "dark:data-[invalid=true]:border-error-900 dark:data-[invalid=true]:bg-red-950/20 dark:data-[invalid=true]:focus-visible:outline-error-950",
      className
    )}
    {...props}
  >
    {children}

    <SelectPrimitive.Icon asChild>
      <div className="ml-2">
        <ChevronDown className="flex size-4 group-data-[invalid=true]:hidden" />
        <Info className="hidden size-4 text-error-600 group-data-[invalid=true]:flex" aria-hidden="true" />
      </div>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = "SelectTrigger";

// ================================== //

type TSelectScrollUpButtonRef = ElementRef<typeof SelectPrimitive.ScrollUpButton>;
type TSelectScrollUpButtonProps = ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>;

const SelectScrollUpButton = forwardRef<TSelectScrollUpButtonRef, TSelectScrollUpButtonProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = "SelectScrollUpButton";

// ================================== //

type TSelectScrollDownButtonRef = ElementRef<typeof SelectPrimitive.ScrollDownButton>;
type TSelectScrollDownButtonProps = ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>;

const SelectScrollDownButton = forwardRef<TSelectScrollDownButtonRef, TSelectScrollDownButtonProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));

SelectScrollDownButton.displayName = "SelectScrollDownButton";

// ================================== //

type TSelectContentRef = ElementRef<typeof SelectPrimitive.Content>;
type TSelectContentProps = Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, "position"> & { viewportClassName?: string };

const SelectContent = forwardRef<TSelectContentRef, TSelectContentProps>(({ className, children, viewportClassName, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position="popper"
      className={cn(
        "relative z-50 max-h-96 overflow-hidden rounded-md border border-b-primary bg-bg-primary",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:translate-y-1 data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:-translate-x-1 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:translate-x-1 data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:-translate-y-1 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={cn("h-[var(--radix-select-trigger-height)] w-[var(--radix-select-trigger-width)] p-1", viewportClassName)}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = "SelectContent";

// ================================== //

type TSelectLabelRef = ElementRef<typeof SelectPrimitive.Label>;
type TSelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

const SelectLabel = forwardRef<TSelectLabelRef, TSelectLabelProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
));

SelectLabel.displayName = "SelectLabel";

// ================================== //
type TSelectGroupRef = ElementRef<typeof SelectPrimitive.Group>;
type TSelectGroupProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

const SelectGroup = forwardRef<TSelectGroupRef, TSelectGroupProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.Group ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));

SelectGroup.displayName = "SelectGroup";

// ================================== //

type TSelectItemRef = ElementRef<typeof SelectPrimitive.Item>;
type TSelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { indicatorPosition?: "left" | "right" };

const SelectItem = forwardRef<TSelectItemRef, TSelectItemProps>(({ className, children, indicatorPosition = "right", ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none",
      "focus:bg-bg-primary-hover focus:outline-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      indicatorPosition === "left" ? "pl-9 pr-2" : "pl-2 pr-9",
      className
    )}
    {...props}
  >
    <span className={cn("absolute flex size-3.5 items-center justify-center", indicatorPosition === "left" ? "left-2" : "right-2")}>
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = "SelectItem";

// ================================== //

type TSelectSeparatorRef = ElementRef<typeof SelectPrimitive.Separator>;
type TSelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

const SelectSeparator = forwardRef<TSelectSeparatorRef, TSelectSeparatorProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-b-secondary", className)} {...props} />
));

SelectSeparator.displayName = "SelectSeparator";

// ================================== //

export const Select = {
  Root: SelectPrimitive.Root,
  Group: SelectGroup,
  Value: SelectPrimitive.Value,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
};
