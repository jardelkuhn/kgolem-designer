import { EdgeModel, FlowModel, NodeModel } from "../../models";
import { FlowDTO } from "../@types";

export interface FlowService {
  // get(uuid: string): Promise<Nullable<FlowModel>>;
  // update(model: FlowModel): Promise<void>;
  // delete(uuid: string): Promise<void>;

  listFlows(): Promise<FlowModel[]>;
  listNodes(): Promise<NodeModel[]>;
  listEdges(): Promise<EdgeModel[]>;

  loadFlow(uuid: string): Promise<FlowDTO>;
  saveFlow(model: FlowDTO): Promise<FlowDTO>;
  deleteFlow(uuid: string): Promise<void>;

  createNode(partial: Partial<NodeModel>): Promise<NodeModel>;
  createEdge(partial: Partial<EdgeModel>): Promise<EdgeModel>;

  updateNodes(nodes: NodeModel[]): Promise<NodeModel[]>;

  setAutosave(value: boolean): Promise<void>;
  getAutosave(): Promise<boolean>;
}
