import { NodeData, NodeModel, NodeOption } from "../../../models";
import { CustomNodeType } from "../../../pages/canvas/components/nodes/@interfaces";
import { generateUuid } from "../../utilities";
import {
  waOptionsNodeSamples,
  waPlainTextNodeSamples,
  waStartNodeSamples,
} from "./wa";

type NodeSampleOptions = {
  position: { x: number; y: number };
  type: CustomNodeType;
  flowUuid?: string;
  description: string;
  options?: Array<{
    label: string;
    nodeUuid: string;
    nodeDesignerId: string;
  }>;
  persisted?: boolean; // New parameter
};

export class NodeSampleFactory {
  static createNodeSample({
    position,
    type,
    flowUuid,
    description,
    options = [],
    persisted = true,
  }: NodeSampleOptions): NodeModel {
    const nodeUuid = generateUuid();

    const enrichedOptions: NodeOption[] = options.map((option) => ({
      uuid: persisted ? generateUuid().storage : undefined,
      nodeUuid: persisted ? nodeUuid.storage : undefined,

      designerId: generateUuid().designer,
      nodeDesignerId: nodeUuid.designer,

      label: option.label,
    }));

    const defaultData: NodeData = {
      text: "",
      options: enrichedOptions,
    };

    const node = new NodeModel(
      undefined,
      type,
      position,
      defaultData,
      flowUuid,
      crypto.randomUUID()
    );

    node.uuid = persisted ? nodeUuid.storage : undefined;

    return node;
  }

  static waNodeSamples(persisted = true): NodeModel[] {
    return [
      ...waPlainTextNodeSamples(persisted),
      ...waOptionsNodeSamples(persisted),
      ...waStartNodeSamples(persisted),
    ];
  }
}
