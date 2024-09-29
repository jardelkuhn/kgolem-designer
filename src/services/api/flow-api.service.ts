import { FlowModel, NodeModel, EdgeModel } from "../../models";
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
}
