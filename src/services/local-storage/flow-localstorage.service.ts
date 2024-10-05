import { plainToInstance } from "class-transformer";

import { EdgeModel, FlowModel, NodeModel } from "../../models";
import { FlowService } from "../@interfaces";
import { FlowDTO } from "../@types";
import { LocalStorageService } from "./repository";

export class LocalStorageFlowService implements FlowService {
  private static instance: LocalStorageFlowService;

  static getInstance(): LocalStorageFlowService {
    if (!LocalStorageFlowService.instance) {
      LocalStorageFlowService.instance = new LocalStorageFlowService();
    }
    return LocalStorageFlowService.instance;
  }

  private constructor() {}

  private readonly storageService = LocalStorageService.getInstance();

  async listFlows(): Promise<FlowModel[]> {
    const result =
      this.storageService.getValue<FlowModel[]>("flows-repository");

    return result ? plainToInstance(FlowModel, result) : [];
  }

  async listNodes(): Promise<NodeModel[]> {
    const result =
      this.storageService.getValue<NodeModel[]>("nodes-repository");

    return result ? plainToInstance(NodeModel, result) : [];
  }

  async listEdges(): Promise<EdgeModel[]> {
    const result =
      this.storageService.getValue<EdgeModel[]>("edges-repository");

    return result ? plainToInstance(EdgeModel, result) : [];
  }

