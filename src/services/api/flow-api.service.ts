import { FlowModel, NodeModel, EdgeModel, NodeOption } from "../../models";
import { FlowService } from "../@interfaces";
import { FlowDTO } from "../@types";

export class APIFlowService implements FlowService {
  private static instance: APIFlowService;

  static getInstance(): APIFlowService {
    if (!APIFlowService.instance) {
      APIFlowService.instance = new APIFlowService();
    }
    return APIFlowService.instance;
  }

  private constructor() {}

  listFlows(): Promise<FlowModel[]> {
    throw new Error("Method not implemented.");
  }
  listNodes(): Promise<NodeModel[]> {
    throw new Error("Method not implemented.");
  }
  listEdges(): Promise<EdgeModel[]> {
    throw new Error("Method not implemented.");
  }
  loadFlow(uuid: string): Promise<FlowDTO> {
    throw new Error(`Method not implemented. ${uuid}`);
  }
  saveFlow(model: FlowDTO): Promise<FlowDTO> {
    throw new Error(`Method not implemented. ${model}`);
  }
  deleteFlow(uuid: string): Promise<void> {
    throw new Error(`Method not implemented. ${uuid}`);
  }
  createNode(partial: Partial<NodeModel>): Promise<NodeModel> {
    throw new Error(`Method not implemented. ${partial}`);
  }
  createEdge(partial: Partial<EdgeModel>): Promise<EdgeModel> {
    throw new Error(`Method not implemented. ${partial}`);
  }
  updateNodes(nodes: NodeModel[]): Promise<NodeModel[]> {
    throw new Error(`Method not implemented. ${nodes}`);
  }
  getAutosave(): Promise<boolean> {
    throw new Error(`Method not implemented.`);
  }
  setAutosave(value: boolean): Promise<void> {
    throw new Error(`Method not implemented. ${value}`);
  }
  deleteNodes(nodes: string[]): Promise<void> {
    throw new Error(`Method not implemented. ${nodes}`);
  }
  deleteEdges(edges: string[]): Promise<void> {
    throw new Error(`Method not implemented. ${edges}`);
  }
  addNodeOption(option: NodeOption): Promise<NodeOption> {
    throw new Error(`Method not implemented. ${option}`);
  }
  deleteNodeOption(option: NodeOption): Promise<void> {
    throw new Error(`Method not implemented. ${option}`);
  }
}
