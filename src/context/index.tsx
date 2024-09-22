import * as React from "react";
import { ReactFlowProvider } from "@xyflow/react";

import { DnDProvider } from "./dnd/dnd.provider";
import { DesignerProvider } from "./designer";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DesignerProvider>{children}</DesignerProvider>
      </DnDProvider>
    </ReactFlowProvider>
  );
}
