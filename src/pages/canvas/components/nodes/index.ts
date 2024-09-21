import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start/node";
import { WAPlainTextNode } from "./wa/plain-text/node";

export enum NodeType {
  WAStart = "WAStart",
  WAPlainText = "WAPlainText",
}

export const nodeTypes = {
  WAStart: WAStartNode,
  WAPlainText: WAPlainTextNode,
} satisfies NodeTypes;
