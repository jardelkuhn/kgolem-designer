import { ReactElement } from "react";
import type { BuiltInNode } from "@xyflow/react";

import { WANode } from "./wa/types";
import { NodeType } from ".";
import { ShapeOption } from "./shapes/@types/shape.props";

export type CustomNodeProps = {
  label: string;
  handles: ReactElement[];
  options?: ShapeOption[];
};

export type DnDProps = {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, type: NodeType) => void;
};

export type AppNode = BuiltInNode | WANode;
