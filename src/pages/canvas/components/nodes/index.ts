import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import { WAStartNode } from "./wa/start";
import { WAPlainTextNode } from "./wa/plain-text";

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
    type: "WAStart",
    position: { x: 0, y: 250 },
    data: { label: "wa-start node1" },
  },
  {
    id: "f",
    type: "WAPlainText",
    position: { x: 100, y: 250 },
    data: { label: "wa-plaintext node1" },
  },
];

export const nodeTypes = {
  WAStart: WAStartNode,
  WAPlainText: WAPlainTextNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
