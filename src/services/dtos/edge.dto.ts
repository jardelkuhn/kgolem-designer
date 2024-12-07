import { Nullable } from "../../@types";
import { CustomEdgeType } from "../../pages/canvas/components/edges/@interfaces";

export interface EdgeDTO {
  uuid: Nullable<string>;
  source: string;
  sourceHandle: Nullable<string>;
  target: string;
  targetHandle: Nullable<string>;
  animated: Nullable<boolean>;
  type: CustomEdgeType;
  ref_flow: Nullable<string>;
  designerId: string;
}
