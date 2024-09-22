import { useContext } from "react";

import { DnDContext } from "./dnd.provider";

export const useDnD = () => {
  return useContext(DnDContext);
};
