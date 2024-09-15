import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import { StartNode } from "./start";

export const initialNodes: AppNode[] = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },

  { id: "c", position: { x: 100, y: 150 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
  {
    id: "e",
    type: "start",
    position: { x: 0, y: 250 },
    data: { label: "start node1" },
  },
];

export const nodeTypes = {
  start: StartNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
