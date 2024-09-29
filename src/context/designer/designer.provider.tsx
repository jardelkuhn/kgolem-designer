import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { useDnD } from "../dnd";
import { DefaultProviderProps } from "../@interfaces";
import { FlowModel } from "../../models";
import { ManagersModule } from "../../managers/managers.module";

interface DesignerContextProps {
  readonly nodeEntered?: AppNode;
  readonly connectStartParams?: OnConnectStartParams;
  readonly edges: Edge[];
  readonly getHandles: () => JSX.Element[];

  readonly autoSave: boolean;
  readonly setAutoSave: (value: boolean) => void;

  readonly flows: FlowModel[];
}

export const DesignerContext = React.createContext<DesignerContextProps>(null!);

export function DesignerProvider(props: DefaultProviderProps) {
  const designerService = ManagersModule.getInstance().getDesignerManager();

  const reactFlowWrapper = useRef(null);

  const [autoSave, setAutoSave] = useState(false);
  const [colorMode] = useState<ColorMode>("dark");
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<AppNode>>();

  // remove it from here
  const [flows, setFlows] = useState<FlowModel[]>([]);
  // remove it from here

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const [nodeEntered, setNodeEntered] = useState<AppNode | undefined>(
    undefined
  );
  const [connectStartParams, setConnectStartParams] =
    useState<OnConnectStartParams>();

  const onConnect: OnConnect = useCallback(
    async (connection) => {
      const edge = await designerService.createEdge(connection);

      setEdges((edges) => addEdge(edge.toInstance(), edges));
    },
    [designerService, setEdges]
  );

  const loadData = useCallback(async () => {
    const flows = await designerService.listFlows();

    setFlows(flows);
  }, [designerService]);

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
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = await designerService.createNode(position, type, {
        label: `${type} node`,
        options: [],
      });

      setNodes((nds) => nds.concat(newNode.toInstance()));
    },
    [designerService, screenToFlowPosition, setNodes, type]
  );

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      await designerService.save(flow);

      loadData();
    }
  }, [designerService, rfInstance, loadData]);

  const onDelete = useCallback(
    async (uuid: string) => {
      await designerService.deleteFlow(uuid);

      setNodes([]);
      setEdges([]);

      setFlows((current) => current.filter((f) => f.uuid !== uuid));
    },
    [designerService, setEdges, setNodes]
  );

  const onRestore = useCallback(
    (uuid: string) => {
      const restoreFlow = async (uuid: string) => {
        const { flow, nodes, edges } = await designerService.loadFlow(uuid);
        console.log(nodes);
        if (flow) {
          setNodes(nodes.map((n) => n.toInstance()));
          setEdges(
            edges.map((e) => {
              return {
                id: e.designerId,
                type: e.type,
                animated: e.animated,
                source: e.source,
                sourceHandle: e.sourceHandle,
                target: e.target,
                targetHandle: e.targetHandle,
              } as Edge;
            })
          );
          setViewport(flow.viewport);
        }
      };

      restoreFlow(uuid);
    },
    [designerService, setEdges, setNodes, setViewport]
  );

  const getHandles = useCallback((): JSX.Element[] => {
    // handleFactory.createHandles()

    return [];
  }, []);

  const onInit = (reactFlowInstance: ReactFlowInstance<AppNode>): void => {
    setRfInstance(reactFlowInstance);

    designerService.reset();
  };

  const onNewFlow = () => {
    designerService.reset();

    setNodes([]);
    setEdges([]);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const value = useMemo(
    () => ({
      nodeEntered,
      connectStartParams,
      edges,
      autoSave,
      flows,
      getHandles,
      setAutoSave,
    }),
    [nodeEntered, connectStartParams, edges, autoSave, flows, getHandles]
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
          onCreate={onNewFlow}
          onRestore={onRestore}
          onDelete={onDelete}
        />
      </Container>
    </DesignerContext.Provider>
  );
}
