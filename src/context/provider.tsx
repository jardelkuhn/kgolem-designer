import * as React from "react";

import { CanvasProvider } from "./canvas/canvas.provider";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return <CanvasProvider>{children}</CanvasProvider>;
}
