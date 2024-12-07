import { FlowService } from "../@interfaces";
import { LocalStorageService } from "./repository";
import { DesignerDTO, EdgeDTO, FlowDTO, NodeDTO, NodeOptionDTO } from "../dtos";

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

  async listFlows(): Promise<FlowDTO[]> {
    const result = this.storageService.getValue<FlowDTO[]>("flows-repository");

    return result ?? [];
  }

  async listNodes(): Promise<NodeDTO[]> {
    const result = this.storageService.getValue<NodeDTO[]>("nodes-repository");

    return result ?? [];
  }

  async listEdges(): Promise<EdgeDTO[]> {
    const result = this.storageService.getValue<EdgeDTO[]>("edges-repository");

    return result ?? [];
  }

  async saveFlow({ flow, nodes, edges }: DesignerDTO): Promise<DesignerDTO> {
    const storageFlows = await this.listFlows();

    const isUpdate = storageFlows.findIndex((f) => f.uuid === flow.uuid);

    let flowUpdate = { ...flow };

    if (isUpdate > -1) {
      flowUpdate = {
        ...storageFlows[isUpdate],
        title: flow.title,
        viewport: flow.viewport,
        updatedAt: new Date(),
      };

      storageFlows[isUpdate] = flowUpdate;
    } else {
      flowUpdate.uuid = crypto.randomUUID();
      flowUpdate.createdAt = new Date();
      flowUpdate.updatedAt = new Date();

      storageFlows.push(flowUpdate);
    }

    ///////////////
    // END OF FLOW
    //////////////

    // NODES

    const storageNodes = await this.listNodes();

    const newNodes = nodes.filter((n) => !n.uuid);
    const updateNodes = nodes.filter((n) => !!n.uuid);
    const removedNodes = storageNodes
      .filter((storedNode) => storedNode.ref_flow === flowUpdate.uuid)
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
        if (update.data.options.length > 0) {
          update.data.options.forEach(
            (o) => (o.uuid = o.uuid ?? crypto.randomUUID())
          );
        }
        storedNode.data = update.data;
        storedNode.position = update.position;
        storedNode.type = update.type;
      }
    });

    // add new nodes
    newNodes.forEach((nw) => {
      nw.data.options.forEach((o) => (o.uuid = o.uuid ?? crypto.randomUUID()));
      nw.uuid = crypto.randomUUID();
      nw.ref_flow = flowUpdate.uuid!;

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
      .filter((storedEdge) => storedEdge.ref_flow === flowUpdate.uuid)
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
      ne.ref_flow = flowUpdate.uuid!;

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
      flow: flowUpdate,
      nodes: storageNodes.filter((n) => n.ref_flow === flowUpdate.uuid),
      edges: storageEdges.filter((e) => e.ref_flow === flowUpdate.uuid),
    };
  }

  async loadFlow(uuid: string): Promise<DesignerDTO> {
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

  async createNode(partial: Partial<NodeDTO>): Promise<NodeDTO> {
    const uuid = crypto.randomUUID();

    const newNode = {
      uuid: uuid,
      type: partial.type ?? "default",
      position: partial.position ?? { x: 0, y: 0 },
      data: partial.data ?? { label: "unknown", options: [] },
      designerId: partial.designerId,
      ref_flow: partial.ref_flow,
    } as NodeDTO;

    const storageNodes = await this.listNodes();

    storageNodes.push(newNode);

    this.storageService.setValue("nodes-repository", storageNodes);

    return newNode;
  }

  async createEdge(partial: Partial<EdgeDTO>): Promise<EdgeDTO> {
    const uuid = crypto.randomUUID();

    partial.uuid = uuid;

    const newEdge = partial as EdgeDTO;

    const storageEdges = await this.listEdges();

    storageEdges.push(newEdge);

    this.storageService.setValue("edges-repository", storageEdges);

    return newEdge;
  }

  async updateNodes(nodes: NodeDTO[]): Promise<NodeDTO[]> {
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

  async deleteNodes(nodes: string[]): Promise<void> {
    const storageNodes = await this.listNodes();

    const updated = storageNodes.filter(
      (sn) => !!nodes.find((n) => n === sn.uuid)
    );

    this.storageService.setValue("nodes-repository", updated);
  }

  async deleteEdges(edges: string[]): Promise<void> {
    const storageEdges = await this.listEdges();

    const updated = storageEdges.filter(
      (se) => !!edges.find((e) => e === se.uuid)
    );

    this.storageService.setValue("edges-repository", updated);
  }

  async getAutosave(): Promise<boolean> {
    const autosave = this.storageService.getValue<boolean>("autosave");

    return !!autosave;
  }

  async setAutosave(value: boolean): Promise<void> {
    this.storageService.setValue("autosave", value);
  }

  async addNodeOption(option: NodeOptionDTO): Promise<NodeOptionDTO> {
    const storageNodes = await this.listNodes();

    const node = storageNodes.find((n) => n.uuid === option.nodeUuid);

    if (node) {
      option.uuid = crypto.randomUUID();
      option.nodeUuid = node.uuid;

      node.data.options.push(option);

      this.storageService.setValue<NodeDTO[]>("nodes-repository", storageNodes);

      return option;
    }

    throw new Error(`Node not found for option ${option}`);
  }

  async deleteNodeOption(option: NodeOptionDTO): Promise<void> {
    const storageNodes = await this.listNodes();

    const node = storageNodes.find((n) => n.uuid === option.nodeUuid);

    if (node) {
      const optionIndex = node.data.options.findIndex(
        (o) => o.uuid === option.uuid
      );

      if (optionIndex > -1) {
        node.data.options.splice(optionIndex, 1);
      }

      this.storageService.setValue<NodeDTO[]>("nodes-repository", storageNodes);
    }

    throw new Error(`Node not found for option ${option}`);
  }
}
