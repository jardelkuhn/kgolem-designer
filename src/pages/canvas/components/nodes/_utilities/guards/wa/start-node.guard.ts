import { NodeType } from "../../..";

export const isStartNode = (type?: string) => {
  if (type === NodeType.WAStart) {
    return true;
  }

  return false;
};
