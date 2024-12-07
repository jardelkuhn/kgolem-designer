import { NodeSampleFactory } from "..";
import { NodeModel } from "../../../../models";
import { CustomNodeType } from "../../../../pages/canvas/components/nodes/@interfaces";

export const waPlainTextNodeSamples = (persisted = true): NodeModel[] => [
  NodeSampleFactory.createNodeSample({
    position: { x: 1, y: 1 },
    type: CustomNodeType.WAPlainText,
    description: "WAPlainText 1 description",
    persisted,
  }),
  NodeSampleFactory.createNodeSample({
    position: { x: 2, y: 2 },
    type: CustomNodeType.WAPlainText,
    description: "WAPlainText 2 description",
    persisted,
  }),
  NodeSampleFactory.createNodeSample({
    position: { x: 3, y: 3 },
    type: CustomNodeType.WAPlainText,
    description: "WAPlainText 3 description",
    persisted,
  }),
];
