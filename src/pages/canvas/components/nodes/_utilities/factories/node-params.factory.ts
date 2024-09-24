import { CustomNodeType, NodeParams } from "../../@interfaces";
import {
  waPlainTextParams,
  waStartParams,
  waOptionsParams,
  fallbackNodeParams,
} from "../params";

class NodeParamsFactory {
  static create(type?: string): NodeParams {
    if (type === CustomNodeType.WAPlainText) {
      return waPlainTextParams;
    }

    if (type === CustomNodeType.WAStart) {
      return waStartParams;
    }

    if (type === CustomNodeType.WAOptions) {
      return waOptionsParams;
    }

    return fallbackNodeParams;
  }
}

export default NodeParamsFactory;
