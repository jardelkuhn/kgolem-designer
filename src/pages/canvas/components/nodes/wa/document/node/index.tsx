import { NodeProps } from "@xyflow/react";

import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";
import withRectangleShape from "../../../shapes/rectangle/node";
import { fonts, textFont } from "../../../_utilities/colors";
import { WADocumentNodeType } from "../../types";

function DocumentNode({ data }: NodeProps<WADocumentNodeType>) {
  return (
    <RectangleContentContainer>
      <RectangleContentLabelWrapper>
        <RectangleContentDescription
          style={{ ...fonts, fontSize: textFont.description }}
        >
          {data.text}
        </RectangleContentDescription>
      </RectangleContentLabelWrapper>
    </RectangleContentContainer>
  );
}

export const WADocumentNode = withRectangleShape(DocumentNode);
