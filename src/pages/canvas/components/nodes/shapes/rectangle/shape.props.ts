import { ReactElement } from "react";

export type RectangleProps = {
  shape: RectangleShapeProps;
  children?: RectangleChildrenProps;
};

export interface RectangleShapeProps {
  borderColor: string;
  backgroundColor: string;
  topBackground?: string;
  middleBackground?: string;
  bottomBackground?: string;
}

export interface RectangleChildrenProps {
  icon: ReactElement;
  topLabel: ReactElement;
  mainLabel: ReactElement;
  
  handles?: JSX.Element[];
}
