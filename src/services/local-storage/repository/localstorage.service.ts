export type LocalStorageKey =
  | "flows-repository"
  | "nodes-repository"
  | "edges-repository";

export class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  getValue<T>(key: LocalStorageKey): T | null {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        throw error;
      }
    }

    return null;
  }

  setValue<T>(key: LocalStorageKey, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in localStorage", error);
      throw error;
    }
  }
}
