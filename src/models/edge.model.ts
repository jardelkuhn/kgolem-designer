import { Connection, Edge } from "@xyflow/react";

import { Nullable } from "../@types";
import { CustomEdgeType } from "../pages/canvas/components/edges/@interfaces";

export class EdgeModel {
  uuid: Nullable<string>;
  source: string;
  sourceHandle: Nullable<string>;
  target: string;
  targetHandle: Nullable<string>;
  animated: Nullable<boolean>;
  type: CustomEdgeType;

  ref_flow: Nullable<string>;

  designerId: string;

  constructor(source: string, target: string, type: CustomEdgeType) {
    this.source = source;
    this.target = target;
    this.type = type;
    this.designerId = crypto.randomUUID();
  }

  static build(
    connection: Connection | Edge,
    type: CustomEdgeType,
    flowUuid: Nullable<string>
  ) {
    const model = new EdgeModel(connection.source, connection.target, type);

    model.sourceHandle = connection.sourceHandle;
    model.targetHandle = connection.targetHandle;
    model.animated = true;
    model.ref_flow = flowUuid;

    return model;
  }

  toInstance(): Edge {
    return {
      id: this.designerId,
      source: this.source,
      sourceHandle: this.sourceHandle,
      target: this.target,
      targetHandle: this.targetHandle,
      animated: this.animated,
      type: this.type,
    } as Edge;
  }
}
