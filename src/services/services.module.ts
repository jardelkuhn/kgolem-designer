import { getServicesMethod } from "../environment";
import { ServicesMethod } from "../environment/@types";
import { FlowService } from "./@interfaces";
import { APIFlowService } from "./api";
import { LocalStorageFlowService } from "./local-storage";

export class ServicesModule {
  private static instance: ServicesModule;

  public static getInstance(): ServicesModule {
    if (!ServicesModule.instance) {
      ServicesModule.instance = new ServicesModule();
    }
    return ServicesModule.instance;
  }

  private readonly servicesMethod: ServicesMethod;

  constructor() {
    this.servicesMethod = getServicesMethod();
  }

  getFlowService(): FlowService {
    if (this.servicesMethod === "API") {
      return APIFlowService.getInstance();
    }

    return LocalStorageFlowService.getInstance();
  }
}
