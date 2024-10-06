import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start/node";
import { WAOptionsNode } from "./wa/options/node";
import { WAPlainTextNode } from "./wa/plain-text/node";
import { WAAwaitUserInputNode } from "./wa/await-user-input/node";

export const nodeTypes: AppNodeTypes = {
  WAStart: WAStartNode,
  WAOptions: WAOptionsNode,
  WAPlainText: WAPlainTextNode,
  WAAwaitUserInput: WAAwaitUserInputNode,
};

export type AppNodeTypes = NodeTypes & object;
