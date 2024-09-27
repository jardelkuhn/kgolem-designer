import { CustomEdgeType } from "../pages/canvas/components/edges/@interfaces";

export interface EdgeModel {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  animated: boolean;
  type: CustomEdgeType;
  id: string;
}
