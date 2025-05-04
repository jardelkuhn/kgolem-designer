import { CustomNodeType, NodeParams } from "../../@interfaces";
import {
  waPlainTextParams,
  waStartParams,
  waOptionsParams,
  fallbackNodeParams,
  waAwaitTextParams,
  waImageParams,
  waVideoParams,
  waDocumentParams,
  waTemplateParams,
  waConcludeParams,
} from "../params";

class NodeParamsFactory {
  static get(type?: string): NodeParams {
    switch (type) {
      case CustomNodeType.WAPlainText:
        return waPlainTextParams;

      case CustomNodeType.WAStart:
        return waStartParams;

      case CustomNodeType.WAConclude:
        return waConcludeParams;

      case CustomNodeType.WAOptions:
        return waOptionsParams;

      case CustomNodeType.WAAwaitText:
        return waAwaitTextParams;

      case CustomNodeType.WAImage:
        return waImageParams;

      case CustomNodeType.WAVideo:
        return waVideoParams;

      case CustomNodeType.WADocument:
        return waDocumentParams;

      case CustomNodeType.WATemplate:
        return waTemplateParams;
    }

    return fallbackNodeParams;
  }
}

export default NodeParamsFactory;
