import { Edge, ReactFlowInstance, ReactFlowJsonObject } from "@xyflow/react";
import { RepositoryManager } from "../../repository";
import { AppNode } from "../../pages/canvas/components/nodes/types";
import { FlowModel } from "../../models";
import { FlowModelBuilder } from "../../models/builders";

export class DesignerService {
  private static instance: DesignerService;

  public static getInstance(): DesignerService {
    if (!DesignerService.instance) {
      DesignerService.instance = new DesignerService();
    }
    return DesignerService.instance;
  }

  private readonly repoitoryManager: RepositoryManager;

  private flowModel: FlowModel | null = null;

  constructor() {
    this.repoitoryManager = RepositoryManager.getInstance();
  }

  public initializeFlowInstance(reactFlowInstance: ReactFlowInstance<AppNode>) {
    this.flowModel = new FlowModelBuilder()
      .setFlowInstance(reactFlowInstance)
      .build();

    return reactFlowInstance;
  }

  public getFlowModel(): FlowModel | null {
    // Implement your loading logic here
    return this.flowModel; // Retrieve from storage or API
  }

  // public getReactFlowInstance(): ReactFlowInstance<AppNode> {
  //   if (!this.flowModel) {
  //     throw new Error("Flow model is not loaded");
  //   }

  //   // Convert FlowModel to ReactFlowInstance if necessary
  //   // Assuming ReactFlowInstance is based on nodes and edges
  //   return {
  //     nodes: [], // Transform FlowModel.nodes to ReactFlowInstance nodes
  //     edges: [], // Transform FlowModel.edges to ReactFlowInstance edges
  //   };
  // }

  async save(instance: ReactFlowJsonObject<AppNode, Edge>): Promise<void> {
    console.log(instance);

    // localStorage.setItem(flowKey, JSON.stringify(instance));
  }
}
