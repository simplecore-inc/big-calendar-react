import { memo } from "react";

import type { IEvent } from "@/calendar/interfaces";

interface IDragItem {
  event: IEvent;
  children: React.ReactNode;
  width: number;
  height: number;
}

interface DragPreviewProps {
  item: IDragItem;
  transform: string;
}

export const DragPreview = memo(({ item, transform }: DragPreviewProps) => {
  return (
    <div
      style={{
        width: item.width,
        height: item.height,
        transform,
        WebkitTransform: transform,
      }}
    >
      {item.children}
    </div>
  );
});

DragPreview.displayName = "DragPreview";
