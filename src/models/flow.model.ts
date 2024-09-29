import { Nullable } from "../@types";

export class FlowModel {
  constructor(
    uuid: Nullable<string>,
    title: string,
    viewport: { x: number; y: number; zoom: number }
  ) {
    this.uuid = uuid;
    this.title = title;
    this.viewport = viewport;
  }

  uuid: Nullable<string>;
  title: string;
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };

  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
