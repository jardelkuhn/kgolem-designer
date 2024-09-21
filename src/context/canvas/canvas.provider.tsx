import React, { useCallback, useEffect, useState } from "react";
import {
  addEdge,
  ColorMode,
  Edge,
  FinalConnectionState,
  OnConnect,
  OnConnectStartParams,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import HandleFactory from "./handle.factory";
import { DefaultProviderProps } from "../types";
import { nodeTypes } from "../../pages/canvas/components/nodes";
import { edgeTypes } from "../../pages/canvas/components/edges";
import { AppNode } from "../../pages/canvas/components/nodes/types";

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
];

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

  const onConnectEnd = (_event: unknown, _params: FinalConnectionState) => {
    setConnectStartParams(undefined);
  };

  useEffect(() => {
    const handleFactory = new HandleFactory();

    setNodes(() => {
      return initialNodes.map((node) => {
        const handles = handleFactory.createEmptyHandlesForNode(node);
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
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
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
