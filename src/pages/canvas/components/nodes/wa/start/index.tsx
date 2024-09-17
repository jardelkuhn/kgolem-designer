import { Handle, NodeProps, Position } from "@xyflow/react";

import topContent from "./content/top/top.content";
import middleContent from "./content/middle/middle.content";
import { WAStartNodeType } from "../types";
import { RoundedShape } from "../../shapes/rounded";
import waColors from "../wa.colors";

export function WAStartNode({ data }: NodeProps<WAStartNodeType>) {
  const handles = [
    <Handle
      id="a"
      type="source"
      position={Position.Right}
      // style={{ background: "#555" }}
      isConnectable={true}
    />,
  ];

  return (
    <RoundedShape
      shape={{
        borderColor: waColors.borderColor,
        backgroundColor: waColors.backgroundColor,
      }}
      children={{
        top: topContent,
        middle: middleContent(data.label),
        handles: handles,
      }}
    />
  );
}
