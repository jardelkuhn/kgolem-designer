import { getRepositoryMethod } from "../environment";
import { RepositoryMethod } from "../environment/@types";
import { FlowRepository } from "./@interfaces";
import { ApiFlowRepository, LocalStorageFlowRepository } from "./local-storage";

export class RepositoryManager {
  private static instance: RepositoryManager;

  public static getInstance(): RepositoryManager {
    if (!RepositoryManager.instance) {
      RepositoryManager.instance = new RepositoryManager();
    }
    return RepositoryManager.instance;
  }

  private readonly repositoryType: RepositoryMethod;

  constructor() {
    this.repositoryType = getRepositoryMethod();
  }

  getFlowRepository(): FlowRepository {
    if (this.repositoryType === "API") {
      return new ApiFlowRepository();
    } else {
      return new LocalStorageFlowRepository();
    }
  }
}
