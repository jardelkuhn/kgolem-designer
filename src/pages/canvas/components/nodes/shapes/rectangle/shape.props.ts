import { ReactElement } from "react";

export type RectangleProps = {
  shape: RectangleShapeProps;
  options: RectangleOptionProps;
  children: RectangleChildrenProps;
};

export interface RectangleShapeProps {
  background: string;
  border: string;
}

export interface RectangleOptionProps {
  title: string;
  providerIcon: string;
  familyIcon: string;
}

export interface RectangleChildrenProps {
  uuid: string;
  content: ReactElement;
  handles: ReactElement[];
}
