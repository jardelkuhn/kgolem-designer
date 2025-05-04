import { NodeProps } from "@xyflow/react";

import { WAConcludeNodeType } from "../../types";
import { fonts, textFont } from "../../../_utilities/colors";
import withCircleShape from "../../../shapes/circle/node";

function ConcludeNode({ data }: NodeProps<WAConcludeNodeType>) {
  return (
    <span style={{ ...fonts, fontSize: textFont.description }}>
      {data.text}
    </span>
  );
}

export const WAConcludeNode = withCircleShape(ConcludeNode);
