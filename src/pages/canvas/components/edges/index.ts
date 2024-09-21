import type { EdgeTypes } from "@xyflow/react";

import CustomEdge from "./custom";

export enum EdgeType {
  CustomEdge = "CustomEdge",
}

export const edgeTypes = {
  CustomEdge: CustomEdge,
} satisfies EdgeTypes;
