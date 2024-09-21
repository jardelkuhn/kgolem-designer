import { ReactElement } from "react";

export type ShapeProps = {
  shape: ShapeStyle;
  options: ShapeOption;
  children: Children;
};

export interface ShapeStyle {
  background: string;
  border: string;
}

export interface ShapeOption {
  title: string;
  providerIcon: string;
  familyIcon: string;
  selected?: boolean;
}

export interface Children {
  content: ReactElement;
  handles: ReactElement[];
}
