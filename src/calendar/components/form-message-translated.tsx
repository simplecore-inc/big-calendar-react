import React from "react";
import { useTranslation } from "react-i18next";
import { useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Map of error codes to translation keys
const errorKeyMap: Record<string, string> = {
  titleRequired: "calendar.events.titleRequired",
  descriptionRequired: "calendar.events.descriptionRequired",
  startDateRequired: "calendar.events.startDateRequired",
  startTimeRequired: "calendar.events.startTimeRequired",
  endDateRequired: "calendar.events.endDateRequired",
  endTimeRequired: "calendar.events.endTimeRequired",
  colorRequired: "calendar.events.colorRequired",
};

export const FormMessageTranslated = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { t } = useTranslation('calendar');
    const { error, formMessageId } = useFormField();

    let body = children;

    if (error?.message) {
      // Check if the error message is a key we can translate
      const translationKey = errorKeyMap[error.message];
      if (translationKey) {
        body = t(translationKey);
      } else {
        body = error.message;
      }
    }

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  }
);

FormMessageTranslated.displayName = "FormMessageTranslated";
