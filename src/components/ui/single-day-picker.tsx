import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getDateLocale } from "@/lib/date-locale";
import { formatDate } from "@/lib/date-formats";

interface SingleDayPickerProps {
  value?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  "data-invalid"?: boolean;
}

const SingleDayPicker = React.forwardRef<HTMLButtonElement, SingleDayPickerProps>(
  ({ value, onSelect, placeholder, className, id, "data-invalid": dataInvalid, ...props }, ref) => {
    const { i18n, t } = useTranslation();
    const locale = getDateLocale(i18n.language);

    const displayDate = value ? formatDate(value, "fullDate", i18n.language, locale) : placeholder || t("dateTime.selectDate", "Pick a date");

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id={id}
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", dataInvalid && "border-destructive", className)}
            {...props}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? displayDate : <span>{displayDate}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={value} onSelect={onSelect} initialFocus locale={locale} />
        </PopoverContent>
      </Popover>
    );
  }
);
SingleDayPicker.displayName = "SingleDayPicker";

export { SingleDayPicker };
