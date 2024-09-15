import type { BuiltInNode, Node } from "@xyflow/react";

export type StartNodeType = Node<{ label: string }, "start">;

export type AppNode = BuiltInNode | StartNodeType;
