import { Slot } from "@radix-ui/react-slot";
import { createContext, forwardRef, useContext, useId } from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { Label } from "@/components/old-ui/label";

import { cn } from "@/utils/helpers/cn.helper";

import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";

// ================================== //

const useFormField = () => {
  const itemContext = useContext(FormItemContext);
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// ================================== //

type TFormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName;
};

const FormFieldContext = createContext<TFormFieldContextValue>({} as TFormFieldContextValue);

type TFormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = ControllerProps<
  TFieldValues,
  TName
>;

function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: TFormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// ================================== //

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

type TFormItemRef = HTMLDivElement;
type TFormItemProps = HTMLAttributes<HTMLDivElement>;

const FormItem = forwardRef<TFormItemRef, TFormItemProps>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

// ================================== //

type TFormLabelRef = ElementRef<typeof Label>;
type TFormLabelProps = ComponentPropsWithoutRef<typeof Label> & { required?: boolean };

const FormLabel = forwardRef<TFormLabelRef, TFormLabelProps>(({ children, className, required, ...props }, ref) => {
  const { error } = useFormField();

  return (
    <Label ref={ref} className={cn(error && "text-red-500", className)} {...props}>
      {children}
      {required && <span className="text-red-500">*</span>}
    </Label>
  );
});

FormLabel.displayName = "FormLabel";

// ================================== //

type TFormDescriptionRef = HTMLParagraphElement;
type TFormDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const FormDescription = forwardRef<TFormDescriptionRef, TFormDescriptionProps>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return <p ref={ref} id={formDescriptionId} className={cn("select-none text-xs text-t-secondary", className)} {...props} />;
});

FormDescription.displayName = "FormDescription";

// ================================== //

type TFormControlRef = ElementRef<typeof Slot>;
type TFormControlProps = ComponentPropsWithoutRef<typeof Slot>;

const FormControl = forwardRef<TFormControlRef, TFormControlProps>(({ ...props }, ref) => {
  const { error, formDescriptionId, formMessageId } = useFormField();
  return <Slot ref={ref} aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`} aria-invalid={!!error} {...props} />;
});

FormControl.displayName = "FormControl";

// ================================== //

type TFormErrorMessageRef = HTMLParagraphElement;
type TFormErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

const FormErrorMessage = forwardRef<TFormErrorMessageRef, TFormErrorMessageProps>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) return null;

  return (
    <p ref={ref} id={formMessageId} className={cn("text-xs font-medium text-error-600", className)} {...props}>
      {body}
    </p>
  );
});

FormErrorMessage.displayName = "FormMessage";

// ================================== //

export const Form = {
  Root: FormProvider,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Description: FormDescription,
  Control: FormControl,
  ErrorMessage: FormErrorMessage,
};
