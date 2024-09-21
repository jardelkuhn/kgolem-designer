import * as React from "react";
import { ReactFlowProvider } from "@xyflow/react";

import { CanvasProvider } from "./canvas/canvas.provider";
import { DnDProvider } from "./dnd/dnd.provider";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <CanvasProvider>{children}</CanvasProvider>
      </DnDProvider>
    </ReactFlowProvider>
  );
}
