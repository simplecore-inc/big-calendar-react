import { memo, useRef, useEffect, useCallback } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { parseISO, differenceInMilliseconds } from "date-fns";

import { cn } from "@/lib/utils";

import type { IEvent } from "@/calendar/interfaces";

export const ItemTypes = {
  EVENT: "event",
} as const;

interface DraggableEventProps {
  event: IEvent;
  children: React.ReactNode;
}

export const DraggableEvent = memo(({ event, children }: DraggableEventProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Memoize the item getter function
  const getItem = useCallback(() => {
    const width = ref.current?.offsetWidth || 0;
    const height = ref.current?.offsetHeight || 0;
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    const durationMs = differenceInMilliseconds(end, start);
    return { event, children, width, height, durationMs };
  }, [event, children]);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.EVENT,
      item: getItem,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [getItem]
  );

  // Hide the default drag preview - only run once on mount
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Connect drag ref
  drag(ref);

  return (
    <div ref={ref} className={cn(isDragging && "opacity-40")} draggable>
      {children}
    </div>
  );
});

DraggableEvent.displayName = "DraggableEvent";
