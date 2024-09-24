import { ReactElement } from "react";
import { HandleType, Position } from "@xyflow/react";

import { CustomHandle } from "../../custom";
import { isStartNode } from "../../../nodes/_utilities/guards/wa/start-node.guard";
import { CustomNodeType } from "../../../nodes/@interfaces";

class HandleFactory {
  static createHandles(nodeId: string, type?: string) {
    if (isStartNode(type)) {
      return this.createHandlesForStartNode(nodeId);
    }

    if (type === CustomNodeType.WAOptions) {
      return this.createHandlesForOptionNode(nodeId);
    }

    return this.createHandlesDefault(nodeId);
  }

  private static createHandlesDefault(parentId: string): ReactElement[] {
    return [
      this.createHandle(parentId, "source", Position.Right),
      this.createHandle(parentId, "source", Position.Left),
      this.createHandle(parentId, "source", Position.Top),
      this.createHandle(parentId, "source", Position.Bottom),

      this.createHandle(parentId, "target", Position.Right),
      this.createHandle(parentId, "target", Position.Left),
      this.createHandle(parentId, "target", Position.Top),
      this.createHandle(parentId, "target", Position.Bottom),
    ];
  }

  private static createHandlesForOptionNode(parentId: string): ReactElement[] {
    return [
      this.createHandle(parentId, "target", Position.Left),
      this.createHandle(parentId, "target", Position.Top),
      this.createHandle(parentId, "target", Position.Bottom),
    ];
  }

  private static createHandlesForStartNode(parentId: string): ReactElement[] {
    return [
      this.createHandle(parentId, "source", Position.Right),
      this.createHandle(parentId, "source", Position.Left),
      this.createHandle(parentId, "source", Position.Top),
      this.createHandle(parentId, "source", Position.Bottom),
    ];
  }

  private static createHandle(
    parentId: string,
    type: HandleType,
    position: Position
  ) {
    const composedId = `${parentId}-${type}=${position}`;

    return (
      <CustomHandle
        id={composedId}
        key={composedId}
        parentId={parentId}
        type={type}
        position={position}
      />
    );
  }
}

export default HandleFactory;
