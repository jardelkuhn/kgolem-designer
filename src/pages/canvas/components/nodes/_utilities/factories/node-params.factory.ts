import { CustomNodeType, NodeParams } from "../../@interfaces";
import {
  waPlainTextParams,
  waStartParams,
  waOptionsParams,
  fallbackNodeParams,
  waAwaitUserInputParams,
} from "../params";

class NodeParamsFactory {
  static create(type?: string): NodeParams {
    switch (type) {
      case CustomNodeType.WAPlainText:
        return waPlainTextParams;

      case CustomNodeType.WAStart:
        return waStartParams;

      case CustomNodeType.WAOptions:
        return waOptionsParams;

      case CustomNodeType.WAAwaitUserInput:
        return waAwaitUserInputParams;
    }

    return fallbackNodeParams;
  }
}

export default NodeParamsFactory;
