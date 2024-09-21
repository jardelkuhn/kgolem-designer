import { HandleType, Position } from "@xyflow/react";
import { AppNode } from "../../pages/canvas/components/nodes/types";
import { ReactElement } from "react";
import { CustomHandle } from "../../pages/canvas/components/handles";

class HandleFactory {
  // private edgeList: Edge[] | undefined;

  // constructor(edgeList: Edge[]) {
  //   this.edgeList = edgeList;
  // }

  createEmptyHandlesForNode(node: AppNode): ReactElement[] {
    return [
      this.createHandle(
        `${node.id}-a-source`,
        node.id,
        "source",
        Position.Right
      ),
      this.createHandle(
        `${node.id}-b-source`,
        node.id,
        "source",
        Position.Left
      ),
      this.createHandle(`${node.id}-c-source`, node.id, "source", Position.Top),
      this.createHandle(
        `${node.id}-d-source`,
        node.id,
        "source",
        Position.Bottom
      ),

      this.createHandle(
        `${node.id}-a-target`,
        node.id,
        "target",
        Position.Right
      ),
      this.createHandle(
        `${node.id}-b-target`,
        node.id,
        "target",
        Position.Left
      ),
      this.createHandle(`${node.id}-c-target`, node.id, "target", Position.Top),
      this.createHandle(
        `${node.id}-d-target`,
        node.id,
        "target",
        Position.Bottom
      ),
    ];
  }

  createHandle(
    id: string,
    parentId: string,
    type: HandleType,
    position: Position
  ) {
    return (
      <CustomHandle
        id={id}
        key={id}
        parentId={parentId}
        type={type}
        position={position}
      />
    );
  }
}

export default HandleFactory;
