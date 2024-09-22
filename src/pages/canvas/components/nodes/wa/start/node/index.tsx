import { NodeProps } from "@xyflow/react";

import { WAStartNodeType } from "../../types";
import { fonts, textFont } from "../../../_utilities/colors";
import withCircleShape from "../../../shapes/circle/node";

function StartNode({ data }: NodeProps<WAStartNodeType>) {
  return (
    <span style={{ ...fonts, fontSize: textFont.description }}>
      {data.label}
    </span>
  );
}

export const WAStartNode = withCircleShape(StartNode);
