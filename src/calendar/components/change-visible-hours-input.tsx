import { useState } from "react";
import { Info } from "lucide-react";

import { useCalendarPreferences } from "@/stores/calendar-store";

import { Button } from "@/components/ui/button";
import { TimeInput } from "@/components/ui/time-input";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

import type { TimeValue } from "@/components/ui/time-input";

export function ChangeVisibleHoursInput() {
  const { visibleHours, setVisibleHours } = useCalendarPreferences();

  const [from, setFrom] = useState<TimeValue>({ hour: visibleHours.from, minute: 0 });
  const [to, setTo] = useState<TimeValue>({ hour: visibleHours.to, minute: 0 });

  const handleFromChange = (value: TimeValue | null) => {
    if (value) setFrom(value);
  };

  const handleToChange = (value: TimeValue | null) => {
    if (value) setTo(value);
  };

  const handleApply = () => {
    const toHour = to.hour === 0 ? 24 : to.hour;
    setVisibleHours({ from: from.hour, to: toHour });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold">Change visible hours</p>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-3" />
            </TooltipTrigger>

            <TooltipContent className="max-w-80 text-center">
              <p>If an event falls outside the specified visible hours, the visible hours will automatically adjust to include that event.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-4">
        <p>From</p>
        <TimeInput id="start-time" hourCycle={12} value={from} onChange={handleFromChange} aria-label="Start time" />
        <p>To</p>
        <TimeInput id="end-time" hourCycle={12} value={to} onChange={handleToChange} aria-label="End time" />
      </div>

      <Button className="mt-4 w-fit" onClick={handleApply}>
        Apply
      </Button>
    </div>
  );
}
