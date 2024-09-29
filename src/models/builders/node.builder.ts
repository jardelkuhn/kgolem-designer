import { Data, NodeModel, Position } from "..";
import { CustomNodeType } from "../../pages/canvas/components/nodes/@interfaces";

export class NodeModelBuilder {
  private type: CustomNodeType = CustomNodeType.Default;
  private position: Position = { x: 0, y: 0 };
  private data: Data = { label: "", options: [] };
  private ref_flow: string = "";

  setType(type: CustomNodeType): NodeModelBuilder {
    this.type = type;
    return this;
  }

  setPosition(position: Position): NodeModelBuilder {
    this.position = position;
    return this;
  }

  setData(data: Data): NodeModelBuilder {
    this.data = data;
    return this;
  }

  setRefFlow(ref_flow: string): NodeModelBuilder {
    this.ref_flow = ref_flow;
    return this;
  }

  // Method to build the NodeModel instance
  build(): NodeModel {
    return new NodeModel(
      undefined,
      this.type,
      this.position,
      this.data,
      this.ref_flow
    );
  }
}
