import { memo, useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";

import { useUpdateEvent } from "@/hooks/use-events";

import { cn } from "@/lib/utils";
import { ItemTypes } from "@/calendar/components/dnd/draggable-event";

import type { IEvent } from "@/calendar/interfaces";

interface DroppableTimeBlockProps {
  date: Date;
  hour: number;
  minute: number;
  children: React.ReactNode;
}

export const DroppableTimeBlock = memo(({ date, hour, minute, children }: DroppableTimeBlockProps) => {
  const updateEventMutation = useUpdateEvent();

  // Memoize the drop handler
  const handleDrop = useCallback(
    (item: { event: IEvent; durationMs?: number }) => {
      const droppedEvent = item.event;
      const eventDurationMs = item.durationMs ?? 0;

      const newStartDate = new Date(date);
      newStartDate.setHours(hour, minute, 0, 0);
      const newEndDate = new Date(newStartDate.getTime() + eventDurationMs);

      const updatedEvent = {
        ...droppedEvent,
        startDate: newStartDate.toISOString(),
        endDate: newEndDate.toISOString(),
      };

      // Use microtask instead of setTimeout for better performance
      queueMicrotask(() => {
        updateEventMutation.mutate(updatedEvent, {
          onError: _error => {
            // Error is handled by the mutation hook
          },
        });
      });

      return { moved: true };
    },
    [date, hour, minute, updateEventMutation]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.EVENT,
      drop: handleDrop,
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleDrop]
  );

  // Memoize className to prevent recalculation
  const className = useMemo(() => cn("h-[24px] relative", isOver && "bg-accent/50"), [isOver]);

  return (
    <div ref={drop as unknown as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
});

DroppableTimeBlock.displayName = "DroppableTimeBlock";
