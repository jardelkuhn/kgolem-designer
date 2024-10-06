import { CustomNodeType } from "../../../@interfaces";
import { AppNode } from "../../../types";
import { WANode } from "../../../wa/types";

export function isWANode(node: AppNode): node is WANode {
  return check(node.type);
}

export function isWAType(type?: string): boolean {
  return check(type);
}

const check = (type?: string): boolean => {
  return (
    type === CustomNodeType.WAOptions ||
    type === CustomNodeType.WAStart ||
    type === CustomNodeType.WAPlainText ||
    type == CustomNodeType.WAAwaitUserInput
  );
};
