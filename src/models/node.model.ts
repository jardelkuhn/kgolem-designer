import { CustomNodeType } from "../pages/canvas/components/nodes/@interfaces";
import { Nullable } from "../@types";

export interface Position {
  x: number;
  y: number;
}

export interface NodeOption {
  uuid?: string;
  label: string;

  designerId: string;
}

export interface Data {
  label: string;
  options: NodeOption[];
}

export class NodeModel {
  uuid: Nullable<string>;
  type: CustomNodeType;
  position: Position;
  data: Data;

  ref_flow: string;

  designerId: string;

  constructor(
    uuid: Nullable<string>,
    type: CustomNodeType,
    position: Position,
    data: Data,
    ref_flow: string
  ) {
    this.uuid = uuid;
    this.type = type;
    this.position = position;
    this.data = data;
    this.ref_flow = ref_flow;
    this.designerId = crypto.randomUUID();
  }
}
