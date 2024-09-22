import { createContext, useState } from "react";

import { NodeType } from "../../pages/canvas/components/nodes";
import { DefaultProviderProps } from "../@interfaces";

interface DnDContextProps {
  type: NodeType | null;
  setType: (value: NodeType) => void;
}

export const DnDContext = createContext<DnDContextProps>(null!);

export function DnDProvider(props: DefaultProviderProps) {
  const [type, setType] = useState<NodeType | null>(null);

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {props.children}
    </DnDContext.Provider>
  );
}
