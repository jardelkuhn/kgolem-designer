import { CustomNodeType } from "./node.types";

export interface NodeParams {
  title: string;
  familyIcon: string;
  type: CustomNodeType;

  provider: ProviderParams;
}

export interface ProviderParams {
  title: string;
  icon: string;
}
