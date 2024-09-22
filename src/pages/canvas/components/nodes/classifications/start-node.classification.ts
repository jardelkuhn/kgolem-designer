import { NodeType } from "..";

export const isStartNode = (type: NodeType) => {
  if (type === NodeType.WAStart) {
    return true;
  }

  return false;
};
