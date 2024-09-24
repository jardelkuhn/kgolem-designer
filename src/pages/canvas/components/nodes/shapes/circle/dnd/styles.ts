import styled from "styled-components";

import { getTitleFonts } from "../../../_utilities/colors";
import { ColorProps } from "../../../@interfaces";

interface ContainerProps {
  color: ColorProps;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  width: 50%;
  height: 20px;
  padding: 4px 4px 4px 14px;
  margin-bottom: 10px;
  align-items: center;
  cursor: grab;

  border: 2px solid transparent;
  border-radius: 100px;
  background: ${(props) => props.color.background};

  ${getTitleFonts()}
  font-size: 10px !important;

  i {
    margin-right: 10px;
  }
`;
