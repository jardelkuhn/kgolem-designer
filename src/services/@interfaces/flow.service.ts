import { DesignerDTO, EdgeDTO, FlowDTO, NodeDTO, NodeOptionDTO } from "../dtos";

export interface FlowService {
  listFlows(): Promise<FlowDTO[]>;
  listNodes(): Promise<NodeDTO[]>;
  listEdges(): Promise<EdgeDTO[]>;

  loadFlow(uuid: string): Promise<DesignerDTO>;
  saveFlow(model: DesignerDTO): Promise<DesignerDTO>;
  deleteFlow(uuid: string): Promise<void>;

  createNode(partial: Partial<NodeDTO>): Promise<NodeDTO>;
  createEdge(partial: Partial<EdgeDTO>): Promise<EdgeDTO>;

  addNodeOption(option: NodeOptionDTO): Promise<NodeOptionDTO>;
  deleteNodeOption(option: NodeOptionDTO): Promise<void>;
  updateNodes(nodes: NodeDTO[]): Promise<NodeDTO[]>;
  deleteNodes(nodes: string[]): Promise<void>;

  deleteEdges(edges: string[]): Promise<void>;

  setAutosave(value: boolean): Promise<void>;
  getAutosave(): Promise<boolean>;
}
