import { CustomNodeType } from ".";
import { NodeColor } from "./node.colors";
import { NodeParams } from "./node.params";

export interface DnDProps {
  readonly color: NodeColor;
  readonly params: NodeParams;
  readonly onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    type: CustomNodeType
  ) => void;
}
