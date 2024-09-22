import { ReactElement } from "react";
import { HandleType, Position } from "@xyflow/react";

import { CustomHandle } from "../pages/canvas/components/handles/custom";
import { NodeType } from "../pages/canvas/components/nodes";
import { isStartNode } from "../pages/canvas/components/nodes/classifications/start-node.classification";

class HandleFactory {
  createHandles(nodeId: string, type: NodeType) {
    if (isStartNode(type)) {
      return this.createHandlesForStartNode(nodeId);
    }
    if (type === NodeType.WAOptions) {
      return this.createHandlesForOptionNode(nodeId);
    }

    return this.createHandlesDefault(nodeId);
  }

  createHandlesDefault(parentId: string): ReactElement[] {
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

  createHandlesForOptionNode(parentId: string): ReactElement[] {
    return [
      this.createHandle(parentId, "target", Position.Left),
      this.createHandle(parentId, "target", Position.Top),
      this.createHandle(parentId, "target", Position.Bottom),
    ];
  }

  createHandlesForStartNode(parentId: string): ReactElement[] {
    return [
      this.createHandle(parentId, "source", Position.Right),
      this.createHandle(parentId, "source", Position.Left),
      this.createHandle(parentId, "source", Position.Top),
      this.createHandle(parentId, "source", Position.Bottom),
    ];
  }

  createHandle(parentId: string, type: HandleType, position: Position) {
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
