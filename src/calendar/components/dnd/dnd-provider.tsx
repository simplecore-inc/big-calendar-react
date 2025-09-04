import { memo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CustomDragLayer } from "@/calendar/components/dnd/custom-drag-layer";

interface DndProviderWrapperProps {
  children: React.ReactNode;
}

// Configure HTML5 backend options for better performance
const backendOptions = {
  rootElement: undefined, // Will use document by default
};

export const DndProviderWrapper = memo(({ children }: DndProviderWrapperProps) => {
  return (
    <DndProvider backend={HTML5Backend} options={backendOptions}>
      {children}
      <CustomDragLayer />
    </DndProvider>
  );
});

DndProviderWrapper.displayName = "DndProviderWrapper";
