import { NodeProps } from "@xyflow/react";

import { WAStartNodeType } from "../../types";
import { RoundedShape } from "../../../shapes/rounded/node";
import waColors from "../../wa.theming";
import { fonts, textFont } from "../../../shapes/styling/default.theming";
import { waStartParams } from "../wa-start.params";

export function WAStartNode({ data, selected }: NodeProps<WAStartNodeType>) {
  return (
    <RoundedShape
      shape={{
        border: waColors.border,
        background: waColors.background,
      }}
      properties={{
        title: waStartParams.title,
        providerIcon: waStartParams.providerIcon,
        familyIcon: waStartParams.familyIcon,
        selected,
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
