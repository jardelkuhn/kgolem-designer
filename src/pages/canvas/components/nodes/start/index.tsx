import { Handle, NodeProps, Position } from "@xyflow/react";

import { StartNodeType } from "../types";
import { RoundedShape } from "../shapes/rounded";
import topContent from "./content/top/top.content";
import middleContent from "./content/middle/middle.content";

export function StartNode({ data }: NodeProps<StartNodeType>) {
  console.log(data);

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
      shape={{ borderColor: "#50C878", backgroundColor: "#e5e5e5" }}
      children={{
        top: topContent,
        middle: middleContent,
        handles: handles,
      }}
    />
  );
}
