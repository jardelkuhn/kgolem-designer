import React from "react";

import { Container } from "./styles";
import { DnDProps } from "../../../@interfaces";

function withRectangleDnd<P extends DnDProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const { onDragStart, params, color } = props;

    return (
      <Container
        color={color.get(false)}
        onDragStart={(event) => onDragStart(event, params.type)}
        draggable
      >
        <i className={params.familyIcon}></i>
        {params.title}
      </Container>
    );
  };
}

export default withRectangleDnd;
