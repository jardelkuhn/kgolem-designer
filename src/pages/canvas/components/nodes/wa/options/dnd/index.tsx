import { NodeType } from "../../..";
import { waColors } from "../../../_utilities/colors";
import { waOptionsParams } from "../../../_utilities/params";
import { DndRectangleContainer } from "../../../shapes/rectangle/dnd";
import { DnDProps } from "../../../types";

export function WAOptionsDnD({ onDragStart }: DnDProps) {
  return (
    <DndRectangleContainer
      background={waColors.color.normal.background}
      onDragStart={(event) => onDragStart(event, NodeType.WAOptions)}
      draggable
    >
      <i className={waOptionsParams.familyIcon}></i>
      {waOptionsParams.title}
    </DndRectangleContainer>
  );
}
