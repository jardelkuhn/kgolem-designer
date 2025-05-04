import type { Node } from "@xyflow/react";

import { NodeData } from "../../../../../models";

export type WAStartNodeType = Node<NodeData, "WAStart">;
export type WAConcludeNodeType = Node<NodeData, "WAConclude">;
export type WAPlainTextNodeType = Node<NodeData, "WAPlainText">;
export type WAOptionsNodeType = Node<NodeData, "WAOptions">;
export type WAAwaitTextNodeType = Node<NodeData, "WAAwaitText">;
export type WAImageNodeType = Node<NodeData, "WAImage">;
export type WAVideoNodeType = Node<NodeData, "WAVideo">;
export type WADocumentNodeType = Node<NodeData, "WADocument">;
export type WATemplateNodeType = Node<NodeData, "WATemplate">;

export type WANode =
  | WAStartNodeType
  | WAConcludeNodeType
  | WAPlainTextNodeType
  | WAOptionsNodeType
  | WAAwaitTextNodeType
  | WAImageNodeType
  | WAVideoNodeType
  | WADocumentNodeType
  | WATemplateNodeType;
