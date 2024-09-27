import { NodeOption } from "../../../../../models";

export type CustomNodeProps = {
  readonly label: string;
  readonly options?: NodeOption[];
};
