import { NodeType } from ".";
import { WANode } from "./wa/types";
import { NodeOption } from "./@interfaces";

export type CustomNodeProps = {
  label: string;
  options?: NodeOption[];
};

export type DnDProps = {
  readonly onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    type: NodeType
  ) => void;
};

export type AppNode = WANode;
