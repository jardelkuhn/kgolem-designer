import type { Node } from "@xyflow/react";

export type WAStartNodeType = Node<{ label: string }, "WAStart">;
export type WAPlainTextNodeType = Node<{ label: string }, "WAPlainText">;

export type WANode = WAStartNodeType | WAPlainTextNodeType;
