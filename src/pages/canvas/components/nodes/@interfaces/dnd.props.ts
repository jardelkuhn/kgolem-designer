import { CustomNodeType } from ".";
import { NodeColor } from "./node.colors";
import { NodeParams } from "./node.params";

export type DnDProps = Readonly<{
  readonly color: NodeColor;
  readonly params: NodeParams;
  readonly onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    type: CustomNodeType
  ) => void;
}>;
