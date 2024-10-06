import { CustomNodeType, NodeParams } from "../../@interfaces";

export const fallbackNodeParams: NodeParams = {
  title: "Unkown",
  familyIcon: "",
  type: CustomNodeType.Default,
  textContent: false,

  provider: {
    icon: "",
    title: "UnkownProvider",
  },
};
