import { NodeSampleFactory } from "..";
import { NodeModel } from "../../../../models";
import { CustomNodeType } from "../../../../pages/canvas/components/nodes/@interfaces";

export const waStartNodeSamples = (persisted = true): NodeModel[] => [
  NodeSampleFactory.createNodeSample({
    position: { x: 1, y: 1 },
    type: CustomNodeType.WAStart,
    description: "WAStart 1 description",
    persisted,
  }),
  NodeSampleFactory.createNodeSample({
    position: { x: 2, y: 2 },
    type: CustomNodeType.WAStart,
    description: "WAStart 2 description",
    options: [{ label: "Option 1", nodeUuid: "", nodeDesignerId: "" }],
    persisted,
  }),
  NodeSampleFactory.createNodeSample({
    position: { x: 3, y: 3 },
    type: CustomNodeType.WAStart,
    description: "WAStart 3 description",
    options: [
      { label: "Option 1", nodeUuid: "", nodeDesignerId: "" },
      { label: "Option 2", nodeUuid: "", nodeDesignerId: "" },
      { label: "Option 3", nodeUuid: "", nodeDesignerId: "" },
    ],
    persisted,
  }),
];
