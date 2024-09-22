import { Connection } from "@xyflow/react";

export function edgeIsConnection(edge: unknown): edge is Connection {
  return (edge as Connection).source !== undefined;
}
