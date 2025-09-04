import { memo } from "react";
import { useDragLayer } from "react-dnd";

import { DragPreview } from "@/calendar/components/dnd/drag-preview";

import type { IEvent } from "@/calendar/interfaces";
import type { XYCoord } from "react-dnd";

interface IDragItem {
  event: IEvent;
  children: React.ReactNode;
  width: number;
  height: number;
}

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null, initialClientOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset || !initialClientOffset) {
    return {
      display: "none",
    };
  }

  const offsetX = initialClientOffset.x - initialOffset.x;
  const offsetY = initialClientOffset.y - initialOffset.y;
  const x = currentOffset.x - offsetX;
  const y = currentOffset.y - offsetY;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer = memo(() => {
  const { isDragging, item, currentOffset, initialOffset, initialClientOffset } = useDragLayer(monitor => ({
    item: monitor.getItem() as IDragItem | null,
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }));

  if (!isDragging || !item) {
    return null;
  }

  const styles = getItemStyles(initialOffset, currentOffset, initialClientOffset);

  // Early return if position can't be calculated
  if (styles.display === "none") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <DragPreview item={item} transform={styles.transform || ""} />
    </div>
  );
});

CustomDragLayer.displayName = "CustomDragLayer";
