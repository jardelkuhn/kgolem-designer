import { FlowService } from "../@interfaces";
import { DesignerDTO, EdgeDTO, FlowDTO, NodeDTO, NodeOptionDTO } from "../dtos";

export class APIFlowService implements FlowService {
  private static instance: APIFlowService;

  static getInstance(): APIFlowService {
    if (!APIFlowService.instance) {
      APIFlowService.instance = new APIFlowService();
    }
    return APIFlowService.instance;
  }

  private constructor() {}

  listFlows(): Promise<FlowDTO[]> {
    throw new Error("Method not implemented.");
  }
  listNodes(): Promise<NodeDTO[]> {
    throw new Error("Method not implemented.");
  }
  listEdges(): Promise<EdgeDTO[]> {
    throw new Error("Method not implemented.");
  }
  loadFlow(uuid: string): Promise<DesignerDTO> {
    throw new Error(`Method not implemented. ${uuid}`);
  }
  saveFlow(model: DesignerDTO): Promise<DesignerDTO> {
    throw new Error(`Method not implemented. ${model}`);
  }
  deleteFlow(uuid: string): Promise<void> {
    throw new Error(`Method not implemented. ${uuid}`);
  }
  createNode(partial: Partial<NodeDTO>): Promise<NodeDTO> {
    throw new Error(`Method not implemented. ${partial}`);
  }
  createEdge(partial: Partial<EdgeDTO>): Promise<EdgeDTO> {
    throw new Error(`Method not implemented. ${partial}`);
  }
  updateNodes(nodes: NodeDTO[]): Promise<NodeDTO[]> {
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
  addNodeOption(option: NodeOptionDTO): Promise<NodeOptionDTO> {
    throw new Error(`Method not implemented. ${option}`);
  }
  deleteNodeOption(option: NodeOptionDTO): Promise<void> {
    throw new Error(`Method not implemented. ${option}`);
  }
}
