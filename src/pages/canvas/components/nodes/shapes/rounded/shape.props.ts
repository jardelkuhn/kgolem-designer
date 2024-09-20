import { ReactElement } from "react";

export type RoundedProps = {
  shape: RoundedShapeProps;
  options: RoundedOptionProps;
  children: RoundedChildrenProps;
};

export interface RoundedShapeProps {
  background: string;
  border: string;
}

export interface RoundedOptionProps {
  title: string;
  providerIcon: string;
  familyIcon: string;
}

export interface RoundedChildrenProps {
  uuid: string;
  content: ReactElement;
  handles: ReactElement[];
}
