import { NodeType } from "../../..";
import { waColors } from "../../../_utilities/colors";
import { waPlainTextParams } from "../../../_utilities/params";
import { DndRectangleContainer } from "../../../shapes/rectangle/dnd";
import { DnDProps } from "../../../types";

export function WAPlainTextDnD({ onDragStart }: DnDProps) {
  return (
    <DndRectangleContainer
      background={waColors.color.normal.background}
      onDragStart={(event) => onDragStart(event, NodeType.WAPlainText)}
      draggable
    >
      <i className={waPlainTextParams.familyIcon}></i>
      {waPlainTextParams.title}
    </DndRectangleContainer>
  );
}
