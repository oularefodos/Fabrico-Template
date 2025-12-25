import { Platform } from "react-native";

// Simple in-memory storage for native platforms
const memoryStorage = new Map<string, string>();

export function getItem<T>(key: string): T | null {
  try {
    let value: string | null = null;

    if (Platform.OS === "web") {
      value = localStorage.getItem(key);
    } else {
      value = memoryStorage.get(key) || null;
    }

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export function setItem<T>(key: string, value: T) {
  const stringValue = JSON.stringify(value);

  if (Platform.OS === "web") {
    localStorage.setItem(key, stringValue);
  } else {
    memoryStorage.set(key, stringValue);
  }
}

export function removeItem(key: string) {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
  } else {
    memoryStorage.delete(key);
  }
}
