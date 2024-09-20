import { NodeProps } from "@xyflow/react";

import { WAStartNodeType } from "../types";
import { RoundedShape } from "../../shapes/rounded";
import waColors from "../wa.theming";
import { fonts, textFont } from "../../shapes/fonts";

export function WAStartNode({ data }: NodeProps<WAStartNodeType>) {
  return (
    <RoundedShape
      shape={{
        border: waColors.border,
        background: waColors.background,
      }}
      options={{
        title: "Início",
        providerIcon: "bi bi-whatsapp",
        familyIcon: "bi bi-lightning-fill",
      }}
      children={{
        content: (
          <span style={{ ...fonts, fontSize: textFont.description }}>
            {data.label}
          </span>
        ),
        handles: data.handles,
        uuid: data.uuid,
      }}
    />
  );
}
