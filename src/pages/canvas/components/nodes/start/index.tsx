import { NodeProps } from "@xyflow/react";

import { StartNodeType } from "../types";
import { RoundedShape } from "../shapes/rounded";

export function StartNode({ data }: NodeProps<StartNodeType>) {
  console.log(data);
  const texto = <span>Hello, World!</span>;

  return (
    <RoundedShape
      shape={{ borderColor: "#50C878", backgroundColor: "#eee" }}
      children={{ top: texto }}
    />
  );
}
