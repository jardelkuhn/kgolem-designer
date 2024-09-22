import { NodeType } from "../..";
import { NodeParams } from "../../@interfaces";
import {
  waPlainTextParams,
  waStartParams,
  waOptionsParams,
  fallbackNodeParams,
} from "../params";

class NodeParamsFactory {
  static create(type?: string): NodeParams {
    if (type === NodeType.WAPlainText) {
      return waPlainTextParams;
    }

    if (type === NodeType.WAStart) {
      return waStartParams;
    }

    if (type === NodeType.WAOptions) {
      return waOptionsParams;
    }

    return fallbackNodeParams;
  }
}

export default NodeParamsFactory;
