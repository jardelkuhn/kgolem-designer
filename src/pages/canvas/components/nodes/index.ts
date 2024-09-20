import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start";
import { WAPlainTextNode } from "./wa/plain-text";

export const nodeTypes = {
  WAStart: WAStartNode,
  WAPlainText: WAPlainTextNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