  async saveFlow({ flow, nodes, edges }: FlowDTO): Promise<FlowDTO> {
    // FLOW
    flow.uuid = flow.uuid ?? crypto.randomUUID();

    const storageFlows = await this.listFlows();

    const isUpdate = storageFlows.findIndex((f) => f.uuid === flow.uuid);

    if (isUpdate > -1) {
      storageFlows[isUpdate] = {
        ...storageFlows[isUpdate],
        title: flow.title,
        viewport: flow.viewport,
        updatedAt: new Date(),
      };
    } else {
      storageFlows.push({
        uuid: flow.uuid,
        title: flow.title,
        viewport: flow.viewport,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    ///////////////
    // END OF FLOW
    //////////////

    // NODES

    const storageNodes = await this.listNodes();

    const newNodes = nodes.filter((n) => !n.uuid);
    const updateNodes = nodes.filter((n) => !!n.uuid);
    const removedNodes = storageNodes
      .filter((storedNode) => storedNode.ref_flow === flow.uuid)
      .filter(
        (storedNode) =>
          !updateNodes.some(
            (currentNode) => currentNode.uuid === storedNode.uuid
          )
      )
      .map((storedNode) => storedNode.uuid);

    // update existing nodes
    updateNodes.forEach((update) => {
      const storedNode = storageNodes.find((s) => s.uuid === update.uuid);
      if (storedNode) {
        storedNode.data = update.data;
        storedNode.position = update.position;
        storedNode.type = update.type;
      }
    });

    // add new nodes
    newNodes.forEach((nw) => {
      nw.data?.options?.forEach((o) => (o.uuid = crypto.randomUUID()));
      nw.uuid = crypto.randomUUID();
      nw.ref_flow = flow.uuid!;

      storageNodes.push(nw);
    });

    // remove deleted nodes
    removedNodes.forEach((uuid) => {
      const index = storageNodes.findIndex((edge) => edge.uuid === uuid);

      if (index !== -1) {
        storageNodes.splice(index, 1);
      }
    });

    ///////////////
    // END OF NODES
    //////////////

    // EDGES

    const storageEdges = await this.listEdges();

    const newEdges = edges.filter((e) => !e.uuid);
    const updateEdges = edges.filter((e) => !!e.uuid);
    const removedEdges = storageEdges
      .filter((storedEdge) => storedEdge.ref_flow === flow.uuid)
      .filter(
        (storedEdge) =>
          !updateEdges.some(
            (currentEdge) => currentEdge.uuid === storedEdge.uuid
          )
      )
      .map((storedEdge) => storedEdge.uuid);

    // update existing edges
    updateEdges.forEach((update) => {
      const storedEdge = storageEdges.find((s) => s.uuid === update.uuid);
      if (storedEdge) {
        storedEdge.animated = update.animated;
        storedEdge.source = update.source;
        storedEdge.sourceHandle = update.sourceHandle;
        storedEdge.target = update.target;
        storedEdge.targetHandle = update.targetHandle;
        storedEdge.type = update.type;
      }
    });

    // add new edges
    newEdges.forEach((ne) => {
      ne.uuid = crypto.randomUUID();
      ne.ref_flow = flow.uuid!;

      storageEdges.push(ne);
    });

    // remove deleted edges
    removedEdges.forEach((uuid) => {
      const index = storageEdges.findIndex((edge) => edge.uuid === uuid);

      if (index !== -1) {
        storageEdges.splice(index, 1);
      }
    });

    ///////////////
    // END OF EDGES
    //////////////

    // persist all in storage
    this.storageService.setValue("flows-repository", storageFlows);
    this.storageService.setValue("nodes-repository", storageNodes);
    this.storageService.setValue("edges-repository", storageEdges);

    // return value
    return {
      flow: flow,
      nodes: storageNodes.filter((n) => n.ref_flow === flow.uuid),
      edges: storageEdges.filter((e) => e.ref_flow === flow.uuid),
    };
  }

  async loadFlow(uuid: string): Promise<FlowDTO> {
    const flow = (await this.listFlows()).find((f) => f.uuid === uuid);

    if (!flow) {
      throw new Error(`Flow not found ${uuid}`);
    }

    const nodes = (await this.listNodes()).filter((n) => n.ref_flow === uuid);
    const edges = (await this.listEdges()).filter((e) => e.ref_flow === uuid);

    return {
      flow,
      nodes,
      edges,
    };
  }

  async deleteFlow(uuid: string): Promise<void> {
    const flows = (await this.listFlows()).filter((f) => f.uuid !== uuid);
    const nodes = (await this.listNodes()).filter((n) => n.ref_flow !== uuid);
    const edges = (await this.listEdges()).filter((e) => e.ref_flow !== uuid);

    this.storageService.setValue("flows-repository", flows);
    this.storageService.setValue("nodes-repository", nodes);
    this.storageService.setValue("edges-repository", edges);
  }

  async createNode(partial: Partial<NodeModel>): Promise<NodeModel> {
    const uuid = crypto.randomUUID();

    const newNode = {
      uuid: uuid,
      type: partial.type ?? "default",
      position: partial.position ?? { x: 0, y: 0 },
      data: partial.data ?? { label: "unknown", options: [] },
      designerId: partial.designerId,
      ref_flow: partial.ref_flow,
    } as NodeModel;

    const storageNodes = await this.listNodes();

    storageNodes.push(newNode);

    this.storageService.setValue("nodes-repository", storageNodes);

    return newNode;
  }

  async createEdge(partial: Partial<EdgeModel>): Promise<EdgeModel> {
    const uuid = crypto.randomUUID();

    partial.uuid = uuid;

    const newEdge = partial as EdgeModel;

    const storageEdges = await this.listEdges();

    storageEdges.push(newEdge);

    this.storageService.setValue("edges-repository", storageEdges);

    return newEdge;
  }

  async updateNodes(nodes: NodeModel[]): Promise<NodeModel[]> {
    const storageNodes = await this.listNodes();

    const updated = storageNodes.map((each) => {
      const update = nodes.find((node) => node.uuid === each.uuid);

      if (update) {
        each.data = update.data;
        each.position = update.position;
      }

      return each;
    });

    this.storageService.setValue("nodes-repository", updated);

    return storageNodes;
  }

  async getAutosave(): Promise<boolean> {
    const autosave = this.storageService.getValue<boolean>("autosave");

    return !!autosave;
  }

  async setAutosave(value: boolean): Promise<void> {
    this.storageService.setValue("autosave", value);
  }
}
