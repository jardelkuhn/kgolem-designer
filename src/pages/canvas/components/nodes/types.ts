import { ReactElement } from "react";
import type { BuiltInNode } from "@xyflow/react";

import { WANode } from "./wa/types";

export type CustomNodeProps = {
  label: string;
  handles: ReactElement[];
};

export type AppNode = BuiltInNode | WANode;
