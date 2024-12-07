import { Connection } from "@xyflow/react";
import { EdgeModel } from "../../../models";
import { generateUuid } from "../../utilities";
import { Nullable } from "../../../@types";
import { CustomEdgeType } from "../../../pages/canvas/components/edges/@interfaces";

type EdgeSampleOptions = {
  source: string;
  target: string;
  sourceHandle?: Nullable<string>;
  targetHandle?: Nullable<string>;
  type: CustomEdgeType;
  flowUuid?: Nullable<string>;
  animated?: Nullable<boolean>;
  persisted?: boolean; // New parameter
};

export class EdgeSampleFactory {
  static createEdgeSample({
    source,
    target,
    sourceHandle = null,
    targetHandle = null,
    type,
    flowUuid = null,
    animated = true,
    persisted = true,
  }: EdgeSampleOptions): EdgeModel {
    const edge = EdgeModel.build(
      { source, target, sourceHandle, targetHandle } as Connection,
      type,
      flowUuid
    );

    edge.uuid = persisted ? generateUuid().storage : null;
    edge.animated = animated;

    return edge;
  }

  static edgeSamples(persisted = true): EdgeModel[] {
    return [...edgeSamples(persisted)];
  }
}

// Usage Examples
export const edgeSamples = (persisted = true): EdgeModel[] => [
  EdgeSampleFactory.createEdgeSample({
    source: "node-1",
    target: "node-2",
    type: CustomEdgeType.CustomEdge,
    flowUuid: "sample-flow-uuid-1",
    persisted,
  }),
  EdgeSampleFactory.createEdgeSample({
    source: "node-2",
    target: "node-3",
    type: CustomEdgeType.CustomEdge,
    flowUuid: "sample-flow-uuid-1",
    persisted,
  }),
  EdgeSampleFactory.createEdgeSample({
    source: "node-3",
    target: "node-4",
    type: CustomEdgeType.CustomEdge,
    flowUuid: "sample-flow-uuid-2",
    persisted,
  }),
];
