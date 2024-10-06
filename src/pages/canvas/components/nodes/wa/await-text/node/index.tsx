import { NodeProps } from "@xyflow/react";

import { fonts, textFont } from "../../../_utilities/colors";
import withCircleShape from "../../../shapes/circle/node";
import { WAAwaitTextNodeType } from "../../types";

function AwaitText({ data }: NodeProps<WAAwaitTextNodeType>) {
  return (
    <span style={{ ...fonts, fontSize: textFont.description }}>
      {data.label}
    </span>
  );
}

export const WAAwaitTextNode = withCircleShape(AwaitText);
