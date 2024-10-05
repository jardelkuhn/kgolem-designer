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
  const { autosave, flow, flows, handleAutosave, setFlow } = useDesigner();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: CustomNodeType
  ) => {
    setType(type);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleRestore = () => {
    if (flow?.uuid) {
      onRestore(flow.uuid);
    }
  };

  const handleDelete = () => {
    if (flow?.uuid) {
      onDelete(flow.uuid);
    }
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

      <Description>AUTOSAVE: {autosave ? "ON" : "OFF"}</Description>
      <button onClick={() => handleAutosave(!autosave)}>TOGGLE AUTOSAVE</button>
      <br />
      {flows.map((aa) => (
        <div key={aa.uuid}>
          <input
            type="radio"
            title={aa.title}
            value={aa.uuid ?? ""}
            checked={aa.uuid === flow?.uuid}
            onChange={() => setFlow(aa)}
          />
          <span style={{ color: "white" }}>{aa.title}</span>
        </div>
      ))}
      <button onClick={onCreate}>NEW</button>
      <button onClick={onSave}>SAVE</button>
      <button onClick={handleRestore}>LOAD</button>
      <button onClick={handleDelete}>delete</button>
    </Aside>
  );
}
