import { ReactFlowInstance } from "@xyflow/react";
import { EdgeModel, FlowModel, NodeModel } from "..";
import { AppNode } from "../../pages/canvas/components/nodes/types";

export class FlowModelBuilder {
  private uuid?: string;
  private title: string = "";
  private nodes: NodeModel[] = [];
  private edges: EdgeModel[] = [];
  private viewport = { x: 0, y: 0, zoom: 1 };
  private flowInstance: ReactFlowInstance<AppNode> | null = null;

  constructor(uuid?: string) {
    this.uuid = uuid;
  }

  public setTitle(title: string): FlowModelBuilder {
    this.title = title;
    return this;
  }

  public setNodes(nodes: NodeModel[]): FlowModelBuilder {
    this.nodes = nodes;
    return this;
  }

  public setEdges(edges: EdgeModel[]): FlowModelBuilder {
    this.edges = edges;
    return this;
  }

  public setViewport(x: number, y: number, zoom: number): FlowModelBuilder {
    this.viewport = { x, y, zoom };
    return this;
  }

  public setFlowInstance(flowInstance: ReactFlowInstance<AppNode>) {
    this.flowInstance = flowInstance;
    return this;
  }

  public build(): FlowModel {
    return new FlowModel(
      this.uuid,
      this.title,
      this.nodes,
      this.edges,
      this.viewport,
      this.flowInstance
    );
  }
}
