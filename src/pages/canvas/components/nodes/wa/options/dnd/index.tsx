import { NodeType } from "../../..";
import { DndRectangleContainer } from "../../../shapes/rectangle/dnd";
import { DnDProps } from "../../../types";
import waTheming from "../../wa.theming";
import { waOptionsParams } from "../wa-options.params";

export function WAOptionsDnD({ onDragStart }: DnDProps) {
  return (
    <DndRectangleContainer
      background={waTheming.background}
      onDragStart={(event) => onDragStart(event, NodeType.WAOptions)}
      draggable
    >
      <i className={waOptionsParams.familyIcon}></i>
      {waOptionsParams.title}
    </DndRectangleContainer>
  );
}
