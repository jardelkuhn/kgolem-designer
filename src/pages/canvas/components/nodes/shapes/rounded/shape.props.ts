import { ReactElement } from "react";

export type RoundedProps = {
  shape: RoundedShapeProps;
  children?: RoundedChildrenProps;
};

export interface RoundedShapeProps {
  borderColor: string;
  backgroundColor: string;
  topBackground?: string;
  middleBackground?: string;
  bottomBackground?: string;
}

export interface RoundedChildrenProps {
  top?: ReactElement;
  middle?: ReactElement;
  bottom?: ReactElement;

  handles?: JSX.Element[];
}
