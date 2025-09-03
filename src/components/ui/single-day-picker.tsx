import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SingleDayPickerProps {
  value?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  id?: string
  "data-invalid"?: boolean
}

const SingleDayPicker = React.forwardRef<HTMLButtonElement, SingleDayPickerProps>(
  ({ value, onSelect, placeholder = "Pick a date", className, id, "data-invalid": dataInvalid, ...props }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              dataInvalid && "border-destructive",
              className
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
SingleDayPicker.displayName = "SingleDayPicker"

export { SingleDayPicker }