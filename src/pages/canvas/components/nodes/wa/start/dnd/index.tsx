import { NodeType } from "../../..";
import { DndRoundedContainer } from "../../../shapes/rounded/dnd";
import { DnDProps } from "../../../types";
import waTheming from "../../wa.theming";
import { waStartParams } from "../wa-start.params";

export function WAStartDnD({ onDragStart }: DnDProps) {
  return (
    <DndRoundedContainer
      background={waTheming.background}
      onDragStart={(event) => onDragStart(event, NodeType.WAStart)}
      draggable
    >
      <i className={waStartParams.familyIcon}></i>
      {waStartParams.title}
    </DndRoundedContainer>
  );
}
