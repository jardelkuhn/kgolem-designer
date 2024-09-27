import React from "react";

import { Aside, Description } from "./styles";
import { useDnD } from "../../../../../context/dnd";
import { WAStartDnD } from "../../nodes/wa/start/dnd";
import { waColors } from "../../nodes/_utilities/colors";
import {
  waOptionsParams,
  waPlainTextParams,
  waStartParams,
} from "../../nodes/_utilities/params";
import { CustomNodeType } from "../../nodes/@interfaces";
import { WAPlainTextDnD } from "../../nodes/wa/plain-text/dnd";
import { WAOptionsDnD } from "../../nodes/wa/options/dnd";
import { useDesigner } from "../../../../../context/designer";

interface Props {
  readonly onSave: () => void;
  readonly onRestore: () => void;
  readonly onDelete: () => void;
}

export function WhatsAppSidebar({ onSave, onRestore, onDelete }: Props) {
  const { setType } = useDnD();
  const { autoSave, setAutoSave } = useDesigner();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: CustomNodeType
  ) => {
    setType(type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Aside>
      <Description>
        You can drag these nodes to the pane on the left
      </Description>
      <WAStartDnD
        color={waColors}
        params={waStartParams}
        onDragStart={onDragStart}
      />
      <WAPlainTextDnD
        color={waColors}
        params={waPlainTextParams}
        onDragStart={onDragStart}
      />
      <WAOptionsDnD
        color={waColors}
        params={waOptionsParams}
        onDragStart={onDragStart}
      />

      <Description>AUTOSAVE: {autoSave ? "ON" : "OFF"}</Description>
      <button onClick={() => setAutoSave(!autoSave)}>TOGGLE AUTOSAVE</button>
      <br/>
      <button onClick={onSave}>save</button>
      <button onClick={onRestore}>restore</button>
      <button onClick={onDelete}>delete</button>
    </Aside>
  );
}
