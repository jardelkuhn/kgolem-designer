import { NodeProps } from "@xyflow/react";

import { WAOptionsNodeType } from "../../types";
import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";
import { RectangleOption } from "../../../shapes/rectangle/options";
import { fonts, textFont, waColors } from "../../../_utilities/colors";
import withRectangleShape from "../../../shapes/rectangle/node";

function OptionsNode({ data, id, selected }: NodeProps<WAOptionsNodeType>) {
  const options = data.options ?? [];

  return (
    <RectangleContentContainer>
      <RectangleContentLabelWrapper>
        <RectangleContentDescription
          style={{ ...fonts, fontSize: textFont.description }}
        >
          {data.label}
        </RectangleContentDescription>
      </RectangleContentLabelWrapper>

      {options.map((opt, index) => (
        <RectangleOption
          key={opt.id}
          nodeId={id}
          option={opt}
          top={73 + index * 17}
          color={selected ? waColors.color.selected : waColors.color.normal}
        />
      ))}
    </RectangleContentContainer>
  );
}

export const WAOptionsNode = withRectangleShape(OptionsNode);
