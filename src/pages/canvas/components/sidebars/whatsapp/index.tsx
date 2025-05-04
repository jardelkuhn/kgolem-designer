import React from "react";

import { Aside, Description } from "./styles";
import { useDnD } from "../../../../../context/dnd";
import { WAStartDnD } from "../../nodes/wa/start/dnd";
import { waColors } from "../../nodes/_utilities/colors";
import {
  waAwaitTextParams,
  waConcludeParams,
  waDocumentParams,
  waImageParams,
  waOptionsParams,
  waPlainTextParams,
  waStartParams,
  waTemplateParams,
  waVideoParams,
} from "../../nodes/_utilities/params";
import { CustomNodeType } from "../../nodes/@interfaces";
import { WAPlainTextDnD } from "../../nodes/wa/plain-text/dnd";
import { WAOptionsDnD } from "../../nodes/wa/options/dnd";
import { useDesigner } from "../../../../../context/designer";
import { SidebarProps } from "../@interfaces";
import { WAAwaitTextDnd } from "../../nodes/wa/await-text/dnd";
import { WAImageDnD } from "../../nodes/wa/image/dnd";
import { WAVideoDnD } from "../../nodes/wa/video/dnd";
import { WADocumentDnD } from "../../nodes/wa/document/dnd";
import { WATemplateDnD } from "../../nodes/wa/template/dnd";
import { WAConcludeDnD } from "../../nodes/wa/conclude/dnd";

export function WhatsAppSidebar({
  onSave,
  onCreate,
  onRestore,
  onDelete,
}: SidebarProps) {
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
      <br />
      <Description>Events</Description>
      <WAStartDnD
        color={waColors}
        params={waStartParams}
        onDragStart={onDragStart}
      />
      <WAConcludeDnD
        color={waColors}
        params={waConcludeParams}
        onDragStart={onDragStart}
      />
      <WAAwaitTextDnd
        color={waColors}
        params={waAwaitTextParams}
        onDragStart={onDragStart}
      />
      <br />
      <Description>Actions</Description>
      <WAPlainTextDnD
        color={waColors}
        params={waPlainTextParams}
        onDragStart={onDragStart}
      />
      <WAImageDnD
        color={waColors}
        params={waImageParams}
        onDragStart={onDragStart}
      />
      <WAVideoDnD
        color={waColors}
        params={waVideoParams}
        onDragStart={onDragStart}
      />
      <WADocumentDnD
        color={waColors}
        params={waDocumentParams}
        onDragStart={onDragStart}
      />
      <WAOptionsDnD
        color={waColors}
        params={waOptionsParams}
        onDragStart={onDragStart}
      />
      <WATemplateDnD
        color={waColors}
        params={waTemplateParams}
        onDragStart={onDragStart}
      />
      <Description>AUTOSAVE: {autosave ? "ON" : "OFF"}</Description>
      <button onClick={() => handleAutosave(!autosave)}>TOGGLE AUTOSAVE</button>
      <br />
      <Description>My flows</Description>
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
