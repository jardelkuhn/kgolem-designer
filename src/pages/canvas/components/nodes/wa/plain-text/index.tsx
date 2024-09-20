import { NodeProps } from "@xyflow/react";

import { WAStartNodeType } from "../types";
import { RectangleShape } from "../../shapes/rectangle";
import waTheming from "../wa.theming";
import { fonts, textFont } from "../../shapes/fonts";

export function WAPlainTextNode({ data }: NodeProps<WAStartNodeType>) {
  return (
    <RectangleShape
      shape={{
        border: waTheming.border,
        background: waTheming.background,
      }}
      options={{
        title: "Enviar texto",
        providerIcon: "bi bi-whatsapp",
        familyIcon: "bi bi-body-text",
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
