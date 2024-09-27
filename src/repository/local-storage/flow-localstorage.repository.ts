import { FlowModel } from "../../models";
import { FlowRepository } from "../@interfaces";

export class LocalStorageFlowRepository implements FlowRepository {
  private storageKey = "flow-repository";

  async save(model: FlowModel): Promise<void> {
    const storedData = localStorage.getItem(this.storageKey);
    const flows = storedData ? JSON.parse(storedData) : {};
    flows[model.uuid] = model;
    localStorage.setItem(this.storageKey, JSON.stringify(flows));
  }

  async update(model: FlowModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async get(uuid: string): Promise<FlowModel | null> {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      const flows = JSON.parse(storedData);
      return flows[uuid] || null;
    }
    return null;
  }

  async delete(uuid: string): Promise<void> {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      const flows = JSON.parse(storedData);
      delete flows[uuid];
      localStorage.setItem(this.storageKey, JSON.stringify(flows));
    }
  }
}
