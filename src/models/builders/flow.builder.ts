import { Viewport } from "@xyflow/react";

import { FlowModel } from "..";

export class FlowModelBuilder {
  private readonly uuid?: string;
  private title: string = "";
  private viewport = { x: 0, y: 0, zoom: 1 };

  constructor(uuid?: string) {
    this.uuid = uuid;
  }

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public setViewport(viewport: Viewport): this {
    this.viewport = { ...viewport };
    return this;
  }

  public build(): FlowModel {
    return new FlowModel(this.uuid, this.title, this.viewport);
  }
}
