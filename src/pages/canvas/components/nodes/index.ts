import type { NodeTypes } from "@xyflow/react";

import { WAStartNode } from "./wa/start/node";
import { WAOptionsNode } from "./wa/options/node";
import { WAPlainTextNode } from "./wa/plain-text/node";
import { WAAwaitTextNode } from "./wa/await-text/node";
import { WAImageNode } from "./wa/image/node";
import { WAVideoNode } from "./wa/video/node";
import { WADocumentNode } from "./wa/document/node";
import { WATemplateNode } from "./wa/template/node";

export const nodeTypes: AppNodeTypes = {
  WAStart: WAStartNode,
  WAOptions: WAOptionsNode,
  WAPlainText: WAPlainTextNode,
  WAAwaitText: WAAwaitTextNode,
  WAImage: WAImageNode,
  WAVideo: WAVideoNode,
  WADocument: WADocumentNode,
  WATemplate: WATemplateNode,
};

export type AppNodeTypes = NodeTypes & object;
