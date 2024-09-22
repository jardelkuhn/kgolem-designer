import { Position } from "@xyflow/react";

import { ShapeOption } from "../../@types/shape.props";
import { OptionContainer, OptionLabel } from "../styles";
import { Theming } from "../../@types/theming.types";
import { CustomHandle } from "../../../../handles/custom";

interface Props {
  nodeId: string;
  theming: Theming;
  option: ShapeOption;
  top: number;
}

export function RectangleOption(props: Props) {
  const { nodeId, option, theming, top } = props;

  return (
    <OptionContainer background={theming.background}>
      <OptionLabel>{option.label}</OptionLabel>
      <CustomHandle
        id={option.id}
        key={"id"}
        parentId={nodeId}
        type="source"
        position={Position.Right}
        style={{ top }}
      />
    </OptionContainer>
  );
}
