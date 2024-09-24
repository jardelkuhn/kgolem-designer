import { Position } from "@xyflow/react";

import { OptionContainer, OptionLabel } from "../styles";
import { CustomHandle } from "../../../../handles/custom";
import { ColorProps, NodeOption } from "../../../@interfaces";

interface Props {
  readonly nodeId: string;
  readonly color: ColorProps;
  readonly option: NodeOption;
  readonly top: number;
}

export function RectangleOption(props: Props) {
  const { nodeId, option, color, top } = props;

  return (
    <OptionContainer color={color}>
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
