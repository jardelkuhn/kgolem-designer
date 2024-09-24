import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start/node";
import { WAOptionsNode } from "./wa/options/node";
import { WAPlainTextNode } from "./wa/plain-text/node";

export const nodeTypes: AppNodeTypes = {
  WAStart: WAStartNode,
  WAOptions: WAOptionsNode,
  WAPlainText: WAPlainTextNode,
};

export type AppNodeTypes = NodeTypes & object;
