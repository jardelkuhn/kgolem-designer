import { EdgeModel, FlowModel, NodeModel } from "../../models";

export type FlowDTO = {
  flow: FlowModel;
  nodes: NodeModel[];
  edges: EdgeModel[];
};
