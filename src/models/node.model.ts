import { CustomNodeType } from "../pages/canvas/components/nodes/@interfaces";

export interface Position {
  x: number;
  y: number;
}

export interface NodeOption {
  uuid: string;
  label: string;
}

export interface Data {
  label: string;
  options: NodeOption[];
}

export interface Measured {
  width: number;
  height: number;
}

export interface NodeModel {
  uuid: string;
  type: CustomNodeType;
  position: Position;
  data: Data;
  measured: Measured;
  selected: boolean;
  dragging: boolean;

  ref_flow: string;
}
