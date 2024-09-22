import { useContext } from "react";

import { DesignerContext } from "./designer.provider";

export const useDesigner = () => {
  return useContext(DesignerContext);
};
