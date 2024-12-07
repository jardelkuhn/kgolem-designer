import { EdgeModel } from "./edge.model";
import { FlowModel } from "./flow.model";
import { NodeModel } from "./node.model";

export interface DesignerModel {
  flow: FlowModel;
  nodes: NodeModel[];
  edges: EdgeModel[];
}
