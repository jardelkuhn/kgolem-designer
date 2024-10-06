import { EdgeModel, FlowModel, NodeModel, NodeOption } from "../../models";
import { FlowDTO } from "../@types";

export interface FlowService {
  listFlows(): Promise<FlowModel[]>;
  listNodes(): Promise<NodeModel[]>;
  listEdges(): Promise<EdgeModel[]>;

  loadFlow(uuid: string): Promise<FlowDTO>;
  saveFlow(model: FlowDTO): Promise<FlowDTO>;
  deleteFlow(uuid: string): Promise<void>;

  createNode(partial: Partial<NodeModel>): Promise<NodeModel>;
  createEdge(partial: Partial<EdgeModel>): Promise<EdgeModel>;

  addNodeOption(option: NodeOption): Promise<NodeOption>;
  deleteNodeOption(option: NodeOption): Promise<void>;
  updateNodes(nodes: NodeModel[]): Promise<NodeModel[]>;
  deleteNodes(nodes: string[]): Promise<void>;

  deleteEdges(edges: string[]): Promise<void>;

  setAutosave(value: boolean): Promise<void>;
  getAutosave(): Promise<boolean>;
}
