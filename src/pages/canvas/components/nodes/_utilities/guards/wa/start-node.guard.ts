import { CustomNodeType } from "../../../@interfaces";

export const isStartNode = (type?: string) => {
  if (type === CustomNodeType.WAStart) {
    return true;
  }

  return false;
};
