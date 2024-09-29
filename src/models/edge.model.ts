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

  constructor(
    uuid: Nullable<string>,
    source: string,
    sourceHandle: Nullable<string>,
    target: string,
    targetHandle: Nullable<string>,
    animated: Nullable<boolean>,
    type: CustomEdgeType,
    ref_flow: Nullable<string>,
    designerId: string
  ) {
    this.uuid = uuid;
    this.source = source;
    this.sourceHandle = sourceHandle;
    this.target = target;
    this.targetHandle = targetHandle;
    this.animated = animated;
    this.type = type;
    this.ref_flow = ref_flow;
    this.designerId = designerId;
  }

  static build(
    connection: Connection | Edge,
    type: CustomEdgeType,
    flowUuid: Nullable<string>
  ) {
    const model = new EdgeModel(
      undefined,
      connection.source,
      connection.sourceHandle,
      connection.target,
      connection.targetHandle,
      true,
      type,
      flowUuid,
      crypto.randomUUID()
    );

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
