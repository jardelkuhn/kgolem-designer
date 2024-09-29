import React, { useState } from "react";

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
  onSave: () => void;
  onCreate: () => void;
  onRestore: (uuid: string) => void;
  onDelete: (uuid: string) => void;
}

export function WhatsAppSidebar({
  onSave,
  onCreate,
  onRestore,
  onDelete,
}: Props) {
  const { setType } = useDnD();
  const { autoSave, setAutoSave, flows } = useDesigner();

  const [checkedFlow, setCheckedFlow] = useState("");

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: CustomNodeType
  ) => {
    setType(type);
    event.dataTransfer.effectAllowed = "move";
  };

  const onLoad = () => {
    onRestore(checkedFlow);
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
      <br />
      {flows.map((aa) => (
        <div>
          <input
            key={aa.uuid}
            type="radio"
            title={aa.title}
            value={aa.uuid ?? ""}
            checked={aa.uuid === checkedFlow}
            onChange={() => setCheckedFlow(aa.uuid!)}
          />
          <span style={{ color: "white" }}>{aa.title}</span>
        </div>
      ))}
      <button onClick={onCreate}>NEW</button>
      <button onClick={onSave}>SAVE</button>
      <button onClick={onLoad}>LOAD</button>
      <button onClick={() => onDelete(checkedFlow)}>delete</button>
    </Aside>
  );
}
