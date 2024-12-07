import { describe, it, expect, beforeEach, vi } from "vitest";
import { LocalStorageFlowService } from "..";
import { EdgeModel, FlowModel, NodeModel } from "../../../models";
import { LocalStorageKey, LocalStorageService } from "../repository";
import { FlowSampleFactory } from "../../../__tests__/samples/flows";
import { omitProperties } from "../../../__tests__/utilities";
import { NodeSampleFactory } from "../../../__tests__/samples/nodes";
import { EdgeSampleFactory } from "../../../__tests__/samples/edges";

describe("LocalStorageFlowService", () => {
  vi.mock("./repository");

  let flowService: LocalStorageFlowService;

  const mockGetStorage = vi.spyOn(LocalStorageService.prototype, "getValue");
  const mockSetStorage = vi.spyOn(LocalStorageService.prototype, "setValue");

  const getFlowSamples = (persisted: boolean) =>
    FlowSampleFactory.getSampleFlowModels(persisted);

  const getNodeSamples = (persisted: boolean) =>
    NodeSampleFactory.waNodeSamples(persisted);

  const getEdgeSamples = (persisted: boolean) =>
    EdgeSampleFactory.edgeSamples(persisted);

  const omitDates = (obj: object): Record<string, unknown> => {
    return omitProperties(obj, ["createdAt", "updatedAt"]);
  };

  beforeEach(() => {
    flowService = LocalStorageFlowService.getInstance();

    mockGetStorage.mockReset();
    mockSetStorage.mockReset();
  });

  it("should list flows", async () => {
    const mockedFlows = getFlowSamples(true);

    mockGetStorage.mockReturnValueOnce(mockedFlows);

    const flows = await flowService.listFlows();

    expect(flows).toEqual(mockedFlows);
  });

  it("should list nodes", async () => {
    const mockNodes = getNodeSamples(true);

    mockGetStorage.mockReturnValueOnce(mockNodes);

    const nodes = await flowService.listFlows();

    expect(nodes).toEqual(mockNodes);
  });

  it("should list edges", async () => {
    const mockEdges = getEdgeSamples(true);

    mockGetStorage.mockReturnValueOnce(mockEdges);

    const edges = await flowService.listEdges();

    expect(edges).toEqual(mockEdges);
  });

  it("should save a new flow when storage is empty", async () => {
    const storageFlows: FlowModel[] = [];
    const storageNodes: NodeModel[] = [];
    const storageEdges: EdgeModel[] = [];

    let mockSetFlowResult: FlowModel[] = [];
    let mockSetNodeResult: NodeModel[] = [];
    let mockSetEdgeResult: EdgeModel[] = [];

    mockGetStorage
      .mockReturnValueOnce(storageFlows)
      .mockReturnValueOnce(storageNodes)
      .mockReturnValueOnce(storageEdges);

    mockSetStorage.mockImplementation((key: LocalStorageKey, object) => {
      if (key === "flows-repository") {
        mockSetFlowResult = object as FlowModel[];
      } else if (key === "nodes-repository") {
        mockSetNodeResult = object as NodeModel[];
      } else if (key === "edges-repository") {
        mockSetEdgeResult = object as EdgeModel[];
      }
    });

    const newFlow = {
      flow: getFlowSamples(false)[0],
      nodes: [],
      edges: [],
    };

    const savedFlow = await flowService.saveFlow(newFlow);

    const savedFlowWithoutDates = omitDates(savedFlow.flow);
    const mockSetFlowResultWithoutDates = omitDates(mockSetFlowResult[0]);

    expect(savedFlowWithoutDates).toStrictEqual(mockSetFlowResultWithoutDates);
    expect(mockSetFlowResult.length).toBe(1);

    expect(mockSetNodeResult).toStrictEqual(storageNodes);
    expect(mockSetEdgeResult).toStrictEqual(storageEdges);
  });

  it("should update a flow when storage is empty", async () => {
    const persistedFlows = getFlowSamples(true);

    const storageFlows: FlowModel[] = [];
    const storageNodes: NodeModel[] = [];
    const storageEdges: EdgeModel[] = [];

    let mockSetFlowResult: FlowModel[] = [];
    let mockSetNodeResult: NodeModel[] = [];
    let mockSetEdgeResult: EdgeModel[] = [];

    mockGetStorage
      .mockReturnValueOnce(storageFlows)
      .mockReturnValueOnce(storageNodes)
      .mockReturnValueOnce(storageEdges);

    mockSetStorage.mockImplementation((key: LocalStorageKey, object) => {
      if (key === "flows-repository") {
        mockSetFlowResult = object as FlowModel[];
      } else if (key === "nodes-repository") {
        mockSetNodeResult = object as NodeModel[];
      } else if (key === "edges-repository") {
        mockSetEdgeResult = object as EdgeModel[];
      }
    });

    const newFlow = {
      flow: persistedFlows[0],
      nodes: [],
      edges: [],
    };

    const savedFlow = await flowService.saveFlow(newFlow);

    expect(new Date(savedFlow.flow.updatedAt!).getTime()).toBeGreaterThan(
      new Date(persistedFlows[0].updatedAt!).getTime()
    );

    const savedFlowWithoutDates = omitDates(savedFlow.flow);
    const mockSetFlowResultWithoutDates = omitDates(mockSetFlowResult[0]);

    expect(savedFlowWithoutDates).toStrictEqual(mockSetFlowResultWithoutDates);
    expect(mockSetFlowResult.length).toBe(1);

    expect(mockSetNodeResult).toStrictEqual(storageNodes);
    expect(mockSetEdgeResult).toStrictEqual(storageEdges);
  });

  it("should save a new flow when storage is not empty", async () => {
    const persistedFlows = getFlowSamples(true);
    const persistedNodes = getNodeSamples(true);
    const persistedEdges = getEdgeSamples(true);

    const storageFlows: FlowModel[] = [...persistedFlows];
    const storageNodes: NodeModel[] = [...persistedNodes];
    const storageEdges: EdgeModel[] = [...persistedEdges];

    let mockSetFlowResult: FlowModel[] = [];
    let mockSetNodeResult: NodeModel[] = [];
    let mockSetEdgeResult: EdgeModel[] = [];

    mockGetStorage
      .mockReturnValueOnce(storageFlows)
      .mockReturnValueOnce(storageNodes)
      .mockReturnValueOnce(storageEdges);

    mockSetStorage.mockImplementation((key: LocalStorageKey, object) => {
      if (key === "flows-repository") {
        mockSetFlowResult = object as FlowModel[];
      } else if (key === "nodes-repository") {
        mockSetNodeResult = object as NodeModel[];
      } else if (key === "edges-repository") {
        mockSetEdgeResult = object as EdgeModel[];
      }
    });

    const newFlow = {
      flow: getFlowSamples(false)[0],
      nodes: [],
      edges: [],
    };

    const savedFlow = await flowService.saveFlow(newFlow);

    const mockImplementationResult = mockSetFlowResult.find(
      (m) => m.uuid === savedFlow.flow.uuid
    );

    expect(mockImplementationResult).not.toBeNull();

    const savedFlowWithoutDates = omitDates(savedFlow.flow);

    const mockSetFlowResultWithoutDates = omitDates(mockImplementationResult!);

    expect(savedFlowWithoutDates).toStrictEqual(mockSetFlowResultWithoutDates);
    expect(mockSetFlowResult.length).toBe(persistedFlows.length + 1);

    mockSetFlowResult
      .filter((e) => e.uuid !== savedFlow.flow.uuid)
      .forEach((now) => {
        const before = persistedFlows.find((e) => e.uuid === now.uuid);

        expect(before).toStrictEqual(now);
      });

    expect(mockSetNodeResult).toStrictEqual(storageNodes);
    expect(mockSetEdgeResult).toStrictEqual(storageEdges);
  });

  //   it("should load a flow by uuid", async () => {
  //     const mockFlow = testSampleFlowModels[0];
  //     vi.spyOn(flowService, "listFlows").mockResolvedValueOnce([mockFlow]);

  //     const loadedFlow = await flowService.loadFlow("1");
  //     expect(loadedFlow.flow.uuid).toBe("1");
  //     expect(loadedFlow.flow.title).toBe("Flow 1");
  //   });

  //   it("should create a new node", async () => {
  //     const newNodeData = { type: "node", position: { x: 10, y: 20 } };
  //     const newNode = await flowService.createNode(newNodeData);

  //     expect(newNode.uuid).toBeDefined();
  //     expect(newNode.type).toBe("node");
  //     expect(newNode.position).toEqual({ x: 10, y: 20 });
  //   });

  //   it("should delete nodes", async () => {
  //     const nodeUUIDs = ["1", "2"];
  //     const mockNodes: NodeModel[] = [
  //       { uuid: "1", type: "node", position: { x: 0, y: 0 } },
  //       { uuid: "2", type: "node", position: { x: 10, y: 20 } },
  //       { uuid: "3", type: "node", position: { x: 30, y: 40 } },
  //     ];
  //     vi.spyOn(flowService, "listNodes").mockResolvedValue(mockNodes);

  //     await flowService.deleteNodes(nodeUUIDs);

  //     const remainingNodes = await flowService.listNodes();
  //     expect(remainingNodes.length).toBe(1);
  //     expect(remainingNodes[0].uuid).toBe("3");
  //   });

  //   it("should create a new edge", async () => {
  //     const newEdgeData = { source: "node1", target: "node2" };
  //     const newEdge = await flowService.createEdge(newEdgeData);

  //     expect(newEdge.uuid).toBeDefined();
  //     expect(newEdge.source).toBe("node1");
  //     expect(newEdge.target).toBe("node2");
  //   });

  //   it("should delete a flow by uuid", async () => {
  //     const flowUUID = "1";
  //     const mockFlows: FlowModel[] = [
  //       testSampleFlowModels[0],
  //       testSampleFlowModels[1],
  //     ];
  //     vi.spyOn(flowService, "listFlows").mockResolvedValue(mockFlows);

  //     await flowService.deleteFlow(flowUUID);

  //     const remainingFlows = await flowService.listFlows();
  //     expect(remainingFlows.length).toBe(1);
  //     expect(remainingFlows[0].uuid).toBe("2");
  //   });
});
