import {
  Connection,
  Edge,
  ReactFlowJsonObject,
  XYPosition,
} from "@xyflow/react";
import { plainToInstance } from "class-transformer";

import { AppNode } from "../../pages/canvas/components/nodes/types";
import {
  EdgeModel,
  FlowModel,
  NodeData,
  NodeModel,
  NodeOption,
} from "../../models";
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

  private autosave = false;

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
      .setTitle(`Flow ${LocaleService.getInstance().formatDate(new Date())}`)
      .build();

    this.edgesModel = [];
    this.nodesModel = [];
  }

  public getFlowModel(): Nullable<FlowModel> {
    return this.flowModel;
  }

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
    let nodeModel = NodeModel.build(position, type, data, this.flowModel?.uuid);

    if (this.autosave) {
      nodeModel = await this.serviceModule
        .getFlowService()
        .createNode(nodeModel);

      nodeModel = plainToInstance(NodeModel, nodeModel);
    }

    this.nodesModel.push(nodeModel);

    return nodeModel;
  }

  async createEdge(connection: Connection): Promise<EdgeModel> {
    let edgeModel = EdgeModel.build(
      connection,
      CustomEdgeType.CustomEdge,
      this.flowModel?.uuid
    );

    if (this.autosave) {
      edgeModel = await this.serviceModule
        .getFlowService()
        .createEdge(edgeModel);

      edgeModel = plainToInstance(EdgeModel, edgeModel);
    }

    this.edgesModel.push(edgeModel);

    return edgeModel;
  }

  async updateNodePosition(nodes: AppNode[]): Promise<void> {
    this.nodesModel.forEach((current) => {
      const update = nodes.find((each) => each.id === current.designerId);

      if (update) {
        current.position = update.position;
      }
    });

    if (this.autosave) {
      await this.serviceModule.getFlowService().updateNodes(this.nodesModel);
    }
  }

  async newFlow(): Promise<FlowDTO> {
    this.reset();

    return this.createFlow({
      flow: this.flowModel!,
      edges: [],
      nodes: [],
    });
  }

  async deleteNodes(nodes: string[]) {
    this.nodesModel = this.nodesModel.filter(
      (current) =>
        !nodes.find((designerId) => designerId === current.designerId)
    );

    await this.serviceModule
      .getFlowService()
      .deleteNodes(this.nodesModel.map((n) => n.uuid!));
  }

  async deleteEdges(edges: string[]) {
    this.edgesModel = this.edgesModel.filter(
      (current) =>
        !edges.find((designerId) => designerId === current.designerId)
    );

    await this.serviceModule
      .getFlowService()
      .deleteEdges(this.edgesModel.map((e) => e.uuid!));
  }

  async createOption(nodeDesignerId: string): Promise<NodeOption> {
    const node = this.nodesModel.find((n) => n.designerId === nodeDesignerId);

    if (node) {
      let option = {
        designerId: crypto.randomUUID(),
        label: "Option",
        nodeUuid: node.uuid,
        nodeDesignerId: node.designerId,
      } as NodeOption;

      if (this.autosave) {
        option = await this.serviceModule
          .getFlowService()
          .addNodeOption(option);
      }

      return option;
    }

    throw Error(`Node not found ${nodeDesignerId}`);
  }

  async deleteOption(option: NodeOption): Promise<void> {
    const node = this.nodesModel.find(
      (n) => n.designerId === option.nodeDesignerId
    );

    if (node) {
      const optionIndex = node.data.options.findIndex(
        (o) => o.designerId === option.designerId
      );

      node.data.options.splice(optionIndex, 1);

      if (this.autosave) {
        await this.serviceModule.getFlowService().deleteNodeOption(option);
      }
    }
  }

  async setAutosave(value: boolean): Promise<Nullable<FlowModel>> {
    this.autosave = value;

    await this.serviceModule.getFlowService().setAutosave(value);

    if (this.autosave && !this.flowModel?.uuid) {
      return (
        await this.createFlow({
          flow: this.flowModel!,
          nodes: [],
          edges: [],
        })
      ).flow;
    }

    return this.flowModel;
  }

  async getAutosave(): Promise<boolean> {
    const result = await this.serviceModule.getFlowService().getAutosave();

    this.autosave = result;

    return result;
  }

  private async createFlow(flowDto: FlowDTO): Promise<FlowDTO> {
    const flow = await this.serviceModule.getFlowService().saveFlow({
      flow: flowDto.flow,
      nodes: Object.values(flowDto.nodes),
      edges: Object.values(flowDto.edges),
    });

    this.flowModel = flow.flow;

    return flow;
  }
}
