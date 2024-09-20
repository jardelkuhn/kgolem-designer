import { Background, Controls, MiniMap } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { CanvasProvider } from "../../context/canvas/canvas.provider";

export default function CanvasPage() {
  return (
    <CanvasProvider>
      <Background />
      <MiniMap />
      <Controls />
    </CanvasProvider>
  );
}
