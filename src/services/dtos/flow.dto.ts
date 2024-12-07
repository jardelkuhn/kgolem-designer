import { Nullable } from "../../@types";

export interface FlowDTO {
  uuid: Nullable<string>;
  title: string;
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
}
