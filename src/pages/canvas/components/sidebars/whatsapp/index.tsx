import React from "react";

import { useDnD } from "../../../../../context/dnd/dnd.provider";
import { Aside, Description } from "./styles";
import { WAPlainTextDnD } from "../../nodes/wa/plain-text/dnd";
import { NodeType } from "../../nodes";
import { WAStartDnD } from "../../nodes/wa/start/dnd";
import { WAOptionsDnD } from "../../nodes/wa/options/dnd";

interface Props {
  onSave: () => void;
  onRestore: () => void;
  onDelete: () => void;
}

export function WhatsAppSidebar({ onSave, onRestore, onDelete }: Props) {
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
      <WAStartDnD onDragStart={onDragStart} />
      <WAPlainTextDnD onDragStart={onDragStart} />
      <WAOptionsDnD onDragStart={onDragStart} />
      <button onClick={onSave}>save</button>
      <button onClick={onRestore}>restore</button>
      <button onClick={onDelete}>delete</button>
    </Aside>
  );
}
