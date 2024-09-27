import { ReactFlowInstance } from "@xyflow/react";
import { EdgeModel, NodeModel } from ".";
import { AppNode } from "../pages/canvas/components/nodes/types";

export class FlowModel {
  constructor(
    uuid: string | undefined,
    title: string,
    nodes: NodeModel[],
    edges: EdgeModel[],
    viewport: { x: number; y: number; zoom: number },
    flowInstance: ReactFlowInstance<AppNode> | null
  ) {
    this.uuid = uuid;
    this.title = title;
    this._nodes = nodes;
    this._edges = edges;
    this.viewport = viewport;
    this.flowInstance = flowInstance;
  }

  flowInstance: ReactFlowInstance<AppNode> | null;

  uuid?: string;
  title: string;

  _nodes: NodeModel[] = [];
  _edges: EdgeModel[] = [];

  viewport: {
    x: number;
    y: number;
    zoom: number;
  };

  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
