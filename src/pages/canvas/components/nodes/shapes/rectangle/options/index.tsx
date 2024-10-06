import { useState } from "react";
import { Position } from "@xyflow/react";

import {
  OptionContainer,
  OptionContent,
  OptionIcon,
  OptionLabel,
} from "../styles";
import { CustomHandle } from "../../../../handles/custom";
import { ColorProps } from "../../../@interfaces";
import { NodeOption } from "../../../../../../../models";

interface Props {
  readonly nodeId: string;
  readonly color: ColorProps;
  readonly option: NodeOption;
  readonly top: number;

  readonly handleClick: (option: NodeOption) => Promise<void>;
}

export function RectangleOption(props: Props) {
  const { nodeId, option, color, top, handleClick } = props;

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await handleClick(option);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OptionContainer color={color}>
      <OptionContent>
        <OptionIcon className="bi bi-dash-circle" onClick={onClick} />
        <OptionLabel>{option.label}</OptionLabel>
      </OptionContent>
      <CustomHandle
        id={option.designerId}
        key={option.designerId}
        parentId={nodeId}
        type="source"
        position={Position.Right}
        style={{ top }}
      />
    </OptionContainer>
  );
}
