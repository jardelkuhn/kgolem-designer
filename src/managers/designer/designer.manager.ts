import {
  Connection,
  Edge,
  ReactFlowJsonObject,
  XYPosition,
} from "@xyflow/react";

import { AppNode } from "../../pages/canvas/components/nodes/types";
import { EdgeModel, FlowModel, NodeData, NodeModel } from "../../models";
import { FlowModelBuilder } from "../../models/builders";
import { LocaleService } from "../../services/common";
import { Nullable } from "../../@types";
import { FlowDTO } from "../../services/@types";
import { CustomNodeType } from "../../pages/canvas/components/nodes/@interfaces";
import { ServicesModule } from "../../services/services.module";
import { CustomEdgeType } from "../../pages/canvas/components/edges/@interfaces";

export class DesignerManager {
  private static instance: DesignerManager;

  public static getInstance(): DesignerManager {
    if (!DesignerManager.instance) {
      DesignerManager.instance = new DesignerManager();
    }
    return DesignerManager.instance;
  }

  private readonly serviceModule: ServicesModule;

  private flowModel: Nullable<FlowModel> = null;
  private edgesModel: EdgeModel[] = [];
  private nodesModel: NodeModel[] = [];

  constructor() {
    this.serviceModule = ServicesModule.getInstance();
  }

  public reset() {
    this.flowModel = new FlowModelBuilder()
      .setViewport({
        x: 0,
        y: 0,
        zoom: 1,
      })
      .setTitle(
        `Flow ${LocaleService.getInstance().formatNumericDate(new Date())}`
      )
      .build();

    this.edgesModel = [];
    this.nodesModel = [];
  }

  public getFlowModel(): Nullable<FlowModel> {
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

  async listFlows(): Promise<FlowModel[]> {
    return await this.serviceModule.getFlowService().listFlows();
  }

  async loadFlow(uuid: string): Promise<FlowDTO> {
    const flow = await this.serviceModule.getFlowService().loadFlow(uuid);

    this.flowModel = flow.flow;
    this.edgesModel = flow.edges;
    this.nodesModel = flow.nodes;

    return flow;
  }

  async deleteFlow(uuid: string): Promise<void> {
    await this.serviceModule.getFlowService().deleteFlow(uuid);

    this.reset();
  }

  async save(instance: ReactFlowJsonObject<AppNode, Edge>): Promise<void> {
    if (this.flowModel) {
      const mergedEdges: { [designerId: string]: EdgeModel } = {};

      instance.edges.forEach((e) => {
        mergedEdges[e.id] = {
          animated: e.animated,
          source: e.source,
          sourceHandle: e.sourceHandle,
          target: e.target,
          targetHandle: e.targetHandle,
          type: e.type,
          designerId: e.id,
        } as EdgeModel;
      });

      this.edgesModel.forEach((e) => {
        if (mergedEdges[e.designerId]) {
          mergedEdges[e.designerId] = {
            ...mergedEdges[e.designerId],

            designerId: e.designerId,
            ref_flow: e.ref_flow,
            uuid: e.uuid,
          } as EdgeModel;
        }
      });

      // merging nodes
      const mergedNodes: { [designerId: string]: NodeModel } = {};

      instance.nodes.forEach((n) => {
        mergedNodes[n.id] = {
          type: n.type,
          position: n.position,
          data: n.data,
          designerId: n.id,
        } as NodeModel;
      });

      this.nodesModel.forEach((n) => {
        if (mergedNodes[n.designerId]) {
          mergedNodes[n.designerId] = {
            ...mergedNodes[n.designerId],

            ref_flow: n.ref_flow,
            designerId: n.designerId,
            uuid: n.uuid,
          } as NodeModel;
        }
      });

      const instanceFlow = {
        ...this.flowModel,
        viewport: instance.viewport,
      };

      const { flow, nodes, edges } = await this.serviceModule
        .getFlowService()
        .saveFlow({
          flow: instanceFlow,
          nodes: Object.values(mergedNodes),
          edges: Object.values(mergedEdges),
        });

      this.flowModel = flow;
      this.nodesModel = nodes;
      this.edgesModel = edges;
    }
  }

  async createNode(
    position: XYPosition,
    type: CustomNodeType,
    data: NodeData
  ): Promise<NodeModel> {
    const nodeModel = NodeModel.build(
      position,
      type,
      data,
      this.flowModel?.uuid
    );

    this.nodesModel.push(nodeModel);

    return nodeModel;
  }

  async createEdge(connection: Connection): Promise<EdgeModel> {
    const edgeModel = EdgeModel.build(
      connection,
      CustomEdgeType.CustomEdge,
      this.flowModel?.uuid
    );

    this.edgesModel.push(edgeModel);

    return edgeModel;
  }
}
