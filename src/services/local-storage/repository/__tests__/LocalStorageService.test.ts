// @vitest-environment jsdom

// LocalStorageService.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LocalStorageService, LocalStorageKey } from "../index";

describe("LocalStorageService", () => {
  let localStorageService: LocalStorageService;

  // Mock localStorage
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // Use the mock instead of the actual localStorage
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    // Clear localStorage before each test
    localStorage.clear();

    // Get an instance of the LocalStorageService
    localStorageService = LocalStorageService.getInstance();
  });

  it("should set and get value from localStorage", () => {
    const key: LocalStorageKey = "flows-repository";
    const value = { flow: "test flow" };

    // Call setValue to store the value
    localStorageService.setValue(key, value);

    // Verify that the value was stored in localStorage
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));

    // Call getValue to retrieve the value
    const retrievedValue = localStorageService.getValue<typeof value>(key);

    // Verify that the retrieved value matches the original value
    expect(retrievedValue).toEqual(value);
  });

  it("should return null when getting a non-existent key", () => {
    const key: LocalStorageKey =
      "non-existent-key" as unknown as LocalStorageKey;

    const value = localStorageService.getValue(key);

    // Expect the retrieved value to be null
    expect(value).toBeNull();
  });

  it("should handle JSON parsing error gracefully", () => {
    const key: LocalStorageKey =
      "invalid-json-key" as unknown as LocalStorageKey;
    localStorage.setItem(key, "invalid json string");

    // Mock console.error to track calls
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Attempt to retrieve the value, which should throw
    expect(() => {
      localStorageService.getValue(key);
    }).toThrow();

    // Ensure console.error was called
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error parsing JSON from localStorage",
      expect.any(Error)
    );

    consoleErrorMock.mockRestore(); // Restore the original console.error
  });
});
