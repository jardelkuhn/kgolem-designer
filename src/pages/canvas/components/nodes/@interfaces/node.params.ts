import { CustomNodeType } from "./node.types";

export interface NodeParams {
  title: string;
  familyIcon: string;
  type: CustomNodeType;

  textContent: boolean;
  customContent?: boolean;

  provider: ProviderParams;
}

export interface ProviderParams {
  title: string;
  icon: string;
}
