import { createContext, useContext, useState } from "react";

import { DefaultProviderProps } from "../types";
import { NodeType } from "../../pages/canvas/components/nodes";

interface DnDContextProps {
  type: NodeType | null;
  setType: (value: NodeType) => void;
}

const DnDContext = createContext<DnDContextProps>(null!);

export function DnDProvider(props: DefaultProviderProps) {
  const [type, setType] = useState<NodeType | null>(null);

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {props.children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
