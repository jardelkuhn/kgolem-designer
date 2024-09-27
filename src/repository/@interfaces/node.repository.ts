import { NodeModel } from "../../models";

export interface NodeRepository {
  get(uuid: string): Promise<NodeModel | null>;
  save(model: NodeModel): Promise<void>;
  update(model: NodeModel): Promise<void>;
  delete(uuid: string): Promise<void>;
}
