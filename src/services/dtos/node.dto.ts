import { Nullable } from "../../@types";
import { NodeData, Position } from "../../models";
import { CustomNodeType } from "../../pages/canvas/components/nodes/@interfaces";

export interface NodeDTO {
  uuid: Nullable<string>;
  type: CustomNodeType;
  position: Position;
  data: NodeData;
  ref_flow: Nullable<string>;
  designerId: string;
}
