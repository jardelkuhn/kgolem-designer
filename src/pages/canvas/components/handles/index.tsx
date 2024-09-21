import { Connection, HandleType, Position } from "@xyflow/react";

import { Container } from "./styles";
import { useCanvas } from "../../../../context/canvas/canvas.provider";
import { useCallback, useEffect, useState } from "react";
import { Visibility } from "./types";

interface Props {
  id?: string;
  parentId: string;
  type: HandleType;
  position: Position;
}

export function CustomHandle(props: Props) {
  const { nodeEntered, connectStartParams, edges } = useCanvas();

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

    setVisible(visibility);
  }, [connectionInProgress, parentIsConnectStart]);

  const checkActive = useCallback((): boolean => {
    const matches = edges.filter((edge) => {
      return edge.targetHandle === props.id || edge.sourceHandle === props.id;
    });

    const result = matches.length > 0;

    setActive(result);

    return result;
  }, [edges, props]);

  const checkVisibility = useCallback(() => {
    if (checkActive()) {
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

  function isConnection(edge: unknown): edge is Connection {
    return (edge as Connection).source !== undefined;
  }

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

        return !existingEdgeWayTo && !existingEdgeWayBack;
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isValidConnection={isValidConnection}
    />
  );
}
