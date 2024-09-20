import type { BuiltInNode } from "@xyflow/react";

import { WANode } from "./wa/types";
import { ReactElement } from "react";

export type CustomNodeProps = {
  uuid: string;
  label: string;
  handles: ReactElement[];
};

export type AppNode = BuiltInNode | WANode;
