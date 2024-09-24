import { CSSProperties, useCallback, useEffect, useState } from "react";
import { HandleType, Position } from "@xyflow/react";

import { Container } from "./styles";
import { Visibility } from "./types";
import { isConnection } from "../_utilities/connection.utilities";
import { useDesigner } from "../../../../../context/designer";

interface Props {
  readonly id?: string;
  readonly parentId: string;
  readonly type: HandleType;
  readonly position: Position;
  readonly style?: CSSProperties;
}

export function CustomHandle(props: Props) {
  const { nodeEntered, connectStartParams, edges } = useDesigner();

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState<Visibility>("hidden");

  const connectionInProgress = useCallback(() => {
    return !!connectStartParams;
  }, [connectStartParams]);

  const parentNodeIsHovered = useCallback(() => {
    return nodeEntered?.id === props.parentId;
  }, [nodeEntered, props.parentId]);

  const handleIsSource = useCallback(() => {
    return connectStartParams?.handleId === props.id;
  }, [connectStartParams, props.id]);

  const parentIsConnectStart = useCallback(() => {
    return connectStartParams?.nodeId === props.parentId;
  }, [connectStartParams, props.parentId]);

  const redundantConnection = useCallback(() => {
    const sourceNode = connectStartParams?.nodeId;

    const existingEdgeWayTo =
      edges.filter(
        (edge) => edge.source === sourceNode && edge.target === props.parentId
      ).length > 0;

    const existingEdgeWayBack =
      edges.filter(
        (edge) => edge.target === sourceNode && edge.source === props.parentId
      ).length > 0;

    return existingEdgeWayTo || existingEdgeWayBack;
  }, [connectStartParams?.nodeId, edges, props.parentId]);

  const checkSourceTypeVisibility = useCallback(() => {
    let visibility: Visibility = "hidden";

    if (parentNodeIsHovered() && !connectionInProgress()) {
      visibility = "visible";
    }

    if (handleIsSource()) {
      visibility = "visible";
    }

    setVisible(visibility);
  }, [connectionInProgress, handleIsSource, parentNodeIsHovered]);

  const checkTargetTypeVisibility = useCallback(() => {
    let visibility: Visibility = "visible";

    if (!connectionInProgress()) {
      visibility = "hidden";
    }

    if (parentIsConnectStart()) {
      visibility = "hidden";
    }

    if (redundantConnection()) {
      visibility = "hidden";
    }

    setVisible(visibility);
  }, [connectionInProgress, parentIsConnectStart, redundantConnection]);

  const checkActive = useCallback((): boolean => {
    const matches = edges.filter((edge) => {
      return edge.targetHandle === props.id || edge.sourceHandle === props.id;
    });

    const result = matches.length > 0;

    return result;
  }, [edges, props]);

  const checkVisibility = useCallback(() => {
    const isActive = checkActive();
    setActive(isActive);

    if (isActive) {
      setVisible("visible");
      return;
    }

    switch (props.type) {
      case "source":
        checkSourceTypeVisibility();
        break;
      case "target":
        checkTargetTypeVisibility();
        break;
    }
  }, [
    checkActive,
    checkSourceTypeVisibility,
    checkTargetTypeVisibility,
    props.type,
  ]);

  useEffect(() => {
    checkVisibility();
  }, [checkVisibility]);

  const isValidConnection = useCallback(
    (edge: unknown) => {
      if (isConnection(edge)) {
        const existingEdgeWayTo =
          edges.filter(
            (ed) => ed.source === edge.source && ed.target === edge.target
          ).length > 0;

        const existingEdgeWayBack =
          edges.filter(
            (ed) => ed.source === edge.target && ed.target === edge.source
          ).length > 0;

        const selfTargeted = edge.source === edge.target;

        return !existingEdgeWayTo && !existingEdgeWayBack && !selfTargeted;
      }

      return true;
    },
    [edges]
  );

  return (
    <Container
      id={props.id}
      type={props.type}
      position={props.position}
      visible={visible}
      active={active ? "visible" : "hidden"}
      isValidConnection={isValidConnection}
      style={props.style ? props.style : {}}
    />
  );
}
