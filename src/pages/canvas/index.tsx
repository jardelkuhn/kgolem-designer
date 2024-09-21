import { Background, Controls, MiniMap } from "@xyflow/react";

import { AppProvider } from "../../context/provider";

export default function CanvasPage() {
  return (
    <AppProvider>
      <Background />
      <MiniMap />
      <Controls />
    </AppProvider>
  );
}
