import { NodeType } from "../../..";
import { DndRectangleContainer } from "../../../shapes/rectangle/dnd";
import { DnDProps } from "../../../types";
import waTheming from "../../wa.theming";
import { waPlainTextParams } from "../wa-plain-text.params";

export function WAPlainTextDnD({ onDragStart }: DnDProps) {
  return (
    <DndRectangleContainer
      background={waTheming.background}
      onDragStart={(event) => onDragStart(event, NodeType.WAPlainText)}
      draggable
    >
      <i className={waPlainTextParams.familyIcon}></i> 
      {waPlainTextParams.title}
    </DndRectangleContainer>
  );
}
