import React from "react";

import { useDnD } from "../../../../../context/dnd/dnd.provider";
import { Aside, Description } from "./styles";
import { WAPlainTextDnD } from "../../nodes/wa/plain-text/dnd";
import { NodeType } from "../../nodes";

export function WhatsAppSidebar() {
  const { setType } = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: NodeType
  ) => {
    setType(type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Aside>
      <Description>
        You can drag these nodes to the pane on the left
      </Description>
      <WAPlainTextDnD onDragStart={onDragStart} />
    </Aside>
  );
}
