import { FlowModel } from "../../models";
import { FlowRepository } from "../@interfaces";

export class ApiFlowRepository implements FlowRepository {
  private apiUrl = "https://your-api-endpoint.com/flows"; // Replace with your actual API URL

  async save(model: FlowModel): Promise<void> {
    const response = await fetch(`${this.apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });

    if (!response.ok) {
      throw new Error(`Failed to save model: ${response.statusText}`);
    }
  }

  async update(model: FlowModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async get(uuid: string): Promise<FlowModel | null> {
    const response = await fetch(`${this.apiUrl}/${uuid}`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }

    return response.json();
  }

  async delete(uuid: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${uuid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete model: ${response.statusText}`);
    }
  }
}
