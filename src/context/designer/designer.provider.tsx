import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  addEdge,
  ColorMode,
  Edge,
  OnConnect,
  OnConnectStartParams,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { nodeTypes } from "../../pages/canvas/components/nodes";
import { edgeTypes } from "../../pages/canvas/components/edges";
import { AppNode } from "../../pages/canvas/components/nodes/types";
import { Container, ReactFlowWrapper } from "./styles";
import { WhatsAppSidebar } from "../../pages/canvas/components/sidebars/whatsapp";
import { WANode } from "../../pages/canvas/components/nodes/wa/types";
import { useDnD } from "../dnd";
import { DefaultProviderProps } from "../@interfaces";
import { NodeOption } from "../../models";
import { CustomNodeType } from "../../pages/canvas/components/nodes/@interfaces";
import { CustomEdgeType } from "../../pages/canvas/components/edges/@interfaces";
import { DesignerService } from "../../services/designer";

interface DesignerContextProps {
  readonly nodeEntered?: AppNode;
  readonly connectStartParams?: OnConnectStartParams;
  readonly edges: Edge[];
  readonly getHandles: () => JSX.Element[];

  readonly autoSave: boolean;
  readonly setAutoSave: (value: boolean) => void;
}

export const DesignerContext = React.createContext<DesignerContextProps>(null!);

let id = 0;
const getId = () => `dndnode_${id++}`;
const flowKey = "example-flow";

export function DesignerProvider(props: DefaultProviderProps) {
  const designerService = DesignerService.getInstance();

  const reactFlowWrapper = useRef(null);

  const [autoSave, setAutoSave] = useState(false);
  const [colorMode] = useState<ColorMode>("dark");
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<AppNode>>();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) =>
        addEdge(
          { ...connection, animated: true, type: CustomEdgeType.CustomEdge },
          edges
        )
      );
    },
    [setEdges]
  );

  const [nodeEntered, setNodeEntered] = useState<AppNode | undefined>(
    undefined
  );
  const [connectStartParams, setConnectStartParams] =
    useState<OnConnectStartParams>();

  const onNodeMouseEnter = (_event: unknown, node: AppNode) =>
    setNodeEntered(node);

  const onNodeMouseLeave = () => setNodeEntered(undefined);

  const onConnectStart = (_event: unknown, params: OnConnectStartParams) => {
    setConnectStartParams(params);
  };

  const onConnectEnd = () => {
    setConnectStartParams(undefined);
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const uuid = getId();

      let options: NodeOption[] = [];

      if (type === CustomNodeType.WAOptions) {
        options = [
          { uuid: "1", label: "Option 1" },
          { uuid: "2", label: "Option 2" },
          { uuid: "3", label: "Option 3" },
          { uuid: "4", label: "Option 4" },
          { uuid: "5", label: "Option 5" },
        ];
      }

      const newNode = {
        id: uuid,
        type,
        position,
        data: { label: `${type} node`, options },
      } as WANode;

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      designerService.save(flow);
    }
  }, [designerService, rfInstance]);

  const onDelete = useCallback(() => {
    localStorage.removeItem(flowKey);
    setRfInstance(undefined);
    setNodes([]);
    setEdges([]);
  }, [setEdges, setNodes]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const storage = localStorage.getItem(flowKey) ?? "{}";

      const flow = JSON.parse(storage);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  const getHandles = useCallback((): JSX.Element[] => {
    // handleFactory.createHandles()

    return [];
  }, []);

  const onInit = (reactFlowInstance: ReactFlowInstance<AppNode>): void => {
    setRfInstance(designerService.initializeFlowInstance(reactFlowInstance));
  };

  const value = useMemo(
    () => ({
      nodeEntered,
      connectStartParams,
      edges,
      autoSave,
      getHandles,
      setAutoSave,
    }),
    [nodeEntered, connectStartParams, edges, autoSave, getHandles, setAutoSave]
  );

  return (
    <DesignerContext.Provider value={value}>
      <Container>
        <ReactFlowWrapper ref={reactFlowWrapper}>
          <ReactFlow
            fitView
            onInit={onInit}
            elementsSelectable
            deleteKeyCode="Delete"
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onConnect={onConnect}
            colorMode={colorMode}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {props.children}
          </ReactFlow>
        </ReactFlowWrapper>
        <WhatsAppSidebar
          onSave={onSave}
          onRestore={onRestore}
          onDelete={onDelete}
        />
      </Container>
    </DesignerContext.Provider>
  );
}
