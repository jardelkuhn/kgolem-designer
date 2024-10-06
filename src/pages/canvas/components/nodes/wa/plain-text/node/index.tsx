import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";
import withRectangleShape from "../../../shapes/rectangle/node";
import { fonts, textFont } from "../../../_utilities/colors";

function PlainTextNode() {
  return (
    <RectangleContentContainer>
      <RectangleContentLabelWrapper>
        <RectangleContentDescription
          style={{ ...fonts, fontSize: textFont.description }}
        />
      </RectangleContentLabelWrapper>
    </RectangleContentContainer>
  );
}

export const WAPlainTextNode = withRectangleShape(PlainTextNode);
