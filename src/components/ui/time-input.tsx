import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface TimeValue {
  hour: number;
  minute: number;
}

interface TimeInputProps {
  value?: TimeValue;
  onChange?: (value: TimeValue | null) => void;
  hourCycle?: 12 | 24;
  granularity?: string;
  className?: string;
  id?: string;
  "data-invalid"?: boolean;
  "aria-label"?: string;
}

const TimeInput = React.forwardRef<HTMLDivElement, TimeInputProps>(
  ({ value, onChange, hourCycle = 24, granularity: _granularity, className, id, "data-invalid": dataInvalid, "aria-label": ariaLabel, ...props }, ref) => {
    const { t } = useTranslation("calendar");

    // Convert 24-hour to 12-hour format for display
    const get12HourFormat = (hour24: number) => {
      if (hourCycle === 24) return { hour: hour24, period: null };
      const isAfternoon = hour24 >= 12;
      const periodKey = isAfternoon ? "pm" : "am";
      let hour12 = hour24 % 12;
      if (hour12 === 0) hour12 = 12;
      return { hour: hour12, period: periodKey };
    };

    // Convert 12-hour to 24-hour format for storage
    const get24HourFormat = (hour12: number, periodKey: string) => {
      if (hourCycle === 24) return hour12;
      if (periodKey === "am") {
        return hour12 === 12 ? 0 : hour12;
      } else {
        return hour12 === 12 ? 12 : hour12 + 12;
      }
    };

    const currentHour24 = value?.hour || 0;
    const { hour: displayHour, period } = get12HourFormat(currentHour24);

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const hour = parseInt(e.target.value, 10);
      if (!isNaN(hour) && onChange && value) {
        if (hourCycle === 12 && period) {
          const hour24 = get24HourFormat(hour, period);
          onChange({ ...value, hour: hour24 });
        } else {
          onChange({ ...value, hour });
        }
      }
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const minute = parseInt(e.target.value, 10);
      if (!isNaN(minute) && onChange && value) {
        onChange({ ...value, minute });
      }
    };

    const handlePeriodToggle = () => {
      if (hourCycle === 12 && onChange && value) {
        const newPeriod = period === "am" ? "pm" : "am";
        const hour24 = get24HourFormat(displayHour, newPeriod);
        onChange({ ...value, hour: hour24 });
      }
    };

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          dataInvalid && "border-destructive",
          className
        )}
        {...props}
      >
        {hourCycle === 12 && period && (
          <button
            type="button"
            onClick={handlePeriodToggle}
            className="mr-2 rounded px-2 py-1 text-xs font-medium hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label={t("dateTime.toggleAmPm", "Toggle AM/PM")}
          >
            {t(`dateTime.${period}`)}
          </button>
        )}
        <input
          type="number"
          min={hourCycle === 12 ? 1 : 0}
          max={hourCycle === 12 ? 12 : 23}
          value={hourCycle === 12 ? displayHour : currentHour24}
          onChange={handleHourChange}
          className="w-8 bg-transparent text-center outline-none"
          aria-label={ariaLabel ? `${ariaLabel} hour` : "Hour"}
        />
        <span className="mx-1">:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={value?.minute || 0}
          onChange={handleMinuteChange}
          className="w-8 bg-transparent text-center outline-none"
          aria-label={ariaLabel ? `${ariaLabel} minute` : "Minute"}
        />
      </div>
    );
  }
);
TimeInput.displayName = "TimeInput";

export { TimeInput };
export type { TimeValue };
