import { NodeType } from "../../..";
import { waColors } from "../../../_utilities/colors";
import { waStartParams } from "../../../_utilities/params";
import { DndRoundedContainer } from "../../../shapes/circle/dnd";
import { DnDProps } from "../../../types";

export function WAStartDnD({ onDragStart }: DnDProps) {
  return (
    <DndRoundedContainer
      background={waColors.color.normal.background}
      onDragStart={(event) => onDragStart(event, NodeType.WAStart)}
      draggable
    >
      <i className={waStartParams.familyIcon}></i>
      {waStartParams.title}
    </DndRoundedContainer>
  );
}
