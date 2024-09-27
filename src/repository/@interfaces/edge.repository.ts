import { EdgeModel } from "../../models";

export interface EdgeRepository {
  get(uuid: string): Promise<EdgeModel | null>;
  save(model: EdgeModel): Promise<void>;
  update(model: EdgeModel): Promise<void>;
  delete(uuid: string): Promise<void>;
}
