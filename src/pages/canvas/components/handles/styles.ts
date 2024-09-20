import { Handle, HandleType } from "@xyflow/react";
import styled from "styled-components";

import { Visibility } from "./types";

interface Props {
  type: HandleType;
  active: Visibility;
  visible: Visibility;
}

export const Container = styled(Handle)<Props>`
  visibility: ${(props) => props.visible};
  border-color: ${(props) => getColor(props.type)};
  background: ${(props) =>
    props.active === "visible"
      ? getColor(props.type)
      : "linear-gradient(200deg, #FFFFFF, #C0C0C0) padding-box;"};
`;

const getColor = (type: HandleType): string => {
  switch (type) {
    case "source":
      return "#1E90FF";
    case "target":
      return "#50C878";
  }
};
