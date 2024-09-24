import { createContext, useMemo, useState } from "react";

import { NodeType } from "../../pages/canvas/components/nodes";
import { DefaultProviderProps } from "../@interfaces";

interface DnDContextProps {
  readonly type: NodeType | null;
  readonly setType: (value: NodeType) => void;
}

export const DnDContext = createContext<DnDContextProps>(null!);

export function DnDProvider(props: DefaultProviderProps) {
  const [type, setType] = useState<NodeType | null>(null);

  const value = useMemo(() => ({ type, setType }), [type, setType]);

  return (
    <DnDContext.Provider value={value}>{props.children}</DnDContext.Provider>
  );
}
