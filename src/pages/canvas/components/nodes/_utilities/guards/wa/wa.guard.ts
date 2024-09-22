import { NodeType } from "../../..";
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
    type === NodeType.WAOptions ||
    type === NodeType.WAStart ||
    type === NodeType.WAPlainText
  );
};
