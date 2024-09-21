import styled from "styled-components";
import { getTitleFonts } from "../../fonts";

type ContainerProps = {
  background: string;
};

export const DndRectangleContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;

  height: 20px;
  padding: 4px 4px 4px 14px;
  margin-bottom: 10px;
  align-items: center;
  cursor: grab;

  border: 2px solid transparent;
  border-radius: 3px;
  background: ${(props) => props.background};

  ${getTitleFonts()}
  font-size: 10px !important;

  i {
    margin-right: 10px;
  }
`;
