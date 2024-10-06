import { NodeProps } from "@xyflow/react";

import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";
import withRectangleShape from "../../../shapes/rectangle/node";
import { fonts, textFont } from "../../../_utilities/colors";
import { WAImageNodeType } from "../../types";

function ImageNode({ data }: NodeProps<WAImageNodeType>) {
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

export const WAImageNode = withRectangleShape(ImageNode);
