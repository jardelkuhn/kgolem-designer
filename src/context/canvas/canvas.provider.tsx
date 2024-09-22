import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  ColorMode,
  Edge,
  OnConnect,
  OnConnectStartParams,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import HandleFactory from "../../utilities/handle.factory";
import { DefaultProviderProps } from "../types";
import { NodeType, nodeTypes } from "../../pages/canvas/components/nodes";
import { EdgeType, edgeTypes } from "../../pages/canvas/components/edges";
import { AppNode } from "../../pages/canvas/components/nodes/types";
import { useDnD } from "../dnd/dnd.provider";
import { Container, ReactFlowWrapper } from "./styles";
import { WhatsAppSidebar } from "../../pages/canvas/components/sidebars/whatsapp";

interface CanvasContextProps {
  nodeEntered?: AppNode;
  connectStartParams?: OnConnectStartParams;
  edges: Edge[];
}

const CanvasContext = React.createContext<CanvasContextProps>(null!);

const initialNodes: AppNode[] = [
  {
    id: "e",
    type: "WAStart",
    position: { x: 0, y: 250 },
    data: { label: "wa-start", handles: [] },
  },
  {
    id: "f",
    type: "WAPlainText",
    position: { x: 100, y: 250 },
    data: { label: "wa-plaintext", handles: [] },
  },
  {
    id: "g",
    type: "WAOptions",
    position: { x: 100, y: 50 },
    data: {
      label: "wa-options",
      handles: [],
      options: [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
        { id: "3", label: "Option 3" },
        { id: "4", label: "Option 4" },
        { id: "5", label: "Option 5" },
      ],
    },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export function CanvasProvider(props: DefaultProviderProps) {
  const reactFlowWrapper = useRef(null);

  const [colorMode] = useState<ColorMode>("dark");

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) =>
        addEdge(
          { ...connection, animated: true, type: EdgeType.CustomEdge },
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

      const handleFactory = new HandleFactory();
      const uuid = getId();
      const handles = handleFactory.createHandles(uuid, type);

      const newNode = {
        id: uuid,
        type,
        position,
        data: { label: `${type} node`, handles },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  useEffect(() => {
    const handleFactory = new HandleFactory();

    setNodes(() => {
      return initialNodes.map((node) => {
        const handles = handleFactory.createHandles(
          node.id,
          node.type as NodeType
        );
        return {
          ...node,
          data: {
            uuid: "",
            ...node.data,
            handles,
          },
        };
      });
    });
  }, [setEdges, setNodes]);

  return (
    <CanvasContext.Provider
      value={{
        nodeEntered,
        connectStartParams,
        edges,
      }}
    >
      <Container>
        <ReactFlowWrapper ref={reactFlowWrapper}>
          <ReactFlow
            fitView
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
        <WhatsAppSidebar />
      </Container>
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  return React.useContext(CanvasContext);
}
