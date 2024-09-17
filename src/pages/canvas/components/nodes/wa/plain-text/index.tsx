import { Handle, NodeProps, Position } from "@xyflow/react";

import { WAStartNodeType } from "../types";
import { RectangleShape } from "../../shapes/rectangle";
import iconContent from "./content/icon/icon.content";
import waColors from "../wa.colors";
import topLabelContent from "./content/top-label/top-label.content";
import mainLabel from "./content/main-label/main-label.content";

export function WAPlainTextNode({ data }: NodeProps<WAStartNodeType>) {
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
    <RectangleShape
      shape={{
        borderColor: waColors.borderColor,
        backgroundColor: waColors.backgroundColor,
      }}
      children={{
        icon: iconContent,
        topLabel: topLabelContent(),
        mainLabel: mainLabel(data.label),

        handles: handles,
      }}
    />
  );
}
