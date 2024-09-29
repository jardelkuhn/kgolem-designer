import { CustomEdgeType } from "../pages/canvas/components/edges/@interfaces";

export interface EdgeModel {
  uuid: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  animated: boolean;
  type: CustomEdgeType;

  ref_flow: string;

  designerId: string;
}
