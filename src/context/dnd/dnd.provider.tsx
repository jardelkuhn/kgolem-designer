import { createContext, useMemo, useState } from "react";

import { DefaultProviderProps } from "../@interfaces";
import { CustomNodeType } from "../../pages/canvas/components/nodes/@interfaces";

interface DnDContextProps {
  readonly type: CustomNodeType | null;
  readonly setType: (value: CustomNodeType) => void;
}

export const DnDContext = createContext<DnDContextProps>(null!);

export function DnDProvider(props: DefaultProviderProps) {
  const [type, setType] = useState<CustomNodeType | null>(null);

  const value = useMemo(() => ({ type, setType }), [type, setType]);

  return (
    <DnDContext.Provider value={value}>{props.children}</DnDContext.Provider>
  );
}
