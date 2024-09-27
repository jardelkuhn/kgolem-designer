import { FlowModel } from "../../models";

export interface FlowRepository {
  get(uuid: string): Promise<FlowModel | null>;
  save(model: FlowModel): Promise<void>;
  update(model: FlowModel): Promise<void>;
  delete(uuid: string): Promise<void>;
}
