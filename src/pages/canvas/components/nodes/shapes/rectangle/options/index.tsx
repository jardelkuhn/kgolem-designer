import { ChangeEvent, useCallback, useState } from "react";
import { Position } from "@xyflow/react";

import { OptionContainer, OptionContent, OptionIcon } from "../styles";
import { CustomHandle } from "../../../../handles/custom";
import { ColorProps } from "../../../@interfaces";
import { NodeOption } from "../../../../../../../models";
import { useDesigner } from "../../../../../../../context/designer";
import { MemoizedRectangleOptionInput } from "../../components";

interface Props {
  readonly nodeId: string;
  readonly color: ColorProps;
  readonly option: NodeOption;
  readonly top: number;

  readonly handleClick: (option: NodeOption) => Promise<void>;
}

export function RectangleOption(props: Props) {
  const { nodeId, option, color, top, handleClick } = props;

  console.log(props.option);
  const [text, setText] = useState(props.option.label);

  const { handleNodeOptionText } = useDesigner();

  const [loading, setLoading] = useState(false);

  const onTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value ?? "");
  }, []);

  const onTextBlur = useCallback(() => {
    handleNodeOptionText(nodeId, option.designerId, text);
  }, [handleNodeOptionText, nodeId, option.designerId, text]);

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
        <MemoizedRectangleOptionInput
          value={text}
          onBlur={onTextBlur}
          onChange={onTextChange}
        />
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
