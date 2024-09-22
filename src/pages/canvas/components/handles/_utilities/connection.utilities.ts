import { Connection } from "@xyflow/react";

export function isConnection(edge: unknown): edge is Connection {
  return (edge as Connection).source !== undefined;
}
