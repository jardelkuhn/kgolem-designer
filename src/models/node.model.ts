import { XYPosition } from "@xyflow/react";

import { CustomNodeType } from "../pages/canvas/components/nodes/@interfaces";
import { Nullable } from "../@types";
import { AppNode } from "../pages/canvas/components/nodes/types";

export interface Position {
  x: number;
  y: number;
}

export interface NodeOption {
  uuid?: string;
  nodeUuid?: Nullable<string>;
  label: string;

  designerId: string;
  nodeDesignerId: string;
}

export type NodeData = {
  readonly label: string;
  readonly options: NodeOption[];
};

export class NodeModel {
  uuid: Nullable<string>;
  type: CustomNodeType;
  position: Position;
  data: NodeData;

  ref_flow: Nullable<string>;

  designerId: string;

  constructor(
    uuid: Nullable<string>,
    type: CustomNodeType,
    position: Position,
    data: NodeData,
    ref_flow: Nullable<string>,
    designerId: string
  ) {
    this.uuid = uuid;
    this.type = type;
    this.position = position;
    this.data = data;
    this.ref_flow = ref_flow;
    this.designerId = designerId;
  }

  static build(
    position: XYPosition,
    type: CustomNodeType,
    data: NodeData,
    flowUuid: Nullable<string>
  ): NodeModel {
    const model = new NodeModel(
      undefined,
      type,
      position,
      data,
      flowUuid,
      crypto.randomUUID()
    );

    return model;
  }

  toInstance(): AppNode {
    return {
      id: this.designerId,
      data: this.data,
      type: this.type,
      position: this.position,
    } as AppNode;
  }
}
