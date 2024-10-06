import { NodeProps } from "@xyflow/react";

import { fonts, textFont } from "../../../_utilities/colors";
import withCircleShape from "../../../shapes/circle/node";
import { WAAwaitUserInputNodeType } from "../../types";

function AwaitUserInput({ data }: NodeProps<WAAwaitUserInputNodeType>) {
  return (
    <span style={{ ...fonts, fontSize: textFont.description }}>
      {data.label}
    </span>
  );
}

export const WAAwaitUserInputNode = withCircleShape(AwaitUserInput);
