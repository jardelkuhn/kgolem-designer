import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start/node";
import { WAOptionsNode } from "./wa/options/node";
import { WAPlainTextNode } from "./wa/plain-text/node";

export enum NodeType {
  WAStart = "WAStart",
  WAOptions = "WAOptions",
  WAPlainText = "WAPlainText",
}

export const nodeTypes: CustomNodeTypes = {
  WAStart: WAStartNode,
  WAOptions: WAOptionsNode,
  WAPlainText: WAPlainTextNode,
};

export type CustomNodeTypes = NodeTypes & object;
