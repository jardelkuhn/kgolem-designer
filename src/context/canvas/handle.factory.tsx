import { ReactElement } from "react";
import { HandleType, Position } from "@xyflow/react";

import { CustomHandle } from "../../pages/canvas/components/handles/custom";

class HandleFactory {
  createEmptyHandlesForNode(uuid: string): ReactElement[] {
    return [
      this.createHandle(`${uuid}-a-source`, uuid, "source", Position.Right),
      this.createHandle(`${uuid}-b-source`, uuid, "source", Position.Left),
      this.createHandle(`${uuid}-c-source`, uuid, "source", Position.Top),
      this.createHandle(`${uuid}-d-source`, uuid, "source", Position.Bottom),

      this.createHandle(`${uuid}-a-target`, uuid, "target", Position.Right),
      this.createHandle(`${uuid}-b-target`, uuid, "target", Position.Left),
      this.createHandle(`${uuid}-c-target`, uuid, "target", Position.Top),
      this.createHandle(`${uuid}-d-target`, uuid, "target", Position.Bottom),
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
