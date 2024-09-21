import { ReactElement } from "react";
import type { BuiltInNode } from "@xyflow/react";

import { WANode } from "./wa/types";
import { NodeType } from ".";

export type CustomNodeProps = {
  label: string;
  handles: ReactElement[];
};

export type DnDProps = {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: NodeType) => void;
};

export type AppNode = BuiltInNode | WANode;
