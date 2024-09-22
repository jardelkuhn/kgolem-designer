import { NodeProps } from "@xyflow/react";

import { WAOptionsNodeType } from "../../types";
import { RectangleShape } from "../../../shapes/rectangle/node";
import waTheming from "../../wa.theming";
import { waOptionsParams } from "../wa-options.params";
import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";
import {
  fonts,
  selectionStyle,
  textFont,
} from "../../../shapes/styling/default.theming";
import { RectangleOption } from "../../../shapes/rectangle/options";

export function WAOptionsNode({
  id,
  data,
  selected,
}: NodeProps<WAOptionsNodeType>) {
  const options = data.options ?? [];

  return (
    <RectangleShape
      shape={{
        border: waTheming.border,
        background: waTheming.background,
      }}
      properties={{
        title: waOptionsParams.title,
        providerIcon: waOptionsParams.providerIcon,
        familyIcon: waOptionsParams.familyIcon,
        selected,
      }}
      children={{
        content: (
          <RectangleContentContainer>
            <RectangleContentLabelWrapper>
              <RectangleContentDescription
                style={{ ...fonts, fontSize: textFont.description }}
              >
                {data.label} awdaw daw da
              </RectangleContentDescription>
            </RectangleContentLabelWrapper>

            {options.map((opt, index) => (
              <RectangleOption
                key={opt.id}
                nodeId={id}
                option={opt}
                top={73 + index * 17}
                theming={selected ? selectionStyle : waTheming}
              />
            ))}
          </RectangleContentContainer>
        ),
        handles: data.handles,
      }}
    />
  );
}
