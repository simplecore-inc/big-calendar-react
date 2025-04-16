import { format } from "date-fns";

import { useDisclosure } from "@/hooks/use-disclosure";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DayPicker } from "@/components/old-ui/day-picker";

import { cn } from "@/utils/helpers/cn.helper";

import type { ButtonHTMLAttributes } from "react";

// ================================== //

type TProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "value"> & {
  readonly onSelect: (value: Date | undefined) => void;
  readonly value?: Date | undefined;
  readonly placeholder: string;
  readonly labelVariant?: "P" | "PP" | "PPP";
};

function SingleDayPickerInput({ id, onSelect, className, placeholder, labelVariant = "PPP", value, ...props }: TProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleSelect = (date: Date | undefined) => {
    onSelect(date);
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onToggle} modal>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn("group relative h-9 w-full justify-start whitespace-nowrap px-3 py-2 font-normal hover:bg-inherit", className)}
          {...props}
        >
          {value && <span>{format(value, labelVariant)}</span>}
          {!value && <span className="text-muted-foreground">{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-2">
        <DayPicker className="p-1" mode="single" selected={value} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

// ================================== //

export { SingleDayPickerInput };
