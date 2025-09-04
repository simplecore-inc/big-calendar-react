import { memo, useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";

import { useUpdateEvent } from "@/hooks/use-events";

import { cn } from "@/lib/utils";
import { ItemTypes } from "@/calendar/components/dnd/draggable-event";

import type { IEvent, ICalendarCell } from "@/calendar/interfaces";

interface DroppableDayCellProps {
  cell: ICalendarCell;
  children: React.ReactNode;
}

export const DroppableDayCell = memo(({ cell, children }: DroppableDayCellProps) => {
  const updateEventMutation = useUpdateEvent();

  // Memoize the drop handler
  const handleDrop = useCallback(
    (item: { event: IEvent; durationMs?: number }) => {
      const droppedEvent = item.event;
      const eventDurationMs = item.durationMs ?? 0;

      const eventStartDate = new Date(droppedEvent.startDate);
      const newStartDate = new Date(cell.date);
      newStartDate.setHours(eventStartDate.getHours(), eventStartDate.getMinutes(), eventStartDate.getSeconds(), eventStartDate.getMilliseconds());
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
    [cell.date, updateEventMutation]
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
  const className = useMemo(() => cn(isOver && "bg-accent/50"), [isOver]);

  return (
    <div ref={drop as unknown as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
});

DroppableDayCell.displayName = "DroppableDayCell";
