import { NodeProps } from "@xyflow/react";

import { WAOptionsNodeType } from "../../types";
import { RectangleContentContainer } from "../../../shapes/rectangle/styles";
import { RectangleOption } from "../../../shapes/rectangle/options";
import { waColors } from "../../../_utilities/colors";
import withRectangleShape from "../../../shapes/rectangle/node";
import { AddRectangleOption } from "../../../shapes/rectangle/add-option";
import { useDesigner } from "../../../../../../../context/designer";
import { NodeOption } from "../../../../../../../models";

function OptionsNode({ data, id, selected }: NodeProps<WAOptionsNodeType>) {
  const options = data.options ?? [];

  const { addOption, deleteOption } = useDesigner();

  const handleAddOption = async () => {
    addOption(id);
  };

  const handleDeleteOption = async (option: NodeOption) => {
    deleteOption(option);
  };

  return (
    <RectangleContentContainer>
      {options.map((opt, index) => (
        <RectangleOption
          key={opt.designerId}
          nodeId={id}
          option={opt}
          top={70 + index * 17}
          color={selected ? waColors.color.selected : waColors.color.normal}
          handleClick={handleDeleteOption}
        />
      ))}

      <AddRectangleOption
        key="add-item"
        color={selected ? waColors.color.selected : waColors.color.normal}
        handleClick={handleAddOption}
      />
    </RectangleContentContainer>
  );
}

export const WAOptionsNode = withRectangleShape(OptionsNode);
