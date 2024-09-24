import { NodeOption } from "./node.options";

export type CustomNodeProps = {
  readonly label: string;
  readonly options?: NodeOption[];
};
