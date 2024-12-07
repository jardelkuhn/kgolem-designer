import { EdgeDTO } from "./edge.dto";
import { FlowDTO } from "./flow.dto";
import { NodeDTO } from "./node.dto";

export type DesignerDTO = {
  flow: FlowDTO;
  nodes: NodeDTO[];
  edges: EdgeDTO[];
};
