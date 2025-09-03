import { useDrop } from "react-dnd";
import { startTransition, useRef, useEffect, useState } from "react";

import { useUpdateEvent } from "@/hooks/use-events";

import { cn } from "@/lib/utils";
import { ItemTypes } from "@/calendar/components/dnd/draggable-event";

import type { IEvent, ICalendarCell } from "@/calendar/interfaces";

interface DroppableDayCellProps {
  cell: ICalendarCell;
  children: React.ReactNode;
}

export function DroppableDayCell({ cell, children }: DroppableDayCellProps) {
  const updateEventMutation = useUpdateEvent();
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.EVENT,
      drop: (item: { event: IEvent; durationMs?: number }) => {
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

        // Defer mutation to next tick to avoid blocking drop completion
        setTimeout(() => {
          startTransition(() => {
            updateEventMutation.mutate(updatedEvent, {
              onError: (_error) => {
                // Error is handled by the mutation hook
              },
            });
          });
        }, 0);

        return { moved: true };
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    }),
    [cell.date, updateEventMutation]
  );

  // Connect drop target to the container ref
  useEffect(() => {
    drop(containerRef);
  }, [drop]);

  // Throttle highlight updates with rAF
  useEffect(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setIsHighlighted(isOver);
    });

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isOver]);

  return (
    <div ref={containerRef} className={cn(isHighlighted && "bg-accent/50")}>
      {children}
    </div>
  );
}
