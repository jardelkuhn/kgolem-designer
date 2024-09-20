import React, { useCallback, useEffect, useState } from "react";
import { AppNode } from "../../pages/canvas/components/nodes/types";
import {
  addEdge,
  ColorMode,
  Edge,
  FinalConnectionState,
  OnConnect,
  OnConnectEnd,
  OnConnectStartParams,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { DefaultProviderProps } from "../types";
import { nodeTypes } from "../../pages/canvas/components/nodes";
import { edgeTypes } from "../../pages/canvas/components/edges";
import HandleFactory from "./handle.factory";

interface CanvasContextProps {
  nodeEntered?: AppNode;
  connectStartParams?: OnConnectStartParams;
  // setHoveredNode: React.Dispatch<React.SetStateAction<AppNode>>;
  //   nodes: AppNode[];
  edges: Edge[];
  //   getHandles: (node: AppNode) => Promise<void>;
}

const CanvasContext = React.createContext<CanvasContextProps>(null!);

const initialEdges: Edge[] = [
  { id: "e->f", source: "e", target: "f", animated: true },
];

const initialNodes: AppNode[] = [
  {
    id: "e",
    type: "WAStart",
    position: { x: 0, y: 250 },
    data: { uuid: "e", label: "wa-start", handles: [] },
  },
  {
    id: "f",
    type: "WAPlainText",
    position: { x: 100, y: 250 },
    data: { uuid: "f", label: "wa-plaintext", handles: [] },
  },
];

const onNodeDragStart = (event, node) => console.log("drag start", node);
const onNodeDragStop = (event, node) => console.log("drag stop", node);
const onNodeMouseEnter = (event, node) => console.log("mouse enter", node);
const onNodeMouseLeave = (event, node) => console.log("mouse leave", node);
const onEdgeClick = (event, node) => console.log("onEdgeClick", node);
const onEdgeContextMenu = (event, node) =>
  console.log("onEdgeContextMenu", node);
const onEdgeMouseEnter = (event, node) => console.log("onEdgeMouseEnter", node);
const onEdgeMouseMove = (event, node) => console.log("onEdgeMouseMove", node);
const onContextMenu = (event) => console.log("onContextMenu", event);
const onClickConnectStart = (event, node) =>
  console.log("onClickConnectStart", node);
const onClickConnectEnd = (event, node) =>
  console.log("onClickConnectEnd", node);

export function CanvasProvider(props: DefaultProviderProps) {
  const [colorMode] = useState<ColorMode>("dark");

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges));
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

  const onConnectEnd = (_event: unknown, params: FinalConnectionState) => {
    setConnectStartParams(undefined);
  };

  useEffect(() => {
    const handleFactory = new HandleFactory(initialEdges);

    const nodesAndHandles = initialNodes.map((node) => {
      const handles = handleFactory.createEmptyHandlesForNode(node);
      return {
        ...node,
        data: {
          ...node.data,
          handles,
        },
      };
    });

    // setEdges(initialEdges);
    setNodes(nodesAndHandles);

    // setNodes((current) => [...current]);
  }, [setEdges, setNodes]);

  useEffect(() => {
    // console.log(edges);
  }, [edges]);

  return (
    <CanvasContext.Provider
      value={{
        nodeEntered,
        connectStartParams,
        // nodes,
        edges,
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          elementsSelectable={true}
          ///
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          ///
          // onNodeDragStart={onNodeDragStart}
          // onNodeDragStop={onNodeDragStop}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          // onEdgeClick={onEdgeClick}
          // onEdgeContextMenu={onEdgeContextMenu}
          // onContextMenu={onContextMenu}
          // onEdgeMouseEnter={onEdgeMouseEnter}
          // onEdgeMouseMove={onEdgeMouseMove}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          // onClickConnectStart={onClickConnectStart}
          // onClickConnectEnd={onClickConnectEnd}
          ///
          onConnect={onConnect}
          colorMode={colorMode}
          fitView
        >
          {props.children}
        </ReactFlow>
      </ReactFlowProvider>
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  return React.useContext(CanvasContext);
}
