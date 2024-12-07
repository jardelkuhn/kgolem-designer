import { NodeSampleFactory } from "..";
import { NodeModel } from "../../../../models";
import { CustomNodeType } from "../../../../pages/canvas/components/nodes/@interfaces";

export const waOptionsNodeSamples = (persisted = true): NodeModel[] => [
  NodeSampleFactory.createNodeSample({
    position: { x: 1, y: 1 },
    type: CustomNodeType.WAOptions,
    description: "WAOptions 1 description",
    persisted,
  }),
  NodeSampleFactory.createNodeSample({
    position: { x: 2, y: 2 },
    type: CustomNodeType.WAOptions,
    description: "WAOptions 2 description",
    persisted,
  }),
  NodeSampleFactory.createNodeSample({
    position: { x: 3, y: 3 },
    type: CustomNodeType.WAOptions,
    description: "WAOptions 3 description",
    persisted,
  }),
];
