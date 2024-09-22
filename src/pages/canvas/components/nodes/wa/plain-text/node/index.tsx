import { NodeProps } from "@xyflow/react";

import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";
import withRectangleShape from "../../../shapes/rectangle/node";
import { fonts, textFont } from "../../../_utilities/colors";
import { WAPlainTextNodeType } from "../../types";

function PlainTextNode({ data }: NodeProps<WAPlainTextNodeType>) {
  return (
    <RectangleContentContainer>
      <RectangleContentLabelWrapper>
        <RectangleContentDescription
          style={{ ...fonts, fontSize: textFont.description }}
        >
          {data.label}
        </RectangleContentDescription>
      </RectangleContentLabelWrapper>
    </RectangleContentContainer>
  );
}

export const WAPlainTextNode = withRectangleShape(PlainTextNode);
