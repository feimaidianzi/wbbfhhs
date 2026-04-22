import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const getSafeStorage = (): StorageLike | null => {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const safeStorageGet = (key: string): string | null => {
  try {
    return getSafeStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
};

export const safeStorageSet = (key: string, value: string): void => {
  try {
    getSafeStorage()?.setItem(key, value);
  } catch {
    // Ignore storage failures in privacy-restricted contexts.
  }
};

export const safeStorageRemove = (key: string): void => {
  try {
    getSafeStorage()?.removeItem(key);
  } catch {
    // Ignore storage failures in privacy-restricted contexts.
  }
};
