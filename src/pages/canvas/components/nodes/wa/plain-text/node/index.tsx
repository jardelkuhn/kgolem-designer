import { NodeProps } from "@xyflow/react";

import { WAStartNodeType } from "../../types";
import { RectangleShape } from "../../../shapes/rectangle";
import waTheming from "../../wa.theming";
import { fonts, textFont } from "../../../shapes/fonts";
import { waPlainTextParams } from "../wa-plain-text.params";

export function WAPlainTextNode({ data }: NodeProps<WAStartNodeType>) {
  return (
    <RectangleShape
      shape={{
        border: waTheming.border,
        background: waTheming.background,
      }}
      options={{
        title: waPlainTextParams.title,
        providerIcon: waPlainTextParams.providerIcon,
        familyIcon: waPlainTextParams.familyIcon,
      }}
      children={{
        content: (
          <span style={{ ...fonts, fontSize: textFont.description }}>
            {data.label}
          </span>
        ),
        handles: data.handles,
      }}
    />
  );
}
