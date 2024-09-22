import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start/node";
import { WAPlainTextNode } from "./wa/plain-text/node";
import { WAOptionsNode } from "./wa/options/node";

export enum NodeType {
  WAStart = "WAStart",
  WAOptions = "WAOptions",
  WAPlainText = "WAPlainText",
}

export const nodeTypes = {
  WAStart: WAStartNode,
  WAOptions: WAOptionsNode,
  WAPlainText: WAPlainTextNode,
} satisfies NodeTypes;
