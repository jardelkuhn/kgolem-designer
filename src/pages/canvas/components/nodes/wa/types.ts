import type { Node } from "@xyflow/react";

import { CustomNodeProps } from "../types";

export type WAStartNodeType = Node<CustomNodeProps, "WAStart">;
export type WAPlainTextNodeType = Node<CustomNodeProps, "WAPlainText">;
export type WAOptionsNodeType = Node<CustomNodeProps, "WAOptions">;

export type WANode = WAStartNodeType | WAPlainTextNodeType | WAOptionsNodeType;
