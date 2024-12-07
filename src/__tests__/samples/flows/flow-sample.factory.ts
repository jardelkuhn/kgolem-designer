import { randomUUID } from "crypto";
import { FlowModel } from "../../../models";

export class FlowSampleFactory {
  static createFlowSample(
    title: string,
    viewport: { x: number; y: number; zoom: number },
    createdAt: string,
    updatedAt: string
  ): FlowModel {
    return {
      uuid: randomUUID(),
      title,
      viewport,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    } as FlowModel;
  }

  static getFlowSample1(): FlowModel {
    return this.createFlowSample(
      "Flow 1",
      { x: 1, y: 1, zoom: 1 },
      "2022-01-25",
      "2022-01-26"
    );
  }

  static getFlowSample2(): FlowModel {
    return this.createFlowSample(
      "Flow 2",
      { x: 2, y: 2, zoom: 2 },
      "2022-02-25",
      "2022-02-26"
    );
  }

  static getFlowSample3(): FlowModel {
    return this.createFlowSample(
      "Flow 3",
      { x: 3, y: 3, zoom: 3 },
      "2022-03-25",
      "2022-03-26"
    );
  }

  static getSampleFlowModels(persisted = true): FlowModel[] {
    const samples = [
      this.getFlowSample1(),
      this.getFlowSample2(),
      this.getFlowSample3(),
    ];

    if (persisted) {
      return samples;
    } else {
      return samples.map((sample) => ({
        ...sample,
        uuid: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }));
    }
  }
}
