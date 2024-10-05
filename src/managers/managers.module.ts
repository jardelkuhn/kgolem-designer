import { DesignerManager } from "./designer";

export class ManagersModule {
  private static instance: ManagersModule;

  public static getInstance(): ManagersModule {
    if (!ManagersModule.instance) {
      ManagersModule.instance = new ManagersModule();
    }
    return ManagersModule.instance;
  }

  getDesignerManager(): DesignerManager {
    return DesignerManager.getInstance();
  }
}
