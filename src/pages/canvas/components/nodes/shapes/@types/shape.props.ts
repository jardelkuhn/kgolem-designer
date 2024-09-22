import { ReactElement } from "react";

export type ShapeProps = {
  shape: ShapeStyle;
  properties: ShapeProperties;
  children: Children;
};

export interface ShapeStyle {
  background: string;
  border: string;
}

export interface ShapeProperties {
  title: string;
  providerIcon: string;
  familyIcon: string;
  selected?: boolean;
}

export interface Children {
  content: ReactElement;
  handles: ReactElement[];
  options?: ShapeOption[];
}

export interface ShapeOption {
  id: string;
  label: string;
}
