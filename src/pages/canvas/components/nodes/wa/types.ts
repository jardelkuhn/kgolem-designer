import type { Node } from "@xyflow/react";

import { NodeData } from "../../../../../models";

export type WAStartNodeType = Node<NodeData, "WAStart">;
export type WAPlainTextNodeType = Node<NodeData, "WAPlainText">;
export type WAOptionsNodeType = Node<NodeData, "WAOptions">;
export type WAAwaitUserInputNodeType = Node<NodeData, "WAAwaitUserInput">;

export type WANode = WAStartNodeType | WAPlainTextNodeType | WAOptionsNodeType | WAAwaitUserInputNodeType;
